import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  EyeIcon,
  EyeOffIcon,
  MailIcon,
  LockIcon,
  UserIcon,
} from "lucide-react";
import { RootState } from "../../store/store";
import { register } from "../../store/slices/authSlice";
import Button from "../Common/Button";
import Input from "../Common/Input";

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    const { confirmPassword, ...userData } = formData;
    const result = await dispatch(register(userData) as any);
    if (register.fulfilled.match(result)) {
      onSuccess?.();
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <Input
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your full name"
        icon={<UserIcon className="w-5 h-5" />}
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        icon={<MailIcon className="w-5 h-5" />}
        required
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          icon={<LockIcon className="w-5 h-5" />}
          required
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOffIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          icon={<LockIcon className="w-5 h-5" />}
          required
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? (
            <EyeOffIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {formData.password &&
        formData.confirmPassword &&
        formData.password !== formData.confirmPassword && (
          <p className="text-sm text-red-600">Passwords do not match</p>
        )}

      <Button
        type="submit"
        loading={loading}
        className="w-full"
        disabled={formData.password !== formData.confirmPassword}
      >
        Create Account
      </Button>
    </motion.form>
  );
};

export default RegisterForm;
