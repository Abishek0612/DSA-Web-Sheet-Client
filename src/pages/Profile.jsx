import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import { updateUser } from "../store/slices/authSlice";
import Layout from "../components/Layout/Layout";
import ProfileCard from "../components/Profile/ProfileCard";
import AvatarUpload from "../components/Profile/AvatarUpload";
import ProgressStats from "../components/Progress/ProgressStats";
import LoadingSkeleton from "../components/Common/LoadingSkeleton";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const handleAvatarUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch("/api/user/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(updateUser({ avatar: data.avatar }));
        toast.success("Profile picture updated successfully!");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to upload avatar");
    }
  };

  if (loading || !user) {
    return (
      <Layout>
        <LoadingSkeleton lines={10} />
      </Layout>
    );
  }

  const mockStats = {
    totalSolved: user.statistics?.totalSolved || 0,
    easySolved: user.statistics?.easySolved || 0,
    mediumSolved: user.statistics?.mediumSolved || 0,
    hardSolved: user.statistics?.hardSolved || 0,
    currentStreak: user.statistics?.currentStreak || 0,
    maxStreak: user.statistics?.maxStreak || 0,
    timeSpent: 1440,
    averageTime: 25,
  };

  return (
    <Layout>
      <Helmet>
        <title>Profile - DSA Sheet</title>
        <meta
          name="description"
          content="View and edit your DSA Sheet profile"
        />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your account and track your progress
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProfileCard user={user} />
            <ProgressStats stats={mockStats} />
          </div>

          <div className="space-y-6">
            <AvatarUpload
              currentAvatar={user.avatar}
              name={user.name}
              onUpload={handleAvatarUpload}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  <div className="font-medium text-blue-700 dark:text-blue-300">
                    Export Progress
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    Download your learning data
                  </div>
                </button>

                <button className="w-full text-left p-3 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                  <div className="font-medium text-green-700 dark:text-green-300">
                    Share Profile
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Show your achievements
                  </div>
                </button>

                <button className="w-full text-left p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                  <div className="font-medium text-purple-700 dark:text-purple-300">
                    Learning Stats
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-400">
                    Detailed analytics
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
