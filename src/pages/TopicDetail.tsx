import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  ClockIcon,
  PlayIcon,
  FilterIcon,
  EditIcon,
} from "lucide-react";
import type { RootState } from "../store/store";
import { fetchTopicById } from "../store/slices/topicsSlice";
import { updateProgress } from "../store/slices/progressSlice";
import Layout from "../components/Layout/Layout";
import ProblemCard from "../components/Topics/ProblemCard";
import ProblemList from "../components/Topics/ProblemList";
import ProgressBar from "../components/Progress/ProgressBar";
import Badge from "../components/Common/Badge";
import Button from "../components/Common/Button";
import LoadingSkeleton from "../components/Common/LoadingSkeleton";
import EmptyState from "../components/Common/EmptyState";

const TopicDetail: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { currentTopic, loading } = useSelector(
    (state: RootState) => state.topics
  );
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  useEffect(() => {
    if (id) {
      dispatch(fetchTopicById(id) as any);
    }
  }, [dispatch, id]);

  const handleStatusChange = async (problemId: string, status: string) => {
    if (!id) return;

    try {
      await dispatch(
        updateProgress({
          topicId: id,
          problemId,
          status,
        }) as any
      );

      dispatch(fetchTopicById(id) as any);
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const filteredProblems =
    currentTopic?.problems?.filter((problem) => {
      const matchesDifficulty =
        !filterDifficulty ||
        problem.difficulty.toLowerCase() === filterDifficulty;
      const matchesStatus =
        !filterStatus || problem.progress?.status === filterStatus;
      return matchesDifficulty && matchesStatus;
    }) || [];

  if (loading && !currentTopic) {
    return (
      <Layout>
        <LoadingSkeleton lines={10} />
      </Layout>
    );
  }

  if (!currentTopic) {
    return (
      <Layout>
        <EmptyState
          title="Topic not found"
          description="The topic you're looking for doesn't exist or has been removed."
          action={{
            label: "Back to Topics",
            onClick: () => window.history.back(),
          }}
        />
      </Layout>
    );
  }

  const progress = currentTopic.problems?.reduce(
    (acc, problem) => {
      if (problem.progress?.status === "solved") acc.solved++;
      acc.total++;
      return acc;
    },
    { solved: 0, total: 0 }
  ) || { solved: 0, total: 0 };

  const percentage =
    progress.total > 0
      ? Math.round((progress.solved / progress.total) * 100)
      : 0;

  return (
    <Layout>
      <Helmet>
        <title>{currentTopic.name} - DSA Sheet</title>
        <meta name="description" content={currentTopic.description} />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}

        {user?.role === "admin" && (
          <div className="flex space-x-2 ml-4">
            <Link to={`/admin/topics`}>
              <Button variant="outline" size="sm">
                <EditIcon className="w-4 h-4 mr-1" />
                Manage
              </Button>
            </Link>
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <Link
                  to="/topics"
                  className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                </Link>
                <div className="text-4xl">{currentTopic.icon}</div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {currentTopic.name}
                  </h1>
                  <div className="flex items-center space-x-4 mt-2 text-blue-100">
                    <div className="flex items-center space-x-1">
                      <BookOpenIcon className="w-4 h-4" />
                      <span>{currentTopic.totalProblems} problems</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{currentTopic.estimatedTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-blue-100 mb-4">{currentTopic.description}</p>

              <div className="flex flex-wrap gap-2">
                {currentTopic.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-white bg-opacity-20 text-white"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-center ml-6">
              <div className="text-4xl font-bold mb-2">{percentage}%</div>
              <div className="text-blue-100 mb-4">Complete</div>
              <div className="w-32">
                <ProgressBar
                  value={progress.solved}
                  max={progress.total}
                  color="purple"
                  size="lg"
                />
              </div>
              <div className="text-sm text-blue-100 mt-2">
                {progress.solved} of {progress.total} solved
              </div>
            </div>
          </div>
        </motion.div>

        {/* Prerequisites */}
        {currentTopic.prerequisites &&
          currentTopic.prerequisites.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4"
            >
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                Prerequisites
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentTopic.prerequisites.map((prereq) => (
                  <Badge key={prereq} variant="warning">
                    {prereq}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode("cards")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "cards"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                List
              </button>
            </div>

            <Button
              variant="outline"
              leftIcon={<PlayIcon className="w-4 h-4" />}
            >
              Start Practice
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="pending">Not Started</option>
              <option value="attempted">Attempted</option>
              <option value="solved">Solved</option>
            </select>
          </div>
        </motion.div>

        {/* Problems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {filteredProblems.length === 0 ? (
            <EmptyState
              icon={<FilterIcon className="w-12 h-12" />}
              title="No problems found"
              description="Try adjusting your filters or check back later for new problems."
              action={{
                label: "Clear Filters",
                onClick: () => {
                  setFilterDifficulty("");
                  setFilterStatus("");
                },
              }}
            />
          ) : viewMode === "cards" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProblems.map((problem) => (
                <ProblemCard
                  key={problem._id}
                  problem={problem}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          ) : (
            <ProblemList
              problems={filteredProblems}
              onProblemClick={(problemId) =>
                console.log("Problem clicked:", problemId)
              }
              onStatusChange={handleStatusChange}
            />
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default TopicDetail;
