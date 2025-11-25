"use client";

import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Link from "next/link";

type Role = "user" | "assistant";

interface Message {
  role: Role;
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hello! I'm Ilker's AI assistant. Feel free to ask me anything about his tech stack, projects, work experience, or background.",
};

export default function AskIlker() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => Boolean(input.trim()) && !loading, [input, loading]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt) return;

    setError(null);
    setLoading(true);
    setInput("");

    setMessages((prev) => [...prev, { role: "user", content: prompt }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: prompt }),
      });

      const data = await response.json();

      if (!response.ok || !data?.reply) {
        throw new Error(data?.error ?? "An unknown error occurred");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm unable to respond right now. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card classNames={{ body: "h-full min-h-[360px] gap-4" }}>
      <div className="flex flex-col gap-1 text-2xl font-semibold leading-none">
        Ask Ilker
        <span className="text-secondary text-base font-medium">
          Ask anything about tech stack, projects, experience, or background.
        </span>
      </div>

      <div className="flex-1 w-full overflow-hidden rounded-2xl border border-[#e2e8f0] bg-[#f8fafc]">
        <div className="h-64 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`rounded-2xl px-4 py-3 text-sm shadow-sm max-w-[85%] ${
                message.role === "assistant" ? "bg-white text-primary" : "bg-primary text-white self-end"
              }`}
            >
              {message.role === "assistant" ? (
                <div className="prose-sm prose-slate">
                  <ReactMarkdown
                  components={{
                    a: ({ href, children }) => (
                      <Link target="_blank" href={href as string} rel="noopener noreferrer" className="text-primary underline hover:no-underline">
                        {children}
                      </Link>
                    ),
                  }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              )}
            </div>
          ))}
          {loading && (
            <div className="rounded-2xl px-4 py-3 text-sm shadow-sm bg-white text-secondary animate-pulse">
              Ilker AI is thinking...
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-widest text-secondary">Your Message</label>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="e.g., What Next.js projects has Ilker worked on?"
            rows={3}
            className="w-full rounded-2xl border border-[#e2e8f0] bg-white p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={loading}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" color="dark" disabled={!canSubmit} icon="f7:paperplane">
            Send
          </Button>
          {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
      </form>
    </Card>
  );
}

