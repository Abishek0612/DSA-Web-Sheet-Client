import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../../components/Common/Button";
import Input from "../../components/Common/Input";

interface TopicFormProps {
  topic?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const TopicForm: React.FC<TopicFormProps> = ({ topic, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    category: "",
    estimatedTime: "",
    prerequisites: "",
    tags: "",
    difficulty: "Beginner",
    order: 1,
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (topic) {
      setFormData({
        name: topic.name || "",
        description: topic.description || "",
        icon: topic.icon || "",
        category: topic.category || "",
        estimatedTime: topic.estimatedTime || "",
        prerequisites: topic.prerequisites?.join(", ") || "",
        tags: topic.tags?.join(", ") || "",
        difficulty: topic.difficulty || "Beginner",
        order: topic.order || 1,
      });
    }
  }, [topic]);

  const categories = [
    "Data Structures",
    "Algorithms",
    "Dynamic Programming",
    "Graph Theory",
    "String Processing",
    "Mathematics",
    "Greedy",
    "Sorting & Searching",
  ];

  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.estimatedTime.trim())
      newErrors.estimatedTime = "Estimated time is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const submitData = {
      ...formData,
      prerequisites: formData.prerequisites
        ? formData.prerequisites
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      tags: formData.tags
        ? formData.tags
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    };

    onSubmit(submitData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6 p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Topic Name *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="e.g., Arrays"
        />

        <Input
          label="Icon (Emoji)"
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          placeholder="🔢"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Brief description of the topic..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Difficulty
          </label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Order"
          name="order"
          type="number"
          value={formData.order}
          onChange={handleChange}
          placeholder="1"
        />
      </div>

      <Input
        label="Estimated Time *"
        name="estimatedTime"
        value={formData.estimatedTime}
        onChange={handleChange}
        error={errors.estimatedTime}
        placeholder="e.g., 2-3 weeks"
      />

      <Input
        label="Prerequisites (comma-separated)"
        name="prerequisites"
        value={formData.prerequisites}
        onChange={handleChange}
        placeholder="e.g., Basic Programming, Loops"
      />

      <Input
        label="Tags (comma-separated)"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="e.g., fundamental, easy, linear"
      />

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{topic ? "Update Topic" : "Create Topic"}</Button>
      </div>
    </motion.form>
  );
};

export default TopicForm;
