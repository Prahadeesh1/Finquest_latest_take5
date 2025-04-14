export interface ChatMessage {
    role: "user" | "model";
    text: string;
  }
  
  export interface ChatHistory {
    role: string;
    parts: { text: string }[];
  }