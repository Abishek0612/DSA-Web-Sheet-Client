import React from "react";
import { Loader2, RefreshCw } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large" | "xlarge";
  variant?: "default" | "overlay" | "inline" | "minimal";
  color?: "primary" | "secondary" | "white" | "gray";
  message?: string;
  className?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  variant = "default",
  color = "primary",
  message,
  className = "",
  fullScreen = false,
}) => {
  // Size configurations
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
    xlarge: "h-16 w-16",
  };

  // Color configurations
  const colorClasses = {
    primary: "text-blue-600",
    secondary: "text-gray-600",
    white: "text-white",
    gray: "text-gray-400",
  };

  // Message text color based on spinner color
  const messageColorClasses = {
    primary: "text-gray-600",
    secondary: "text-gray-500",
    white: "text-white",
    gray: "text-gray-400",
  };

  // Container classes based on variant
  const containerClasses = {
    default: "flex flex-col items-center justify-center space-y-3",
    overlay:
      "fixed inset-0 bg-white bg-opacity-75 flex flex-col items-center justify-center space-y-3 z-50",
    inline: "inline-flex items-center space-x-2",
    minimal: "flex items-center justify-center",
  };

  // Full screen override
  const finalContainerClass = fullScreen
    ? "fixed inset-0 bg-white flex flex-col items-center justify-center space-y-3 z-50"
    : containerClasses[variant];

  const SpinnerIcon = () => (
    <Loader2
      className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin ${className}`}
      aria-hidden="true"
    />
  );

  const renderContent = () => {
    switch (variant) {
      case "inline":
        return (
          <>
            <SpinnerIcon />
            {message && (
              <span className={`text-sm ${messageColorClasses[color]}`}>
                {message}
              </span>
            )}
          </>
        );

      case "minimal":
        return <SpinnerIcon />;

      default:
        return (
          <>
            <SpinnerIcon />
            {message && (
              <p
                className={`text-sm font-medium ${messageColorClasses[color]} text-center max-w-xs`}
              >
                {message}
              </p>
            )}
          </>
        );
    }
  };

  return (
    <div
      className={finalContainerClass}
      role="status"
      aria-live="polite"
      aria-label={message || "Loading"}
    >
      {renderContent()}
      <span className="sr-only">{message || "Loading..."}</span>
    </div>
  );
};

// Pre-configured spinner variants for common use cases
export const PageLoader: React.FC<{ message?: string }> = ({
  message = "Loading page...",
}) => (
  <LoadingSpinner
    size="large"
    variant="default"
    message={message}
    className="min-h-[400px]"
  />
);

export const OverlayLoader: React.FC<{ message?: string }> = ({
  message = "Processing...",
}) => <LoadingSpinner size="large" variant="overlay" message={message} />;

export const InlineLoader: React.FC<{
  message?: string;
  size?: "small" | "medium";
}> = ({ message = "Loading...", size = "small" }) => (
  <LoadingSpinner size={size} variant="inline" message={message} />
);

export const ButtonLoader: React.FC = () => (
  <LoadingSpinner size="small" variant="minimal" color="white" />
);

export const CardLoader: React.FC<{ message?: string }> = ({ message }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
    <LoadingSpinner size="medium" variant="default" message={message} />
  </div>
);

// Skeleton loader for content placeholders
export const SkeletonLoader: React.FC<{
  lines?: number;
  className?: string;
}> = ({ lines = 3, className = "" }) => (
  <div className={`animate-pulse space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <div key={index}>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        {index === lines - 1 && (
          <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
        )}
      </div>
    ))}
  </div>
);

// Full screen loading component for app initialization
export const AppLoader: React.FC = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center z-50">
    <div className="text-center space-y-6">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <div className="text-3xl font-bold text-blue-600">DSA Sheet</div>
      </div>

      <LoadingSpinner size="large" color="primary" variant="minimal" />

      <div className="space-y-2">
        <p className="text-lg font-medium text-gray-700">
          Loading your workspace...
        </p>
        <p className="text-sm text-gray-500">
          Getting everything ready for you
        </p>
      </div>

      <div className="flex items-center justify-center space-x-1 mt-8">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div
          className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  </div>
);

// Custom hook for loading states
export const useLoading = (initialState: boolean = false) => {
  const [loading, setLoading] = React.useState(initialState);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  const toggleLoading = () => setLoading((prev) => !prev);

  return {
    loading,
    startLoading,
    stopLoading,
    toggleLoading,
    setLoading,
  };
};

export default LoadingSpinner;
