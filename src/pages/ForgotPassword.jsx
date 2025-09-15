import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Mail, ArrowLeft } from "lucide-react";
import { authAPI } from "../services/api";
import Button from "../components/Common/Button";
import Input from "../components/Common/Input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await authAPI.forgotPassword({ email });
      setMessage("Password reset email sent successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Helmet>
        <title>Forgot Password - DSA Sheet</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white shadow-lg rounded-lg p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            icon={<Mail className="w-5 h-5" />}
            required
          />
          <Button type="submit" loading={loading} fullWidth className="mt-4">
            Send Reset Link
          </Button>
        </form>
        {message && <p className="text-green-500 mt-4">{message}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-sm text-blue-500 hover:underline flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
