import React from "react";
import { motion } from "framer-motion";

interface ProgressCalendarProps {
  data: Record<string, number>;
  year?: number;
}

const ProgressCalendar: React.FC<ProgressCalendarProps> = ({
  data,
  year = new Date().getFullYear(),
}) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getIntensity = (count: number) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-800";
    if (count <= 2) return "bg-green-200 dark:bg-green-900";
    if (count <= 4) return "bg-green-300 dark:bg-green-800";
    if (count <= 6) return "bg-green-400 dark:bg-green-700";
    return "bg-green-500 dark:bg-green-600";
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDateString = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Activity Calendar - {year}
        </h3>
        <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
          <span>Less</span>
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${
                  level === 0
                    ? "bg-gray-100 dark:bg-gray-800"
                    : level === 1
                    ? "bg-green-200 dark:bg-green-900"
                    : level === 2
                    ? "bg-green-300 dark:bg-green-800"
                    : level === 3
                    ? "bg-green-400 dark:bg-green-700"
                    : "bg-green-500 dark:bg-green-600"
                }`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2">
        {months.map((month, monthIndex) => (
          <div key={month} className="space-y-1">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 text-center">
              {month}
            </div>
            <div className="grid grid-rows-7 gap-1">
              {Array.from({ length: getDaysInMonth(monthIndex, year) }).map(
                (_, dayIndex) => {
                  const day = dayIndex + 1;
                  const dateString = getDateString(year, monthIndex, day);
                  const count = data[dateString] || 0;

                  return (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: monthIndex * 0.1 + dayIndex * 0.01 }}
                      className={`w-3 h-3 rounded-sm ${getIntensity(
                        count
                      )} border border-gray-200 dark:border-gray-700`}
                      title={`${dateString}: ${count} problems solved`}
                    />
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        Hover over squares to see daily activity
      </div>
    </motion.div>
  );
};

export default ProgressCalendar;
