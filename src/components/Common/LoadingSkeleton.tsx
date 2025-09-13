import React from "react";

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = "",
  lines = 1,
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`bg-gray-200 dark:bg-gray-700 rounded ${
            lines > 1 ? "h-4 mb-2" : "h-4"
          } ${index === lines - 1 && lines > 1 ? "w-3/4" : "w-full"}`}
        />
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="animate-pulse">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
      <div className="flex justify-between">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16" />
      </div>
    </div>
  </div>
);

export const TableSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
      <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-1/4" />
    </div>
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="px-6 py-4 animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
            </div>
            <div className="flex space-x-2">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default LoadingSkeleton;
