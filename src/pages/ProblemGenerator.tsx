import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { WandIcon, CopyIcon, ExternalLinkIcon } from "lucide-react";
import Layout from "../components/Layout/Layout";
import ProblemGenerator from "../components/AI/ProblemGenerator";
import Card from "../components/Common/Card";
import Button from "../components/Common/Button";
import Badge from "../components/Common/Badge";

interface GeneratedProblem {
  title: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  examples: Array<{
    input: string;
    output: string;
    explanation: string;
  }>;
  constraints: string[];
  hints: string[];
  timeComplexity: string;
  spaceComplexity: string;
  difficulty: string;
  tags: string[];
}

const ProblemGeneratorPage: React.FC = () => {
  const [problems, setProblems] = useState<GeneratedProblem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (settings: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/ai/generate-problems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (response.ok) {
        setProblems(data.problems);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Problem generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyProblem = (problem: GeneratedProblem) => {
    const text = `
# ${problem.title}

**Difficulty:** ${problem.difficulty}
**Time Complexity:** ${problem.timeComplexity}
**Space Complexity:** ${problem.spaceComplexity}

## Description
${problem.description}

## Input Format
${problem.inputFormat}

## Output Format
${problem.outputFormat}

## Examples
${problem.examples
  .map(
    (ex, i) => `
**Example ${i + 1}:**
Input: ${ex.input}
Output: ${ex.output}
Explanation: ${ex.explanation}
`
  )
  .join("")}

## Constraints
${problem.constraints.map((c) => `- ${c}`).join("\n")}

## Hints
${problem.hints.map((hint, i) => `${i + 1}. ${hint}`).join("\n")}

## Tags
${problem.tags.join(", ")}
    `.trim();

    navigator.clipboard.writeText(text);
  };

  return (
    <Layout>
      <Helmet>
        <title>Problem Generator - DSA Sheet</title>
        <meta
          name="description"
          content="Generate custom coding problems using AI"
        />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Problem Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Generate custom coding problems tailored to your learning needs and
            difficulty preferences
          </p>
        </motion.div>

        <ProblemGenerator onGenerate={handleGenerate} loading={loading} />

        <AnimatePresence>
          {problems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Generated Problems ({problems.length})
                </h2>
                <Button variant="outline" onClick={() => setProblems([])}>
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {problems.map((problem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {problem.title}
                          </h3>
                          <div className="flex items-center space-x-2 mb-3">
                            <Badge
                              variant={
                                problem.difficulty.toLowerCase() === "easy"
                                  ? "success"
                                  : problem.difficulty.toLowerCase() ===
                                    "medium"
                                  ? "warning"
                                  : "danger"
                              }
                            >
                              {problem.difficulty}
                            </Badge>
                            <Badge variant="outline">
                              Time: {problem.timeComplexity}
                            </Badge>
                            <Badge variant="outline">
                              Space: {problem.spaceComplexity}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyProblem(problem)}
                            leftIcon={<CopyIcon className="w-4 h-4" />}
                          >
                            Copy
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<ExternalLinkIcon className="w-4 h-4" />}
                          >
                            Practice
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                            Description
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300">
                            {problem.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              Input Format
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {problem.inputFormat}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              Output Format
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {problem.outputFormat}
                            </p>
                          </div>
                        </div>

                        {problem.examples.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              Examples
                            </h4>
                            <div className="space-y-3">
                              {problem.examples.map((example, exIndex) => (
                                <div
                                  key={exIndex}
                                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                                    <div>
                                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Input:
                                      </span>
                                      <code className="block text-sm bg-white dark:bg-gray-800 p-2 rounded mt-1">
                                        {example.input}
                                      </code>
                                    </div>
                                    <div>
                                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Output:
                                      </span>
                                      <code className="block text-sm bg-white dark:bg-gray-800 p-2 rounded mt-1">
                                        {example.output}
                                      </code>
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                      Explanation:
                                    </span>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                      {example.explanation}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {problem.constraints.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              Constraints
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                              {problem.constraints.map((constraint, cIndex) => (
                                <li key={cIndex}>{constraint}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {problem.hints.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              Hints
                            </h4>
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                              <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-700 dark:text-yellow-400">
                                {problem.hints.map((hint, hIndex) => (
                                  <li key={hIndex}>{hint}</li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        )}

                        {problem.tags.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              Tags
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {problem.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default ProblemGeneratorPage;
