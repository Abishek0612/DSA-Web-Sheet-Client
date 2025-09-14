import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({
  value,
  max = 100,
  color = "blue",
  size = "md",
  showLabel = false,
  animated = true,
  className = "",
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const getColorClasses = () => {
    switch (color) {
      case "green":
        return "bg-green-500";
      case "yellow":
        return "bg-yellow-500";
      case "red":
        return "bg-red-500";
      case "purple":
        return "bg-purple-500";
      default:
        return "bg-blue-500";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-2";
      case "lg":
        return "h-4";
      default:
        return "h-3";
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Progress
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {value}/{max}
          </span>
        </div>
      )}

      <div
        className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${getSizeClasses()}`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={
            animated ? { duration: 1, ease: "easeOut" } : { duration: 0 }
          }
          className={`h-full rounded-full ${getColorClasses()}`}
        />
      </div>

      {showLabel && (
        <div className="text-center mt-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {percentage.toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
