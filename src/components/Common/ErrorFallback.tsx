import React from "react";
import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";
import Button from "./Button";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
          <AlertTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We encountered an unexpected error. Please try refreshing the page.
        </p>

        <details className="text-left mb-6">
          <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 mb-2">
            Error details
          </summary>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-3 rounded border overflow-auto">
            {error.message}
          </pre>
        </details>

        <div className="flex space-x-3">
          <Button onClick={() => window.location.reload()} className="flex-1">
            <RefreshCwIcon className="w-4 h-4 mr-2" />
            Refresh Page
          </Button>

          {resetErrorBoundary && (
            <Button
              variant="outline"
              onClick={resetErrorBoundary}
              className="flex-1"
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
