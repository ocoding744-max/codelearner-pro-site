import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup"; // HTML
import "prismjs/themes/prism-tomorrow.css"; // Dark theme
import { Play, Code, Layout, Terminal } from "lucide-react";

interface CodeEditorProps {
  initialHtml?: string;
  initialCss?: string;
  initialJs?: string;
  lessonId?: string;
}

export function CodeEditor({
  initialHtml = "<h1>Hello World</h1>\n<p>Welcome to CodeMaster Pro.</p>",
  initialCss = "h1 {\n  color: #10b981;\n  font-family: sans-serif;\n}\np {\n  color: #a1a1aa;\n  font-family: sans-serif;\n}",
  initialJs = 'console.log("App loaded successfully!");',
  lessonId,
}: CodeEditorProps) {
  const [html, setHtml] = React.useState(initialHtml);
  const [css, setCss] = React.useState(initialCss);
  const [js, setJs] = React.useState(initialJs);
  const [activeTab, setActiveTab] = React.useState<"html" | "css" | "js">(
    "html",
  );

  React.useEffect(() => {
    setHtml(initialHtml);
    setCss(initialCss);
    setJs(initialJs);
  }, [lessonId, initialHtml, initialCss, initialJs]);

  const srcDoc = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `;

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white rounded-xl overflow-hidden border border-zinc-800">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab("html")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === "html"
                ? "bg-zinc-800 text-emerald-400"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
            }`}
          >
            <Layout className="w-4 h-4" /> HTML
          </button>
          <button
            onClick={() => setActiveTab("css")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === "css"
                ? "bg-zinc-800 text-blue-400"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
            }`}
          >
            <Code className="w-4 h-4" /> CSS
          </button>
          <button
            onClick={() => setActiveTab("js")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === "js"
                ? "bg-zinc-800 text-yellow-400"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
            }`}
          >
            <Terminal className="w-4 h-4" /> JS
          </button>
        </div>
        <div className="flex items-center text-zinc-500 text-sm">
          <Play className="w-4 h-4 mr-1 text-emerald-500" /> Live Preview
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        {/* Editor Pane */}
        <div className="flex-1 overflow-auto border-r border-zinc-800 bg-[#1d1f21]">
          <div className="p-4 font-mono text-sm">
            {activeTab === "html" && (
              <Editor
                value={html}
                onValueChange={setHtml}
                highlight={(code) =>
                  Prism.highlight(code, Prism.languages.markup, "markup")
                }
                padding={10}
                style={{
                  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                  fontSize: 14,
                  backgroundColor: "transparent",
                  minHeight: "100%",
                }}
                className="editor-container focus:outline-none"
              />
            )}
            {activeTab === "css" && (
              <Editor
                value={css}
                onValueChange={setCss}
                highlight={(code) =>
                  Prism.highlight(code, Prism.languages.css, "css")
                }
                padding={10}
                style={{
                  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                  fontSize: 14,
                  backgroundColor: "transparent",
                  minHeight: "100%",
                }}
                className="editor-container focus:outline-none"
              />
            )}
            {activeTab === "js" && (
              <Editor
                value={js}
                onValueChange={setJs}
                highlight={(code) =>
                  Prism.highlight(
                    code,
                    Prism.languages.javascript,
                    "javascript",
                  )
                }
                padding={10}
                style={{
                  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                  fontSize: 14,
                  backgroundColor: "transparent",
                  minHeight: "100%",
                }}
                className="editor-container focus:outline-none"
              />
            )}
          </div>
        </div>

        {/* Preview Pane */}
        <div className="flex-1 bg-white relative min-h-[300px] lg:min-h-0">
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            className="absolute inset-0 w-full h-full border-none"
          />
        </div>
      </div>
    </div>
  );
}
