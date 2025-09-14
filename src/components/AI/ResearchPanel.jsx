import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  SearchIcon,
  BookOpenIcon,
  LightbulbIcon,
  TrendingUpIcon,
} from "lucide-react";
import Button from "../Common/Button";
import Input from "../Common/Input";
import Card from "../Common/Card";

interface ResearchPanelProps {
  onResearch: (topic: string, context: string) => Promise<void>;
  loading?: boolean;
}

const ResearchPanel: React.FC<ResearchPanelProps> = ({
  onResearch,
  loading = false,
}) => {
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");

  const suggestedTopics = [
    "Binary Search Trees",
    "Dynamic Programming",
    "Graph Algorithms",
    "Sorting Algorithms",
    "Hash Tables",
    "Linked Lists",
    "Recursion",
    "Greedy Algorithms",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    await onResearch(topic, context);
    setTopic("");
    setContext("");
  };

  const handleSuggestedTopic = (suggestedTopic: string) => {
    setTopic(suggestedTopic);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
          <SearchIcon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          AI Research Assistant
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Get comprehensive insights on any DSA topic using AI
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Research Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Binary Search Trees"
          leftIcon={<BookOpenIcon className="w-5 h-5" />}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Context (Optional)
          </label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Provide additional context for more targeted research..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <Button
          type="submit"
          loading={loading}
          className="w-full"
          leftIcon={<TrendingUpIcon className="w-5 h-5" />}
        >
          Start Research
        </Button>
      </form>

      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
          <LightbulbIcon className="w-4 h-4 mr-2" />
          Suggested Topics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {suggestedTopics.map((suggestedTopic, index) => (
            <motion.button
              key={suggestedTopic}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSuggestedTopic(suggestedTopic)}
              className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors text-left"
            >
              {suggestedTopic}
            </motion.button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ResearchPanel;
