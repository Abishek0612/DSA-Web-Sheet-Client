import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";

const EmptyState = ({ icon, title, description, action, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-center py-12 ${className}`}
    >
      {icon && (
        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">{icon}</div>
      )}

      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        {description}
      </p>

      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </motion.div>
  );
};

export default EmptyState;
