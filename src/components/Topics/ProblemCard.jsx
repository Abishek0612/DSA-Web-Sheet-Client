import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLinkIcon,
  PlayIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  LightbulbIcon,
} from "lucide-react";
import Badge from "../Common/Badge";
import Button from "../Common/Button";

const ProblemCard = ({ problem, onStatusChange }) => {
  const [showHints, setShowHints] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "success";
      case "medium":
        return "warning";
      case "hard":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "solved":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "attempted":
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const handleStatusChange = (status) => {
    onStatusChange(problem._id, status);
  };

  const safeLinks = problem.links || {};
  const safeTags = problem.tags || [];
  const safeCompanies = problem.companies || [];
  const safeHints = problem.hints || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {problem.name}
            </h3>
            {getStatusIcon(problem.progress?.status)}
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <Badge variant={getDifficultyColor(problem.difficulty)}>
              {problem.difficulty}
            </Badge>
            {problem.timeComplexity && (
              <Badge variant="outline" className="text-xs">
                Time: {problem.timeComplexity}
              </Badge>
            )}
            {problem.spaceComplexity && (
              <Badge variant="outline" className="text-xs">
                Space: {problem.spaceComplexity}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
        {problem.description}
      </p>

      {safeTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {safeTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {safeCompanies.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Asked by:
          </p>
          <div className="flex flex-wrap gap-1">
            {safeCompanies.slice(0, 3).map((company) => (
              <Badge key={company} variant="outline" className="text-xs">
                {company}
              </Badge>
            ))}
            {safeCompanies.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{safeCompanies.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          {safeLinks.leetcode && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(safeLinks.leetcode, "_blank")}
            >
              <ExternalLinkIcon className="w-4 h-4 mr-1" />
              LeetCode
            </Button>
          )}
          {safeLinks.youtube && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(safeLinks.youtube, "_blank")}
            >
              <PlayIcon className="w-4 h-4 mr-1" />
              Video
            </Button>
          )}
          {safeLinks.article && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(safeLinks.article, "_blank")}
            >
              <BookOpenIcon className="w-4 h-4 mr-1" />
              Article
            </Button>
          )}
        </div>

        {safeHints.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHints(!showHints)}
          >
            <LightbulbIcon className="w-4 h-4 mr-1" />
            Hints ({safeHints.length})
          </Button>
        )}
      </div>

      {showHints && safeHints.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4"
        >
          <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">
            Hints:
          </h4>
          <ul className="space-y-1">
            {safeHints.map((hint, index) => (
              <li
                key={index}
                className="text-sm text-yellow-700 dark:text-yellow-400"
              >
                {index + 1}. {hint}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <Button
            variant={
              problem.progress?.status === "attempted" ? "primary" : "outline"
            }
            size="sm"
            onClick={() => handleStatusChange("attempted")}
          >
            Mark Attempted
          </Button>
          <Button
            variant={
              problem.progress?.status === "solved" ? "success" : "outline"
            }
            size="sm"
            onClick={() => handleStatusChange("solved")}
          >
            Mark Solved
          </Button>
        </div>

        {problem.progress?.rating && (
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`w-4 h-4 ${
                  star <= problem.progress.rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {problem.progress && problem.progress.status !== "pending" && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex justify-between">
            <span>Attempts: {problem.progress.attempts || 0}</span>
            <span>
              Time: {Math.floor((problem.progress.timeSpent || 0) / 60)}m
            </span>
            <span>
              Last:{" "}
              {problem.progress.lastAttempted
                ? new Date(problem.progress.lastAttempted).toLocaleDateString()
                : "Never"}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProblemCard;
