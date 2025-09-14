import React from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon, ClockIcon, BookOpenIcon } from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "solved",
      title: "Two Sum",
      topic: "Arrays",
      time: "2 hours ago",
      difficulty: "Easy",
    },
    {
      id: 2,
      type: "started",
      title: "Binary Search",
      topic: "Searching",
      time: "5 hours ago",
      difficulty: "Medium",
    },
    {
      id: 3,
      type: "solved",
      title: "Valid Parentheses",
      topic: "Stack",
      time: "1 day ago",
      difficulty: "Easy",
    },
    {
      id: 4,
      type: "solved",
      title: "Merge Two Sorted Lists",
      topic: "Linked List",
      time: "2 days ago",
      difficulty: "Easy",
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "solved":
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case "started":
        return <ClockIcon className="w-4 h-4 text-yellow-500" />;
      default:
        return <BookOpenIcon className="w-4 h-4 text-blue-500" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20";
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20";
      case "hard":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {activity.title}
                </p>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                    activity.difficulty
                  )}`}
                >
                  {activity.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {activity.topic}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {activity.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
          View all activity
        </button>
      </div>
    </motion.div>
  );
};

export default RecentActivity;
