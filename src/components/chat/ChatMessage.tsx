import React from "react";
import ChatBotIcon from "./ChatBotIcon";
import { ChatMessage as ChatMessageType } from "./types";

interface ChatMessageProps {
  chat: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ chat }) => {
  return (
    <div className={`message ${chat.role === "model" ? "bot" : "user"}-message`}>
      {chat.role === "model" && <ChatBotIcon />}
      <p className="message-text">{chat.text}</p>
    </div>
  );
};

export default ChatMessage;