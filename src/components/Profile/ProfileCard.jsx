import React from "react";
import { motion } from "framer-motion";
import { CalendarIcon, MailIcon, TrophyIcon, FlameIcon } from "lucide-react";
import Badge from "../Common/Badge";

const ProfileCard = ({ user }) => {
  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8 text-white">
        <div className="flex items-center space-x-6">
          <div className="relative">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 border-4 border-white flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {getInitials(user.name)}
                </span>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div className="flex items-center space-x-2 mt-2 text-blue-100">
              <MailIcon className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center space-x-2 mt-1 text-blue-100">
              <CalendarIcon className="w-4 h-4" />
              <span>Joined {joinDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <TrophyIcon className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.statistics.totalSolved}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Problems Solved
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <FlameIcon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.statistics.currentStreak}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Current Streak
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">★</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.statistics.maxStreak}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Best Streak
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Preferences
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary">
              Language: {user.preferences.language}
            </Badge>
            <Badge variant="secondary">
              Difficulty: {user.preferences.difficulty}
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
