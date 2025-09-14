import React from "react";
import { motion } from "framer-motion";
import { TrophyIcon, FlameIcon, CalendarIcon, ClockIcon } from "lucide-react";

const QuickStats = ({ stats }) => {
  const statItems = [
    {
      label: "Problems Solved",
      value: stats.totalSolved,
      icon: TrophyIcon,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      label: "Current Streak",
      value: `${stats.currentStreak} days`,
      icon: FlameIcon,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
    {
      label: "Best Streak",
      value: `${stats.maxStreak} days`,
      icon: CalendarIcon,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      label: "Time Spent",
      value: `${Math.floor(stats.timeSpent / 60)}h`,
      icon: ClockIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-3">
              <div className={`${item.bgColor} p-2 rounded-lg`}>
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.label}
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.value}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default QuickStats;
