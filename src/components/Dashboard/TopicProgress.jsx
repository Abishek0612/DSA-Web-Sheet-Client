import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";

const TopicProgress = ({ topic, delay = 0 }) => {
  const progress = topic.progress || { solved: 0, total: 0, percentage: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Link
        to={`/topics/${topic._id}`}
        className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{topic.icon}</div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {topic.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {progress.solved} of {progress.total} problems
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {progress.percentage}%
              </div>
              <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TopicProgress;
