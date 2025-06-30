import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "./Button";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function ErrorMessage({ 
  title = "Something went wrong", 
  message, 
  onRetry, 
  showRetry = true 
}: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center min-h-[200px] p-8">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-100 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-400 mb-6">
          {message}
        </p>
        
        {showRetry && onRetry && (
          <Button 
            onClick={onRetry} 
            variant="outline"
            className="inline-flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export function PageError({ 
  title = "Page Error", 
  message = "There was an error loading this page. Please try again later.",
  onRetry 
}: Omit<ErrorMessageProps, "showRetry">) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ErrorMessage title={title} message={message} onRetry={onRetry} />
    </div>
  );
} 