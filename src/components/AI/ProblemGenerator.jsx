import React, { useState } from "react";
import { motion } from "framer-motion";
import { WandIcon, CodeIcon, TargetIcon, BrainIcon } from "lucide-react";
import Button from "../Common/Button";
import Card from "../Common/Card";

const ProblemGenerator = ({ onGenerate, loading = false }) => {
  const [settings, setSettings] = useState({
    language: "javascript",
    difficulty: "medium",
    topic: "arrays",
    count: 5,
  });

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "go", label: "Go" },
  ];

  const difficulties = [
    { value: "easy", label: "Easy", color: "text-green-600" },
    { value: "medium", label: "Medium", color: "text-yellow-600" },
    { value: "hard", label: "Hard", color: "text-red-600" },
  ];

  const topics = [
    "Arrays",
    "Strings",
    "Linked Lists",
    "Stacks",
    "Queues",
    "Trees",
    "Graphs",
    "Dynamic Programming",
    "Recursion",
    "Sorting",
    "Searching",
    "Hash Tables",
    "Greedy",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onGenerate(settings);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
          <WandIcon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          AI Problem Generator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Generate custom coding problems tailored to your learning needs
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <CodeIcon className="w-4 h-4 inline mr-2" />
              Programming Language
            </label>
            <select
              value={settings.language}
              onChange={(e) =>
                setSettings({ ...settings, language: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <TargetIcon className="w-4 h-4 inline mr-2" />
              Difficulty Level
            </label>
            <select
              value={settings.difficulty}
              onChange={(e) =>
                setSettings({ ...settings, difficulty: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {difficulties.map((diff) => (
                <option key={diff.value} value={diff.value}>
                  {diff.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <BrainIcon className="w-4 h-4 inline mr-2" />
            Topic/Category
          </label>
          <select
            value={settings.topic}
            onChange={(e) =>
              setSettings({ ...settings, topic: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {topics.map((topic) => (
              <option key={topic.toLowerCase()} value={topic.toLowerCase()}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of Problems
          </label>
          <input
            type="number"
            min={1}
            max={10}
            value={settings.count}
            onChange={(e) =>
              setSettings({ ...settings, count: parseInt(e.target.value) })
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <Button
          type="submit"
          loading={loading}
          className="w-full"
          leftIcon={<WandIcon className="w-5 h-5" />}
        >
          Generate Problems
        </Button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
          Preview Configuration
        </h3>
        <div className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
          <p>
            • Language:{" "}
            <span className="font-medium">
              {languages.find((l) => l.value === settings.language)?.label}
            </span>
          </p>
          <p>
            • Difficulty:{" "}
            <span className="font-medium">{settings.difficulty}</span>
          </p>
          <p>
            • Topic: <span className="font-medium">{settings.topic}</span>
          </p>
          <p>
            • Problems: <span className="font-medium">{settings.count}</span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProblemGenerator;
