"""
Streamlit chatbot frontend + Gemini-compatible adapter (Option B).

Usage:
    pip install streamlit requests
    streamlit run streamlit_chat_gemini.py

Behavior:
- You can either use environment variables GEMINI_API_URL / GEMINI_API_KEY
  or paste the API URL and API key into the UI (masked input for key).
- Click "Test connection" to verify the endpoint/key before chatting.
- Chats are saved to a JSON file (chats_store.json) in the working directory.
- The adapter attempts a few common response shapes (Vertex/Gemini/OpenAI-style).
"""

import os
import json
import time
import uuid
from typing import List, Dict, Any, Optional
import requests
import streamlit as st

# ---------- Types ----------
Message = Dict[str, Any]  # {id, role: 'user'|'assistant'|'system', content: str, timestamp}
Chat = Dict[str, Any]     # {id, title, messages: List[Message], created_at}

# ---------- Defaults & store ----------
DEFAULT_STORE_FILE = "chats_store.json"
FALLBACK_MODEL = os.getenv("FALLBACK_MODEL", "gemini")  # shown as a hint only

# ---------- Simple persistent store ----------
def load_chats(store_file: str = DEFAULT_STORE_FILE) -> List[Chat]:
    if os.path.exists(store_file):
        try:
            with open(store_file, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []
    # default starter chat
    now = time.time()
    starter: Chat = {
        "id": str(uuid.uuid4()),
        "title": "Getting Started",
        "messages": [
            {
                "id": str(uuid.uuid4()),
                "role": "assistant",
                "content": "Hello! I'm your AI assistant. Ask me anything about finance or programming, or paste a system prompt to customize behavior.",
                "timestamp": now
            }
        ],
        "created_at": now
    }
    return [starter]

def save_chats(chats: List[Chat], store_file: str = DEFAULT_STORE_FILE):
    try:
        with open(store_file, "w", encoding="utf-8") as f:
            json.dump(chats, f, ensure_ascii=False, indent=2)
    except Exception as e:
        st.error(f"Failed to save chats: {e}")

# ---------- LLM Adapter ----------
class LLMAdapter:
    """
    Minimal adapter to call a Gemini-compatible endpoint.
    The payload shape is flexible — adjust call_gemini() if your provider expects different fields.
    """
    def __init__(self, api_url: Optional[str], api_key: Optional[str], model: Optional[str] = None):
        self.api_url = api_url
        self.api_key = api_key
        self.model = model or FALLBACK_MODEL

    def call_gemini(self, system_prompt: str, conversation: List[Message], max_tokens: int = 1024, timeout: int = 60) -> str:
        """
        Sends the conversation and returns the model's text response.
        Raises RuntimeError on failures (including HTTP error codes).
        """
        if not self.api_url or not self.api_key:
            raise RuntimeError("API URL and API key must be provided.")

        # Build a simple messages payload. Some providers expect `messages`, others `input`/`prompt`.
        messages_payload = []
        for m in conversation:
            # Ensure we send small, safe payload: role + content
            messages_payload.append({"role": m.get("role", "user"), "content": m.get("content", "")})

        payload = {
            "model": self.model,
            "messages": messages_payload,
            "maxOutputTokens": max_tokens,
            # You may add other provider-specific params here (temperature, topK, etc.)
        }

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        resp = requests.post(self.api_url, json=payload, headers=headers, timeout=timeout)
        if resp.status_code >= 400:
            # safe error message
            raise RuntimeError(f"LLM request failed: {resp.status_code} {resp.text[:1000]}")

        data = resp.json()

        # Try to extract text from common shapes
        text = None
        if isinstance(data, dict):
            # Vertex-style: candidates
            if "candidates" in data and isinstance(data["candidates"], list) and data["candidates"]:
                # candidate could contain 'content' or 'text'
                cand = data["candidates"][0]
                text = cand.get("content") or cand.get("text") or cand.get("message") or None

            # choices (OpenAI-ish)
            if not text and "choices" in data and isinstance(data["choices"], list) and data["choices"]:
                ch = data["choices"][0]
                if isinstance(ch, dict):
                    # choices may have message.content or text
                    text = (ch.get("message") or {}).get("content") or ch.get("text") or None

            # top-level 'output' or 'content'
            if not text:
                text = data.get("output") or data.get("content") or data.get("text")

            # nested response wrappers
            if not text and "response" in data and isinstance(data["response"], dict):
                # e.g., data["response"]["content"] or a list of content parts
                resp_obj = data["response"]
                if isinstance(resp_obj.get("content"), str):
                    text = resp_obj.get("content")
                elif isinstance(resp_obj.get("content"), list) and resp_obj["content"]:
                    # join content parts
                    try:
                        text = " ".join([c.get("text") or c.get("content") or "" for c in resp_obj["content"]])
                    except Exception:
                        text = None

        # fallback: stringify the whole JSON (safe but verbose)
        if text is None:
            text = json.dumps(data, ensure_ascii=False)

        return str(text)

# ---------- Helper utilities ----------
def make_message(role: str, content: str) -> Message:
    return {
        "id": str(uuid.uuid4()),
        "role": role,
        "content": content,
        "timestamp": time.time()
    }

# ---------- Streamlit UI ----------
st.set_page_config(page_title="Programmable Gemini Chat (Option B)", layout="wide")
st.title("Programmable Chatbot (Streamlit + Gemini adapter) — Option B")

# Reactive session_state bootstrap
if "chats" not in st.session_state:
    st.session_state.chats = load_chats()

if "current_chat" not in st.session_state:
    st.session_state.current_chat = st.session_state.chats[0]["id"]

if "system_prompt" not in st.session_state:
    st.session_state.system_prompt = (
        "You are a helpful assistant. Answer concisely. If unsure, say you don't know and suggest how to get the info."
    )

if "api_url" not in st.session_state:
    st.session_state.api_url = os.getenv("GEMINI_API_URL", "")

if "api_key_masked" not in st.session_state:
    st.session_state.api_key_masked = ""  # don't persist secret to disk

if "model" not in st.session_state:
    st.session_state.model = os.getenv("FALLBACK_MODEL", FALLBACK_MODEL)

if "store_file" not in st.session_state:
    st.session_state.store_file = DEFAULT_STORE_FILE

# --- Connection panel (top) ---
with st.expander("Connection / API settings", expanded=True):
    col1, col2, col3 = st.columns([3, 3, 2])
    with col1:
        use_env = st.checkbox("Use environment variables (GEMINI_API_URL / GEMINI_API_KEY)", value=False)
        if use_env:
            api_url = os.getenv("GEMINI_API_URL", "") or st.session_state.api_url
            api_key = os.getenv("GEMINI_API_KEY", "")
            st.info("Using environment variables. UI key input will be ignored.")
            st.session_state.api_url = api_url
            # don't store key in session_state if using env
            st.session_state.api_key_masked = ""
        else:
            st.session_state.api_url = st.text_input("GEMINI API URL", value=st.session_state.api_url, help="Full endpoint URL (e.g. https://.../v1/projects/...:predict)")
            # mask input; we keep it only in session_state for the user session
            st.session_state.api_key_masked = st.text_input("API Key (masked)", value=st.session_state.api_key_masked, type="password", help="Paste your API key here (only stored in this session)")
            api_key = os.getenv("GEMINI_API_KEY", "") or st.session_state.api_key_masked
            api_url = st.session_state.api_url

    with col2:
        st.session_state.model = st.text_input("Model (optional)", value=st.session_state.model, help=f"Model name (default: {FALLBACK_MODEL})")
        st.session_state.store_file = st.text_input("Chats store file", value=st.session_state.store_file, help="Local JSON file where chats are saved")

    with col3:
        test_btn = st.button("Test connection")
        clear_store = st.button("Clear local chat store")
        if clear_store:
            # careful: this removes file but not session state
            try:
                if os.path.exists(st.session_state.store_file):
                    os.remove(st.session_state.store_file)
                    st.success(f"Deleted {st.session_state.store_file}. Restarting chat list.")
                else:
                    st.info("No store file found to delete.")
                # reset session chats
                st.session_state.chats = load_chats(st.session_state.store_file)
                st.session_state.current_chat = st.session_state.chats[0]["id"]
            except Exception as e:
                st.error(f"Failed to delete store: {e}")

    # Test connection action
    if test_btn:
        # build adapter with env or provided values
        effective_api_url = os.getenv("GEMINI_API_URL") if use_env else st.session_state.api_url
        effective_api_key = os.getenv("GEMINI_API_KEY") if use_env else st.session_state.api_key_masked
        if not effective_api_url or not effective_api_key:
            st.error("Provide API URL and API key (or enable env vars).")
        else:
            st.info("Testing connection — sending a short prompt. This will not store your key to disk.")
            adapter = LLMAdapter(api_url=effective_api_url, api_key=effective_api_key, model=st.session_state.model)
            try:
                resp = adapter.call_gemini(system_prompt="system test", conversation=[{"role": "user", "content": "Say 'hello' in one word."}], max_tokens=32, timeout=30)
                st.success("Connection OK — model responded.")
                st.code(resp[:1000])
            except Exception as e:
                st.error(f"Connection test failed: {e}")

# ---------- Layout: left column chat list, right column chat area ----------
col_left, col_right = st.columns([1, 3])

with col_left:
    st.subheader("Chats")
    if st.button("New chat"):
        new_chat = {
            "id": str(uuid.uuid4()),
            "title": f"Chat {len(st.session_state.chats) + 1}",
            "messages": [make_message("assistant", "Hello! I'm your AI assistant. How can I help?")],
            "created_at": time.time()
        }
        st.session_state.chats.insert(0, new_chat)
        st.session_state.current_chat = new_chat["id"]
        save_chats(st.session_state.chats, st.session_state.store_file)

    # list chats
    for chat in st.session_state.chats:
        cols = st.columns([8, 2])
        if st.button(chat["title"], key=f"select_{chat['id']}"):
            st.session_state.current_chat = chat["id"]
        if cols[1].button("Delete", key=f"del_{chat['id']}"):
            st.session_state.chats = [c for c in st.session_state.chats if c["id"] != chat["id"]]
            if not st.session_state.chats:
                st.session_state.chats = load_chats(st.session_state.store_file)
            st.session_state.current_chat = st.session_state.chats[0]["id"]
            save_chats(st.session_state.chats, st.session_state.store_file)
    st.markdown("---")
    if st.button("Save chats now"):
        save_chats(st.session_state.chats, st.session_state.store_file)
        st.success("Saved to disk.")

with col_right:
    # find the active chat
    active_chat = next((c for c in st.session_state.chats if c["id"] == st.session_state.current_chat), None)
    if not active_chat:
        st.error("No active chat found.")
        st.stop()

    st.subheader(active_chat["title"])
    # display messages
    for m in active_chat["messages"]:
        ts = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(m.get("timestamp", time.time())))
        if m["role"] == "user":
            st.markdown(f"<div style='text-align:right; background:linear-gradient(90deg,#2563eb,#06b6d4); padding:10px; border-radius:12px; color:white; display:inline-block; max-width:90%;'>{st.markdown(m['content'], unsafe_allow_html=False)}</div>", unsafe_allow_html=True)
            # Alternative: show plain
            st.markdown(f"**You — {ts}**\n\n{m['content']}")
        elif m["role"] == "assistant":
            st.markdown(f"**Assistant — {ts}**\n\n{m['content']}")
        else:
            st.info(f"System ({ts}): {m['content']}")

    st.markdown("---")

    # system prompt editor
    st.text_area("System prompt (editable)", value=st.session_state.system_prompt, key="system_prompt_text", height=100)
    st.session_state.system_prompt = st.session_state.get("system_prompt_text", st.session_state.system_prompt)

    # input box + send
    user_input = st.text_input("Ask the assistant", key="user_input", placeholder="Ask me about budgeting, investing, or programming...")

    # controls
    col_a, col_b, col_c = st.columns([1,1,1])
    with col_a:
        send_btn = st.button("Send")
    with col_b:
        regen_btn = st.button("Regenerate last")
    with col_c:
        clear_btn = st.button("Clear chat")

    if clear_btn:
        active_chat["messages"] = [make_message("assistant", "Hello! Chat cleared. How can I help?")]
        save_chats(st.session_state.chats, st.session_state.store_file)
        st.experimental_rerun()

    if send_btn and user_input.strip():
        # append user message
        active_chat["messages"].append(make_message("user", user_input.strip()))
        save_chats(st.session_state.chats, st.session_state.store_file)

        # determine effective credentials (env or UI)
        # prefer env if user enabled checkbox earlier; else UI values
        use_env = st.session_state.get("api_url") == os.getenv("GEMINI_API_URL") and os.getenv("GEMINI_API_KEY")
        effective_api_url = os.getenv("GEMINI_API_URL") if use_env and os.getenv("GEMINI_API_URL") else st.session_state.api_url
        effective_api_key = os.getenv("GEMINI_API_KEY") if use_env and os.getenv("GEMINI_API_KEY") else st.session_state.api_key_masked

        if not effective_api_url or not effective_api_key:
            st.error("Missing API URL or API key. Provide them in the Connection panel.")
        else:
            adapter = LLMAdapter(api_url=effective_api_url, api_key=effective_api_key, model=st.session_state.model)
            # compose conversation for model (system + last N messages)
            conversation = []
            conversation.append({"role": "system", "content": st.session_state.system_prompt})
            # include last 20 messages to limit size
            for msg in active_chat["messages"][-40:]:
                conversation.append({"role": msg["role"], "content": msg["content"]})

            with st.spinner("Talking to model..."):
                try:
                    generated = adapter.call_gemini(system_prompt=st.session_state.system_prompt, conversation=conversation, max_tokens=1024)
                except Exception as e:
                    st.error(f"LLM call failed: {e}")
                    generated = "Sorry — the model call failed."
                # append assistant message
                active_chat["messages"].append(make_message("assistant", generated))
                save_chats(st.session_state.chats, st.session_state.store_file)
                # clear input
                st.session_state.user_input = ""
                st.experimental_rerun()

    if regen_btn:
        # remove last assistant message and re-generate for last user message
        msgs = active_chat["messages"]
        # remove last assistant if present
        if msgs and msgs[-1]["role"] == "assistant":
            msgs.pop(-1)
        last_user = None
        for m in reversed(msgs):
            if m["role"] == "user":
                last_user = m
                break
        if not last_user:
            st.warning("No user message to regenerate for.")
        else:
            # check credentials
            use_env = st.session_state.get("api_url") == os.getenv("GEMINI_API_URL") and os.getenv("GEMINI_API_KEY")
            effective_api_url = os.getenv("GEMINI_API_URL") if use_env and os.getenv("GEMINI_API_URL") else st.session_state.api_url
            effective_api_key = os.getenv("GEMINI_API_KEY") if use_env and os.getenv("GEMINI_API_KEY") else st.session_state.api_key_masked
            if not effective_api_url or not effective_api_key:
                st.error("Missing API URL or API key. Provide them in the Connection panel.")
            else:
                adapter = LLMAdapter(api_url=effective_api_url, api_key=effective_api_key, model=st.session_state.model)
                conversation = [{"role": "system", "content": st.session_state.system_prompt}]
                for msg in msgs:
                    conversation.append({"role": msg["role"], "content": msg["content"]})
                with st.spinner("Regenerating..."):
                    try:
                        generated = adapter.call_gemini(system_prompt=st.session_state.system_prompt, conversation=conversation, max_tokens=1024)
                    except Exception as e:
                        st.error(f"LLM call failed: {e}")
                        generated = "Sorry — the model call failed."
                    active_chat["messages"].append(make_message("assistant", generated))
                    save_chats(st.session_state.chats, st.session_state.store_file)
                    st.experimental_rerun()
