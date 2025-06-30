import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative">
        <div
          className={cn(
            "border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin",
            sizes[size],
            className
          )}
        />
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-400 rounded-full animate-spin animate-pulse" />
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <LoadingSpinner size="xl" />
        <p className="mt-4 text-gray-400 text-lg">Loading...</p>
      </div>
    </div>
  );
} 