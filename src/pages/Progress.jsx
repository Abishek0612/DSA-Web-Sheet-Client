import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { CalendarIcon, TrendingUpIcon, TargetIcon } from "lucide-react";
import { fetchProgress } from "../store/slices/progressSlice";
import Layout from "../components/Layout/Layout";
import ProgressStats from "../components/Progress/ProgressStats";
import ProgressChart from "../components/Dashboard/ProgressChart";
import ProgressCalendar from "../components/Progress/ProgressCalendar";
import Card from "../components/Common/Card";
import LoadingSkeleton from "../components/Common/LoadingSkeleton";

const Progress = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.progress);
  const [timeRange, setTimeRange] = useState("month");

  useEffect(() => {
    dispatch(fetchProgress());
  }, [dispatch]);

  const mockCalendarData = {
    "2024-01-15": 3,
    "2024-01-16": 1,
    "2024-01-17": 5,
    "2024-01-18": 2,
    "2024-01-19": 4,
    "2024-01-20": 1,
    "2024-01-21": 3,
    "2024-01-22": 2,
  };

  const mockStats = {
    totalSolved: user?.statistics?.totalSolved || 0,
    easySolved: user?.statistics?.easySolved || 0,
    mediumSolved: user?.statistics?.mediumSolved || 0,
    hardSolved: user?.statistics?.hardSolved || 0,
    currentStreak: user?.statistics?.currentStreak || 0,
    maxStreak: user?.statistics?.maxStreak || 0,
    timeSpent: 1440,
    averageTime: 25,
  };

  const insights = [
    {
      title: "Streak Goal",
      description: "You're 3 days away from your longest streak!",
      icon: TargetIcon,
      color: "text-orange-600 bg-orange-100 dark:bg-orange-900/20",
      progress: 70,
    },
    {
      title: "Weekly Target",
      description: "Solve 2 more problems to hit your weekly goal",
      icon: TrendingUpIcon,
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20",
      progress: 85,
    },
    {
      title: "Focus Area",
      description: "Consider practicing more Medium difficulty problems",
      icon: CalendarIcon,
      color: "text-green-600 bg-green-100 dark:bg-green-900/20",
      progress: 40,
    },
  ];

  if (loading) {
    return (
      <Layout>
        <LoadingSkeleton lines={10} />
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Progress - DSA Sheet</title>
        <meta
          name="description"
          content="Track your DSA learning progress and statistics"
        />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Your Progress
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track your learning journey and achievements
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {["week", "month", "year"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-md text-sm font-medium capitalize transition-colors ${
                    timeRange === range
                      ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <ProgressStats stats={mockStats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProgressChart />
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Insights & Goals
                </h3>
                <div className="space-y-4">
                  {insights.map((insight, index) => {
                    const Icon = insight.icon;
                    return (
                      <motion.div
                        key={insight.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${insight.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              {insight.title}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              {insight.description}
                            </p>
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                <div
                                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                                  style={{ width: `${insight.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        <ProgressCalendar data={mockCalendarData} />
      </div>
    </Layout>
  );
};

export default Progress;
