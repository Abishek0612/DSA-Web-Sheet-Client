import React from "react";
import { motion } from "framer-motion";
import { TrendingUpIcon } from "lucide-react";

const ProgressChart: React.FC = () => {
  const weeklyData = [
    { day: "Mon", problems: 5 },
    { day: "Tue", problems: 8 },
    { day: "Wed", problems: 3 },
    { day: "Thu", problems: 12 },
    { day: "Fri", problems: 7 },
    { day: "Sat", problems: 15 },
    { day: "Sun", problems: 10 },
  ];

  const maxProblems = Math.max(...weeklyData.map((d) => d.problems));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Weekly Progress
        </h2>
        <div className="flex items-center space-x-2 text-green-600">
          <TrendingUpIcon className="w-4 h-4" />
          <span className="text-sm font-medium">+12% this week</span>
        </div>
      </div>

      <div className="flex items-end justify-between h-48 space-x-2">
        {weeklyData.map((item, index) => (
          <div key={item.day} className="flex flex-col items-center flex-1">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(item.problems / maxProblems) * 100}%` }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg min-h-[20px] flex items-end justify-center pb-2"
            >
              <span className="text-white text-xs font-medium">
                {item.problems}
              </span>
            </motion.div>
            <span className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {item.day}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Total problems solved this week:{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            60
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default ProgressChart;
