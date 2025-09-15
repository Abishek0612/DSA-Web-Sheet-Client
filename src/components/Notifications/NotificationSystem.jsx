import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleIcon,
  InfoIcon,
  XIcon,
  AlertTriangleIcon,
  BellIcon,
} from "lucide-react";
import { useSocket } from "../../hooks/useSocket";

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const { on } = useSocket();

  useEffect(() => {
    const cleanup = on("notification", (notification) => {
      console.log(" Received notification:", notification);

      playNotificationSound();

      setNotifications((prev) => [...prev, notification]);

      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((n) => n.id !== notification.id)
        );
      }, 5000);
    });

    return cleanup;
  }, [on]);

  const playNotificationSound = () => {
    try {
      const audio = new Audio();
      audio.src =
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIaAzSM0v";
      audio.volume = 0.5;
      audio.play().catch((error) => {
        console.warn("Could not play notification sound:", error);
      });
    } catch (error) {
      console.warn("Error creating notification sound:", error);
    }
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "info":
        return <InfoIcon className="w-5 h-5 text-blue-500" />;
      case "warning":
        return <AlertTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case "error":
        return <AlertTriangleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <BellIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getColors = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300";
      case "error":
        return "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900/20 dark:border-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.3 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.5 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
            className={`border rounded-lg p-4 shadow-lg backdrop-blur-sm ${getColors(
              notification.type
            )}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">{getIcon(notification.type)}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <p className="text-sm mt-1 opacity-90">
                  {notification.message}
                </p>
                {notification.timestamp && (
                  <p className="text-xs mt-2 opacity-70">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-current opacity-50 hover:opacity-75 transition-opacity"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;
