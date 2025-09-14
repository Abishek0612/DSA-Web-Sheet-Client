import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import { updateUser } from "../store/slices/authSlice";
import Layout from "../components/Layout/Layout";
import SettingsForm from "../components/Profile/SettingsForm";
import LoadingSkeleton from "../components/Common/LoadingSkeleton";

const Settings = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [saving, setSaving] = useState(false);

  const handleSave = async (settings) => {
    setSaving(true);
    try {
      const response = await fetch("/api/user/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(updateUser(data.user));
        toast.success("Settings saved successfully!");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <Layout>
        <LoadingSkeleton lines={10} />
      </Layout>
    );
  }

  const currentSettings = {
    name: user.name,
    email: user.email,
    language: user.preferences?.language || "javascript",
    difficulty: user.preferences?.difficulty || "medium",
    theme: user.preferences?.theme || "light",
    notifications: {
      email: true,
      push: true,
      streaks: true,
    },
  };

  return (
    <Layout>
      <Helmet>
        <title>Settings - DSA Sheet</title>
        <meta
          name="description"
          content="Manage your DSA Sheet preferences and account settings"
        />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Customize your DSA Sheet experience
          </p>
        </motion.div>

        <SettingsForm
          settings={currentSettings}
          onSave={handleSave}
          loading={saving}
        />
      </div>
    </Layout>
  );
};

export default Settings;
