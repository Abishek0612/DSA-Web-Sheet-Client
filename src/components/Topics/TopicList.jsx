import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRightIcon,
  BookOpenIcon,
  ClockIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import Badge from "../Common/Badge";
import Button from "../Common/Button";

const TopicList = ({ topic, delay = 0, isAdmin = false, onEdit, onDelete }) => {
  const progress = topic.progress || { solved: 0, total: 0, percentage: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="text-2xl flex-shrink-0">{topic.icon}</div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <Link to={`/topics/${topic._id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {topic.name}
                  </h3>
                </Link>
                <Badge variant="secondary" className="text-xs">
                  {topic.category}
                </Badge>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-1">
                {topic.description}
              </p>

              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <BookOpenIcon className="w-4 h-4" />
                  <span>{topic.totalProblems} problems</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>{topic.estimatedTime}</span>
                </div>
                <div className="flex space-x-1">
                  {topic.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Admin Controls */}
            {isAdmin && (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onEdit}
                  leftIcon={<EditIcon className="w-3 h-3" />}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={onDelete}
                  leftIcon={<TrashIcon className="w-3 h-3" />}
                >
                  Delete
                </Button>
              </div>
            )}

            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Progress
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[3rem]">
                  {progress.percentage}%
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {progress.solved} of {progress.total}
              </div>
            </div>

            <Link to={`/topics/${topic._id}`}>
              <ChevronRightIcon className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicList;
