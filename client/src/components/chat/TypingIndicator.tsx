export default function TypingIndicator() {
  return (
    <div className="flex items-start space-x-3" data-testid="typing-indicator">
      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
        <i className="fas fa-robot text-primary-foreground text-sm"></i>
      </div>
      <div className="message-bubble bg-card border border-border rounded-xl p-4">
        <div className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    </div>
  );
}
