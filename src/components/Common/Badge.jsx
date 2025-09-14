import React from "react";

const Badge = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "danger":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "outline":
        return "border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-2 py-0.5 text-xs";
      case "lg":
        return "px-3 py-1 text-sm";
      default:
        return "px-2.5 py-0.5 text-xs";
    }
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
