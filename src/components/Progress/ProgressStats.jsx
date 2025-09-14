import React from "react";
import { motion } from "framer-motion";
import { TrophyIcon, FlameIcon, CalendarIcon, ClockIcon } from "lucide-react";

const ProgressStats = ({ stats }) => {
  const statCards = [
    {
      title: "Problems Solved",
      value: stats.totalSolved,
      icon: TrophyIcon,
      color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20",
      change: "+12 this week",
    },
    {
      title: "Current Streak",
      value: `${stats.currentStreak} days`,
      icon: FlameIcon,
      color: "text-orange-600 bg-orange-100 dark:bg-orange-900/20",
      change: stats.currentStreak > 0 ? "Keep going!" : "Start today!",
    },
    {
      title: "Best Streak",
      value: `${stats.maxStreak} days`,
      icon: CalendarIcon,
      color: "text-green-600 bg-green-100 dark:bg-green-900/20",
      change: "Personal record",
    },
    {
      title: "Time Spent",
      value: `${Math.floor(stats.timeSpent / 60)}h ${stats.timeSpent % 60}m`,
      icon: ClockIcon,
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20",
      change: `${stats.averageTime}m avg`,
    },
  ];

  const difficultyStats = [
    {
      level: "Easy",
      count: stats.easySolved,
      color: "text-green-600 bg-green-100 dark:bg-green-900/20",
    },
    {
      level: "Medium",
      count: stats.mediumSolved,
      color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      level: "Hard",
      count: stats.hardSolved,
      color: "text-red-600 bg-red-100 dark:bg-red-900/20",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div className="mb-2">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stat.change}
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Difficulty Breakdown
        </h3>

        <div className="grid grid-cols-3 gap-4">
          {difficultyStats.map((diff, index) => (
            <motion.div
              key={diff.level}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className={`text-center p-4 rounded-lg ${diff.color}`}
            >
              <div className="text-2xl font-bold mb-1">{diff.count}</div>
              <div className="text-sm font-medium">{diff.level}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressStats;
