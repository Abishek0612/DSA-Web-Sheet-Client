import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { PlayIcon, SendIcon, SettingsIcon } from "lucide-react";
import Button from "../Common/Button";

const CodeEditor = ({
  language,
  initialCode = "",
  onRun,
  onSubmit,
  loading = false,
  theme = "light",
}) => {
  const [code, setCode] = useState(initialCode);
  const [input, setInput] = useState("");
  const [fontSize, setFontSize] = useState(14);
  const editorRef = useRef(null);

  const languageTemplates = {
    javascript: `function solution() {
    // Write your code here
    
}`,
    python: `def solution():
    # Write your code here
    pass`,
    java: `public class Solution {
    public static void main(String[] args) {
        // Write your code here
    }
}`,
    cpp: `#include <iostream>
using namespace std;

int main() {
    // Write your code here
    return 0;
}`,
  };

  useEffect(() => {
    if (!initialCode && languageTemplates[language]) {
      setCode(languageTemplates[language]);
    }
  }, [language, initialCode]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 border-b">
        <div className="flex items-center space-x-3">
          <select
            value={language}
            className="px-3 py-1 bg-white dark:bg-gray-700 border rounded text-sm"
            disabled
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>

          <div className="flex items-center space-x-2">
            <SettingsIcon className="w-4 h-4" />
            <input
              type="range"
              min="12"
              max="20"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-16"
            />
            <span className="text-sm">{fontSize}px</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={() => onRun(code, input)}
            variant="outline"
            size="sm"
            loading={loading}
            leftIcon={<PlayIcon className="w-4 h-4" />}
          >
            Run
          </Button>
          <Button
            onClick={() => onSubmit(code)}
            size="sm"
            loading={loading}
            leftIcon={<SendIcon className="w-4 h-4" />}
          >
            Submit
          </Button>
        </div>
      </div>

      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          onMount={handleEditorDidMount}
          theme={theme === "dark" ? "vs-dark" : "vs-light"}
          options={{
            fontSize,
            minimap: { enabled: false },
            wordWrap: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      <div className="p-3 border-t bg-gray-50 dark:bg-gray-800">
        <label className="block text-sm font-medium mb-2">
          Input (Optional)
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter input for testing..."
          className="w-full h-20 p-2 border rounded text-sm resize-none"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
