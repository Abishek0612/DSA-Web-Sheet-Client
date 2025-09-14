import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { HomeIcon, ArrowLeftIcon } from "lucide-react";
import Button from "../components/Common/Button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <Helmet>
        <title>Page Not Found - DSA Sheet</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist"
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="text-6xl font-bold text-gray-300 dark:text-gray-700 mb-4">
            404
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The page you're looking for doesn't exist. It might have been moved,
            deleted, or you entered the wrong URL.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/dashboard">
              <Button leftIcon={<HomeIcon className="w-4 h-4" />}>
                Go to Dashboard
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              leftIcon={<ArrowLeftIcon className="w-4 h-4" />}
            >
              Go Back
            </Button>
          </div>

          <div className="pt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need help? Check out our{" "}
              <Link
                to="/topics"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
              >
                topics page
              </Link>{" "}
              or{" "}
              <Link
                to="/ai-research"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
              >
                get AI assistance
              </Link>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <div className="text-4xl mb-2">🤖</div>
          <p className="text-xs text-gray-400">
            "Even the best algorithms sometimes take wrong paths"
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
