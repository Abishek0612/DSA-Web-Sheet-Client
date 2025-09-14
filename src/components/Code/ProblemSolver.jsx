import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon, ClockIcon } from "lucide-react";
import CodeEditor from "./CodeEditor";
import Badge from "../Common/Badge";
import Card from "../Common/Card";
import api from "../../services/api";

interface Problem {
  _id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  template: Array<{
    language: string;
    code: string;
  }>;
}

interface TestResult {
  status: "accepted" | "wrong_answer";
  testResults: {
    passed: number;
    total: number;
    results: Array<{
      passed: boolean;
      input: string;
      expectedOutput: string;
      actualOutput: string;
    }>;
  };
}

const ProblemSolver: React.FC = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (problemId) {
      fetchProblem();
    }
  }, [problemId]);

  const fetchProblem = async () => {
    try {
      const response = await api.get(`/code/problem/${problemId}`);
      setProblem(response.data);
    } catch (error) {
      console.error("Failed to fetch problem:", error);
    }
  };

  const handleRun = async (code: string, input: string) => {
    setLoading(true);
    try {
      const response = await api.post("/code/execute", {
        code,
        language: selectedLanguage,
        input,
      });

      setOutput(response.data.output || response.data.error || "No output");
    } catch (error) {
      setOutput("Execution failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (code: string) => {
    setLoading(true);
    try {
      const response = await api.post(`/code/submit/${problemId}`, {
        code,
        language: selectedLanguage,
      });

      setTestResult(response.data);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInitialCode = () => {
    const template = problem?.template?.find(
      (t) => t.language === selectedLanguage
    );
    return template?.code || "";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "success";
      case "medium":
        return "warning";
      case "hard":
        return "danger";
      default:
        return "secondary";
    }
  };

  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex">
      <div className="w-1/2 p-6 overflow-y-auto border-r">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {problem.title}
              </h1>
              <Badge variant={getDifficultyColor(problem.difficulty) as any}>
                {problem.difficulty}
              </Badge>
            </div>

            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: problem.description }}
            />
          </div>

          {problem.examples.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold mb-4">Examples</h3>
              {problem.examples.map((example, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div>
                        <span className="font-medium">Input:</span>
                        <pre className="bg-white dark:bg-gray-900 p-2 rounded mt-1 text-sm">
                          {example.input}
                        </pre>
                      </div>
                      <div>
                        <span className="font-medium">Output:</span>
                        <pre className="bg-white dark:bg-gray-900 p-2 rounded mt-1 text-sm">
                          {example.output}
                        </pre>
                      </div>
                    </div>
                    {example.explanation && (
                      <div>
                        <span className="font-medium">Explanation:</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {example.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </Card>
          )}

          {problem.constraints.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold mb-4">Constraints</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {problem.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </Card>
          )}
        </motion.div>
      </div>

      <div className="w-1/2 flex flex-col">
        <div className="flex-1">
          <CodeEditor
            language={selectedLanguage}
            initialCode={getInitialCode()}
            onRun={handleRun}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>

        <div className="h-1/3 border-t flex">
          <div className="w-1/2 p-4 border-r">
            <h3 className="font-semibold mb-2">Output</h3>
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-auto h-32">
              {output || "Run your code to see output here"}
            </pre>
          </div>

          <div className="w-1/2 p-4">
            <h3 className="font-semibold mb-2">Test Results</h3>
            {testResult ? (
              <div className="space-y-2">
                <div
                  className={`flex items-center space-x-2 ${
                    testResult.status === "accepted"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {testResult.status === "accepted" ? (
                    <CheckCircleIcon className="w-5 h-5" />
                  ) : (
                    <XCircleIcon className="w-5 h-5" />
                  )}
                  <span className="font-medium">
                    {testResult.status === "accepted"
                      ? "Accepted"
                      : "Wrong Answer"}
                  </span>
                </div>

                <p className="text-sm">
                  {testResult.testResults.passed} /{" "}
                  {testResult.testResults.total} test cases passed
                </p>

                <div className="bg-gray-100 dark:bg-gray-800 rounded p-2 max-h-20 overflow-auto">
                  {testResult.testResults.results
                    .slice(0, 3)
                    .map((result, index) => (
                      <div
                        key={index}
                        className={`text-xs ${
                          result.passed ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        Test {index + 1}: {result.passed ? "PASS" : "FAIL"}
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Submit your solution to see test results
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolver;
