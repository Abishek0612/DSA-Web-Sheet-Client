import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  delay = 200,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const getPositionClasses = () => {
    switch (position) {
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case "bottom":
        return "bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-900 border-b-4 border-l-4 border-r-4 border-l-transparent border-r-transparent";
      case "left":
        return "left-full top-1/2 transform -translate-y-1/2 border-l-gray-900 border-l-4 border-t-4 border-b-4 border-t-transparent border-b-transparent";
      case "right":
        return "right-full top-1/2 transform -translate-y-1/2 border-r-gray-900 border-r-4 border-t-4 border-b-4 border-t-transparent border-b-transparent";
      default:
        return "top-full left-1/2 transform -translate-x-1/2 border-t-gray-900 border-t-4 border-l-4 border-r-4 border-l-transparent border-r-transparent";
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.1 }}
            className={`absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap ${getPositionClasses()}`}
          >
            {content}
            <div className={`absolute w-0 h-0 ${getArrowClasses()}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
