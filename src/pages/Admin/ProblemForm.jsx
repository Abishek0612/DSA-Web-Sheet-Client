import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusIcon, TrashIcon } from "lucide-react";
import Button from "../../components/Common/Button";
import Input from "../../components/Common/Input";

interface ProblemFormProps {
  problem?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ProblemForm: React.FC<ProblemFormProps> = ({
  problem,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    difficulty: "Easy",
    timeComplexity: "",
    spaceComplexity: "",
    tags: "",
    companies: "",
    order: 1,
    links: {
      leetcode: "",
      codeforces: "",
      youtube: "",
      article: "",
      editorial: "",
    },
    hints: [""],
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (problem) {
      setFormData({
        name: problem.name || "",
        description: problem.description || "",
        difficulty: problem.difficulty || "Easy",
        timeComplexity: problem.timeComplexity || "",
        spaceComplexity: problem.spaceComplexity || "",
        tags: problem.tags?.join(", ") || "",
        companies: problem.companies?.join(", ") || "",
        order: problem.order || 1,
        links: {
          leetcode: problem.links?.leetcode || "",
          codeforces: problem.links?.codeforces || "",
          youtube: problem.links?.youtube || "",
          article: problem.links?.article || "",
          editorial: problem.links?.editorial || "",
        },
        hints: problem.hints?.length > 0 ? problem.hints : [""],
      });
    }
  }, [problem]);

  const difficulties = ["Easy", "Medium", "Hard"];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("links.")) {
      const linkField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        links: { ...prev.links, [linkField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleHintChange = (index: number, value: string) => {
    const newHints = [...formData.hints];
    newHints[index] = value;
    setFormData((prev) => ({ ...prev, hints: newHints }));
  };

  const addHint = () => {
    setFormData((prev) => ({ ...prev, hints: [...prev.hints, ""] }));
  };

  const removeHint = (index: number) => {
    if (formData.hints.length > 1) {
      setFormData((prev) => ({
        ...prev,
        hints: prev.hints.filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) newErrors.name = "Problem name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    Object.entries(formData.links).forEach(([key, url]) => {
      if (url && !urlPattern.test(url)) {
        newErrors[`links.${key}`] = "Please enter a valid URL";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const submitData = {
      ...formData,
      tags: formData.tags
        ? formData.tags
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      companies: formData.companies
        ? formData.companies
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      hints: formData.hints.filter((hint) => hint.trim() !== ""),
      links: Object.fromEntries(
        Object.entries(formData.links).filter(([_, url]) => url.trim() !== "")
      ),
    };

    onSubmit(submitData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6 p-6 max-h-[70vh] overflow-y-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Problem Name *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="e.g., Two Sum"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Difficulty *
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Detailed problem description..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="Time Complexity"
          name="timeComplexity"
          value={formData.timeComplexity}
          onChange={handleChange}
          placeholder="e.g., O(n)"
        />

        <Input
          label="Space Complexity"
          name="spaceComplexity"
          value={formData.spaceComplexity}
          onChange={handleChange}
          placeholder="e.g., O(1)"
        />

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
        label="Tags (comma-separated)"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="e.g., array, hash-table"
      />

      <Input
        label="Companies (comma-separated)"
        name="companies"
        value={formData.companies}
        onChange={handleChange}
        placeholder="e.g., Google, Amazon, Microsoft"
      />

      {/* Links Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          External Links (Optional)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="LeetCode Link"
            name="links.leetcode"
            value={formData.links.leetcode}
            onChange={handleChange}
            error={errors["links.leetcode"]}
            placeholder="https://leetcode.com/problems/..."
          />

          <Input
            label="YouTube Link"
            name="links.youtube"
            value={formData.links.youtube}
            onChange={handleChange}
            error={errors["links.youtube"]}
            placeholder="https://youtube.com/watch?v=..."
          />

          <Input
            label="Article Link"
            name="links.article"
            value={formData.links.article}
            onChange={handleChange}
            error={errors["links.article"]}
            placeholder="https://..."
          />

          <Input
            label="Editorial Link"
            name="links.editorial"
            value={formData.links.editorial}
            onChange={handleChange}
            error={errors["links.editorial"]}
            placeholder="https://..."
          />

          <Input
            label="Codeforces Link"
            name="links.codeforces"
            value={formData.links.codeforces}
            onChange={handleChange}
            error={errors["links.codeforces"]}
            placeholder="https://codeforces.com/problem/..."
          />
        </div>
      </div>

      {/* Hints Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Hints (Optional)
          </h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addHint}
            leftIcon={<PlusIcon className="w-3 h-3" />}
          >
            Add Hint
          </Button>
        </div>

        {formData.hints.map((hint, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="flex-1">
              <Input
                label={`Hint ${index + 1}`}
                value={hint}
                onChange={(e) => handleHintChange(index, e.target.value)}
                placeholder="Enter a helpful hint..."
              />
            </div>
            {formData.hints.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeHint(index)}
                className="mt-6"
              >
                <TrashIcon className="w-3 h-3" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {problem ? "Update Problem" : "Add Problem"}
        </Button>
      </div>
    </motion.form>
  );
};

export default ProblemForm;
