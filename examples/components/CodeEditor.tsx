import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Copy, Check, Download, AlertTriangle } from "lucide-react";

interface CodeEditorProps {
  code: string;
  onCodeChange?: (newCode: string) => void;
  language?: string;
  filename?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onCodeChange,
  language = "typescript",
  filename = "Example.tsx"
}) => {
  const [editorVal, setEditorVal] = useState(code);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync editor val when template code triggers change
  useEffect(() => {
    setEditorVal(code);
    setError(null);
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editorVal);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([editorVal], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleEditorChange = (value: string | undefined) => {
    const newVal = value || "";
    setEditorVal(newVal);
    
    // Attempt basic syntax check
    try {
      if (onCodeChange) {
        onCodeChange(newVal);
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || "Compilation syntax error.");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#09090e] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-semibold text-slate-400 font-mono ml-2">
            {filename}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-all"
            title="Copy Code"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={handleDownload}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-all"
            title="Download Component"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Monaco Editor Screen */}
      <div className="flex-1 min-h-[300px] relative">
        <MonacoEditor
          height="100%"
          language={language}
          theme="vs-dark"
          value={editorVal}
          onChange={handleEditorChange}
          beforeMount={(monaco) => {
            monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
              noSemanticValidation: true,
              noSyntaxValidation: true
            });
            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
              noSemanticValidation: true,
              noSyntaxValidation: true
            });
          }}
          options={{
            minimap: { enabled: false },
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            lineNumbers: "on",
            roundedSelection: true,
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,
            padding: { top: 12, bottom: 12 }
          }}
        />

        {error && (
          <div className="absolute bottom-4 left-4 right-4 p-3 bg-red-950/80 border border-red-800 text-red-300 text-xs rounded-lg flex items-start gap-2 backdrop-blur shadow-lg z-10">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold">Live compilation error:</p>
              <pre className="mt-1 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {error}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
