import React, { useState } from "react";
import { askGemini } from "../services/geminiService";
import ReactMarkdown from "react-markdown";
import { Loader2, Sparkles, Copy, Check, Search } from "lucide-react";

export function AIWriter() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const instruction =
        "You are an expert technical writer and researcher. Provide detailed, well-structured, and accurate research content based on the user's topic. Use markdown for formatting, including headings, bullet points, and code blocks if relevant.";
      const result = await askGemini(
        `Please research and write a detailed article/explanation about: ${topic}`,
        undefined,
        instruction,
      );
      setContent(result || "");
    } catch (error) {
      setContent("Error generating content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white rounded-xl overflow-hidden border border-zinc-800">
      <div className="p-6 border-b border-zinc-800 bg-zinc-900/50">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          AI Research Writer
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Enter a topic to generate detailed research, documentation, or
          technical articles.
        </p>

        <form onSubmit={handleGenerate} className="mt-4 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Explain Quantum Computing in simple terms, or Write a guide on React Hooks..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={!topic.trim() || isLoading}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            Generate
          </button>
        </form>
      </div>

      <div className="flex-1 overflow-auto p-6 bg-[#1d1f21]">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            <p>
              Researching and writing your content... This might take a moment.
            </p>
          </div>
        ) : content ? (
          <div className="max-w-4xl mx-auto relative">
            <button
              onClick={copyToClipboard}
              className="absolute top-0 right-0 p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg border border-zinc-700 flex items-center gap-2 text-sm transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
            <div className="prose prose-invert prose-emerald max-w-none prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-700 pt-12">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500">
            <Sparkles className="w-12 h-12 mb-4 opacity-20" />
            <p>Your generated research will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
