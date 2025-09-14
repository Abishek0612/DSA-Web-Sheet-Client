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

interface Problem {
  _id: string;
  name: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  links: {
    leetcode?: string;
    codeforces?: string;
    youtube?: string;
    article?: string;
  };
  tags: string[];
  companies: string[];
  timeComplexity?: string;
  spaceComplexity?: string;
  hints: string[];
  progress?: {
    status: "pending" | "attempted" | "solved";
    timeSpent: number;
    attempts: number;
    lastAttempted: string; // ✅ Corrected type from Date to string
    rating?: number;
  };
}

interface ProblemCardProps {
  problem: Problem;
  onStatusChange: (problemId: string, status: string) => void;
}

const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  onStatusChange,
}) => {
  const [showHints, setShowHints] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
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

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "solved":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "attempted":
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const handleStatusChange = (status: string) => {
    onStatusChange(problem._id, status);
  };

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
            <Badge variant={getDifficultyColor(problem.difficulty) as any}>
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

      {problem.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {problem.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {problem.companies.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Asked by:
          </p>
          <div className="flex flex-wrap gap-1">
            {problem.companies.slice(0, 3).map((company) => (
              <Badge key={company} variant="outline" className="text-xs">
                {company}
              </Badge>
            ))}
            {problem.companies.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{problem.companies.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          {problem.links.leetcode && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(problem.links.leetcode, "_blank")}
            >
              <ExternalLinkIcon className="w-4 h-4 mr-1" />
              LeetCode
            </Button>
          )}
          {problem.links.youtube && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(problem.links.youtube, "_blank")}
            >
              <PlayIcon className="w-4 h-4 mr-1" />
              Video
            </Button>
          )}
          {problem.links.article && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(problem.links.article, "_blank")}
            >
              <BookOpenIcon className="w-4 h-4 mr-1" />
              Article
            </Button>
          )}
        </div>

        {problem.hints.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHints(!showHints)}
          >
            <LightbulbIcon className="w-4 h-4 mr-1" />
            Hints ({problem.hints.length})
          </Button>
        )}
      </div>

      {showHints && (
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
            {problem.hints.map((hint, index) => (
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
                  star <= problem.progress!.rating!
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
            <span>Attempts: {problem.progress.attempts}</span>
            <span>Time: {Math.floor(problem.progress.timeSpent / 60)}m</span>
            <span>
              Last:{" "}
              {new Date(problem.progress.lastAttempted).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProblemCard;
