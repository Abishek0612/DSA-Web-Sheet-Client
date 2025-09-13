import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = true,
  hover = false,
  onClick,
}) => {
  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      whileHover={hover ? { y: -2 } : undefined}
      onClick={onClick}
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700
        ${hover ? "hover:shadow-xl transition-all duration-300" : ""}
        ${
          onClick
            ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            : ""
        }
        ${padding ? "p-6" : ""}
        ${className}
      `}
    >
      {children}
    </Component>
  );
};

export default Card;
