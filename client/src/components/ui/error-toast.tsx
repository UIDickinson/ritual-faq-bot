import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ErrorToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function ErrorToast({ 
  message, 
  isVisible, 
  onClose, 
  duration = 3000 
}: ErrorToastProps) {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      const timer = setTimeout(() => {
        setIsShowing(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, duration);
      
      return () => clearTimeout(timer);
    } else {
      setIsShowing(false);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed top-4 right-4 bg-destructive text-destructive-foreground px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 z-50 max-w-md",
        isShowing ? "translate-x-0" : "translate-x-full"
      )}
      data-testid="error-toast"
    >
      <div className="flex items-center space-x-2">
        <i className="fas fa-exclamation-circle flex-shrink-0"></i>
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={() => {
            setIsShowing(false);
            setTimeout(onClose, 300);
          }}
          className="ml-2 text-destructive-foreground/70 hover:text-destructive-foreground transition-colors"
          data-testid="button-close-toast"
        >
          <i className="fas fa-times text-sm"></i>
        </button>
      </div>
    </div>
  );
}

// Hook for managing error toast state
export function useErrorToast() {
  const [error, setError] = useState<string | null>(null);

  const showError = (message: string) => {
    setError(message);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    isVisible: !!error,
    showError,
    clearError,
  };
}

export default ErrorToast;
