import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 128) + "px";
    }
  };

  useEffect(() => {
    autoResize();
  }, [input]);

  return (
    <div className="bg-card/20 backdrop-blur-sm border border-border/50 rounded-b-xl p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3" data-testid="chat-form">
        <div className="flex-1">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about Ritual AI, blockchain development, or technical implementation..."
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none min-h-[48px] max-h-32"
              rows={1}
              maxLength={2000}
              disabled={isLoading}
              data-testid="input-message"
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground" data-testid="text-character-count">
              {input.length}/2000
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-3 font-medium transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="button-send"
        >
          <i className="fas fa-paper-plane"></i>
          <span>Send</span>
        </button>
      </form>
      
      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <i className="fas fa-lightbulb"></i>
            <span>Try asking for step-by-step guides</span>
          </span>
          <span className="flex items-center space-x-1">
            <i className="fas fa-code"></i>
            <span>Request code examples</span>
          </span>
        </div>
        <span className="flex items-center space-x-1">
          <i className="fas fa-keyboard"></i>
          <span>Press Enter to send</span>
        </span>
      </div>
    </div>
  );
}
