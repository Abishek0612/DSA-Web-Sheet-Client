import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CameraIcon, UploadIcon, XIcon } from "lucide-react";
import Button from "../Common/Button";

const AvatarUpload = ({ currentAvatar, name, onUpload, loading = false }) => {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async () => {
    if (fileInputRef.current?.files?.[0]) {
      await onUpload(fileInputRef.current.files[0]);
      setPreview(null);
    }
  };

  const handleCancel = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Profile Picture
      </h3>

      <div className="flex items-center space-x-6">
        <div className="relative">
          {preview || currentAvatar ? (
            <img
              src={preview || currentAvatar}
              alt={name}
              className="w-20 h-20 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-4 border-gray-200 dark:border-gray-700 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {getInitials(name)}
              </span>
            </div>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
          >
            <CameraIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
              isDragging
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
            />

            <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Drop an image here or{" "}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                browse
              </button>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              PNG, JPG up to 2MB
            </p>
          </div>

          {preview && (
            <div className="flex space-x-2 mt-4">
              <Button
                onClick={handleUpload}
                loading={loading}
                size="sm"
                leftIcon={<UploadIcon className="w-4 h-4" />}
              >
                Upload
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                size="sm"
                leftIcon={<XIcon className="w-4 h-4" />}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AvatarUpload;
