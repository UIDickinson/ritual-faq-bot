import { format } from "date-fns";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const formatMessageContent = (text: string) => {
    // Handle markdown-style formatting
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        // Code block
        const code = part.slice(3, -3);
        return (
          <div key={index} className="bg-muted rounded-md p-3 mt-2 mb-2">
            <code className="text-sm text-foreground font-mono">{code}</code>
          </div>
        );
      } else if (part.startsWith('**') && part.endsWith('**')) {
        // Bold text
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      } else if (part.startsWith('*') && part.endsWith('*')) {
        // Italic text
        return <em key={index}>{part.slice(1, -1)}</em>;
      } else if (part.startsWith('`') && part.endsWith('`')) {
        // Inline code
        return <code key={index} className="bg-muted px-1 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
      } else {
        // Regular text with line breaks
        return part.split('\n').map((line, lineIndex) => (
          <span key={`${index}-${lineIndex}`}>
            {line}
            {lineIndex < part.split('\n').length - 1 && <br />}
          </span>
        ));
      }
    });
  };

  if (message.isBot) {
    return (
      <div className="flex items-start space-x-3" data-testid="message-bot">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <i className="fas fa-robot text-primary-foreground text-sm"></i>
        </div>
        <div className="message-bubble bg-card border border-border rounded-xl p-4 max-w-3xl">
          <div className="text-foreground space-y-2">
            {formatMessageContent(message.text)}
          </div>
          <div className="text-xs text-muted-foreground mt-3">
            {format(message.timestamp, "HH:mm")}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-3 justify-end" data-testid="message-user">
      <div className="message-bubble bg-primary text-primary-foreground rounded-xl p-4 max-w-3xl">
        <p className="whitespace-pre-wrap">{message.text}</p>
        <div className="text-xs text-primary-foreground/70 mt-2">
          {format(message.timestamp, "HH:mm")}
        </div>
      </div>
      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
        <i className="fas fa-user text-secondary-foreground text-sm"></i>
      </div>
    </div>
  );
}
