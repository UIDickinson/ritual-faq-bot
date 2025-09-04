import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatResponse {
  answer: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Welcome to Ritual AI! I'm here to help you with step-by-step guidance and technical assistance.\n\n**What I can help with:**\n• Technical problem-solving\n• Step-by-step tutorials\n• Code examples and explanations\n• Best practices and recommendations",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const chatMutation = useMutation({
    mutationFn: async (query: string): Promise<ChatResponse> => {
      const response = await apiRequest("POST", "/api/chat", { query });
      return response.json();
    },
    onSuccess: (data) => {
      const botMessage: Message = {
        id: Date.now().toString() + "_bot",
        text: data.answer,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    },
    onError: (error) => {
      console.error("Chat error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get response. Please try again.",
      });
    },
  });

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    chatMutation.mutate(text.trim());
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, chatMutation.isPending]);

  return (
    <div className="chat-container flex flex-col h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-6 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center" data-testid="logo-container">
            <i className="fas fa-robot text-primary-foreground text-lg"></i>
          </div>
          <h1 className="text-xl font-bold text-foreground" data-testid="app-title">
            Ritual AI
          </h1>
        </div>
        
        <nav className="flex items-center space-x-4" data-testid="social-nav">
          <a
            href="https://twitter.com/ritualnet"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-card hover:bg-secondary rounded-lg flex items-center justify-center transition-colors duration-200 border border-border"
            data-testid="link-twitter"
          >
            <i className="fab fa-twitter text-muted-foreground hover:text-foreground text-lg"></i>
          </a>
          <a
            href="https://discord.gg/HCGFMRGbkW"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-card hover:bg-secondary rounded-lg flex items-center justify-center transition-colors duration-200 border border-border"
            data-testid="link-discord"
          >
            <i className="fab fa-discord text-muted-foreground hover:text-foreground text-lg"></i>
          </a>
          <a
            href="https://ritual.academy/ritual/faqs/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-card hover:bg-secondary rounded-lg flex items-center justify-center transition-colors duration-200 border border-border"
            data-testid="link-faq"
          >
            <i className="fas fa-question-circle text-muted-foreground hover:text-foreground text-lg"></i>
          </a>
        </nav>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 pb-6">
        {/* Messages Area */}
        <div className="messages-container flex-1 space-y-4 p-6 bg-card/10 backdrop-blur-sm rounded-t-xl border border-border/50 overflow-y-auto" data-testid="messages-container">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              data-testid={`message-${message.isBot ? 'bot' : 'user'}-${message.id}`}
            />
          ))}
          
          {chatMutation.isPending && <TypingIndicator data-testid="typing-indicator" />}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={chatMutation.isPending}
          data-testid="chat-input"
        />
      </main>

      {/* Status Bar */}
      <div className="px-6 pb-2">
        <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground" data-testid="status-bar">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full" data-testid="connection-status"></div>
            <span>Connected to Ritual AI</span>
          </div>
          <span>•</span>
          <span>Powered by OpenAI & Pinecone</span>
        </div>
      </div>
    </div>
  );
}
