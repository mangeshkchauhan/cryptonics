import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg shadow-blue-500/25",
      secondary: "bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500",
      outline: "border border-gray-600 text-gray-300 hover:bg-gray-800 focus:ring-gray-500",
      ghost: "text-gray-400 hover:text-white hover:bg-gray-800 focus:ring-gray-500",
      destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg shadow-red-500/25",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isLoading && "cursor-not-allowed",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button }; 