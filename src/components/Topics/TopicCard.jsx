import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRightIcon,
  ClockIcon,
  BookOpenIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import Badge from "../Common/Badge";
import Button from "../Common/Button";

const TopicCard = ({ topic, delay = 0, isAdmin = false, onEdit, onDelete }) => {
  const progress = topic.progress || { solved: 0, total: 0, percentage: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden group hover:shadow-xl transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{topic.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {topic.name}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {topic.category}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {progress.solved}/{progress.total}
            </div>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {progress.percentage}%
            </div>
          </div>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="flex justify-end space-x-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onEdit();
              }}
              leftIcon={<EditIcon className="w-3 h-3" />}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
              leftIcon={<TrashIcon className="w-3 h-3" />}
            >
              Delete
            </Button>
          </div>
        )}

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {topic.description}
        </p>

        <div className="mb-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress.percentage}%` }}
              transition={{ delay: delay + 0.5, duration: 1 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-1">
            <BookOpenIcon className="w-4 h-4" />
            <span>{topic.totalProblems} problems</span>
          </div>
          <div className="flex items-center space-x-1">
            <ClockIcon className="w-4 h-4" />
            <span>{topic.estimatedTime}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {topic.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {topic.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{topic.tags.length - 3} more
            </Badge>
          )}
        </div>

        <Link
          to={`/topics/${topic._id}`}
          className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600"
        >
          <span className="mr-2">Start Learning</span>
          <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default TopicCard;
