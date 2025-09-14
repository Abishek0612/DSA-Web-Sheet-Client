import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  TrendingUpIcon,
  BookOpenIcon,
  StarIcon,
  TargetIcon,
  CalendarIcon,
  AwardIcon,
  FlameIcon as FireIcon,
} from "lucide-react";
import Layout from "../components/Layout/Layout";
import StatCard from "../components/Dashboard/StatCard";
import ProgressChart from "../components/Dashboard/ProgressChart";
import RecentActivity from "../components/Dashboard/RecentActivity";
import TopicProgress from "../components/Dashboard/TopicProgress";
import LoadingSkeleton from "../components/Common/LoadingSkeleton";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { topics, loading } = useSelector((state) => state.topics);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const calculateOverallProgress = () => {
    if (!topics.length) return { solved: 0, total: 0, percentage: 0 };

    const totals = topics.reduce(
      (acc, topic) => {
        acc.solved += topic.progress?.solved || 0;
        acc.total += topic.progress?.total || 0;
        return acc;
      },
      { solved: 0, total: 0 }
    );

    return {
      ...totals,
      percentage:
        totals.total > 0 ? Math.round((totals.solved / totals.total) * 100) : 0,
    };
  };

  const getRecentTopics = () => {
    return topics
      .filter((topic) => (topic.progress?.solved ?? 0) > 0)
      .sort((a, b) => (b.progress?.solved || 0) - (a.progress?.solved || 0))
      .slice(0, 3);
  };

  const overallProgress = calculateOverallProgress();
  const recentTopics = getRecentTopics();

  if (loading) {
    return (
      <Layout>
        <LoadingSkeleton />
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Dashboard - DSA Sheet</title>
        <meta
          name="description"
          content="Track your DSA learning progress and statistics"
        />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl p-6 text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {getGreeting()}, {user?.name}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Ready to level up your DSA skills today?
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-center">
              <div className="text-3xl font-bold">
                {overallProgress.percentage}%
              </div>
              <div className="text-sm text-blue-100">Overall Progress</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Solved"
            value={user?.statistics?.totalSolved || 0}
            icon={<TargetIcon className="w-6 h-6" />}
            color="bg-green-500"
            delay={0.1}
          />
          <StatCard
            title="Current Streak"
            value={user?.statistics?.currentStreak || 0}
            icon={<FireIcon className="w-6 h-6" />}
            color="bg-orange-500"
            delay={0.2}
          />
          <StatCard
            title="Topics Completed"
            value={topics.filter((t) => t.progress?.percentage === 100).length}
            icon={<BookOpenIcon className="w-6 h-6" />}
            color="bg-blue-500"
            delay={0.3}
          />
          <StatCard
            title="Max Streak"
            value={user?.statistics?.maxStreak || 0}
            icon={<AwardIcon className="w-6 h-6" />}
            color="bg-purple-500"
            delay={0.4}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProgressChart />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Topics
              </h2>
              <Link
                to="/topics"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentTopics.length > 0 ? (
                recentTopics.map((topic, index) => (
                  <TopicProgress
                    key={topic._id}
                    topic={topic}
                    delay={0.1 * index}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <BookOpenIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Start solving problems to see your progress here!</p>
                  <Link
                    to="/topics"
                    className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Explore Topics
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                to="/topics"
                className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
              >
                <BookOpenIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  Browse Topics
                </span>
              </Link>
              <Link
                to="/ai-research"
                className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
              >
                <StarIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="font-medium text-purple-600 dark:text-purple-400">
                  AI Research
                </span>
              </Link>
              <Link
                to="/problem-generator"
                className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group"
              >
                <TrendingUpIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="font-medium text-green-600 dark:text-green-400">
                  Generate Problems
                </span>
              </Link>
              <Link
                to="/progress"
                className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors group"
              >
                <CalendarIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <span className="font-medium text-orange-600 dark:text-orange-400">
                  View Progress
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
