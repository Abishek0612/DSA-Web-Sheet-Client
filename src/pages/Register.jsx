import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import RegisterForm from "../components/Auth/RegisterForm";

const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Register - DSA Sheet</title>
        <meta
          name="description"
          content="Create your DSA Sheet account and start your coding journey"
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">DS</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">DSA Sheet</h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Create your account
          </h2>
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <RegisterForm />
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>By creating an account, you agree to our</p>
          <div className="space-x-4 mt-1">
            <Link to="/terms" className="hover:text-gray-700 transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link
              to="/privacy"
              className="hover:text-gray-700 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
