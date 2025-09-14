import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ClockIcon,
  ExternalLinkIcon,
  PlayIcon,
  BookOpenIcon,
} from "lucide-react";
import Badge from "../Common/Badge";

const ProblemList = ({ problems, onProblemClick, onStatusChange }) => {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "solved":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "attempted":
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return (
          <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Problems ({problems.length})
        </h3>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {problems.map((problem, index) => (
          <motion.div
            key={problem._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <button
                  onClick={() =>
                    onStatusChange(
                      problem._id,
                      problem.progress?.status === "solved"
                        ? "pending"
                        : "solved"
                    )
                  }
                  className="flex-shrink-0"
                >
                  {getStatusIcon(problem.progress?.status)}
                </button>

                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => onProblemClick(problem._id)}
                    className="text-left w-full"
                  >
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {problem.name}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getDifficultyColor(problem.difficulty)}>
                        {problem.difficulty}
                      </Badge>
                      {problem.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0">
                {problem.links.leetcode && (
                  <button
                    onClick={() =>
                      window.open(problem.links.leetcode, "_blank")
                    }
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="LeetCode"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                  </button>
                )}
                {problem.links.youtube && (
                  <button
                    onClick={() => window.open(problem.links.youtube, "_blank")}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="YouTube"
                  >
                    <PlayIcon className="w-4 h-4" />
                  </button>
                )}
                {problem.links.article && (
                  <button
                    onClick={() => window.open(problem.links.article, "_blank")}
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                    title="Article"
                  >
                    <BookOpenIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProblemList;
