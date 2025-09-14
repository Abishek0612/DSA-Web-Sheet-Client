import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { BookOpenIcon, LightbulbIcon } from "lucide-react";
import Layout from "../components/Layout/Layout";
import ResearchPanel from "../components/AI/ResearchPanel";
import Card from "../components/Common/Card";

const AIResearch: React.FC = () => {
  const [research, setResearch] = useState<{
    topic: string;
    content: string;
    timestamp: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResearch = async (topic: string, context: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/ai/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ topic, context }),
      });

      const data = await response.json();

      if (response.ok) {
        setResearch({
          topic: data.topic,
          content: data.research,
          timestamp: data.timestamp,
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Research failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>AI Research - DSA Sheet</title>
        <meta
          name="description"
          content="Get AI-powered research on DSA topics"
        />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Research Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get comprehensive insights on any Data Structures and Algorithms
            topic using our advanced AI research assistant
          </p>
        </motion.div>

        <ResearchPanel onResearch={handleResearch} loading={loading} />

        {research && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <BookOpenIcon className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Research: {research.topic}
                  </h2>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(research.timestamp).toLocaleDateString()}
                </span>
              </div>

              <div className="prose prose-gray dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                  {research.content}
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <LightbulbIcon className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300">
                      Pro Tip
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                      Use this research as a starting point for your studies.
                      Practice implementing the concepts and solve related
                      problems to reinforce your understanding.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Recent Research History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Research
            </h3>
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <BookOpenIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Your research history will appear here</p>
              <p className="text-sm mt-1">Start by researching a topic above</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AIResearch;
