"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { sendChatMessageStream } from "@/lib/actions";
import { readStreamableValue, type StreamableValue } from "@ai-sdk/rsc";

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

const SUGGESTED_QUESTIONS = [
  "What Next.js projects has Ilker worked on?",
  "Tell me about Ilker's tech stack",
  "What is Ilker's work experience?",
  "Show me Ilker's portfolio projects",
];

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const assistantIndexRef = useRef<number | null>(null);

  // Listen for custom event to open chat
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };

    window.addEventListener("openChat", handleOpenChat);
    return () => {
      window.removeEventListener("openChat", handleOpenChat);
    };
  }, []);

  // Scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending]);

  // No-op: streaming güncellemede ayrı state kullanılacak

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message") as string;

    if (!message?.trim()) return;

    setMessages((prev) => {
      const idx = prev.length + 1;
      assistantIndexRef.current = idx;
      return [
        ...prev,
        { role: "user", content: message.trim() },
        { role: "assistant", content: "Ilker AI is thinking..." },
      ];
    });
    setShowSuggestions(false);
    setPending(true);
    setError(null);

    

    try {
      const res = await sendChatMessageStream(formData);
console.log(res)
      if ("errors" in res && res.errors?.message?.length) {
        setError(res.errors.message[0]);
        return;
      }

      const { output } = res as { output: StreamableValue<string> };
      let first = true;
      for await (const delta of readStreamableValue(output)) {
        const chunk = String(delta);
        const isEmptyFirst = first && chunk.trim().length === 0;
        if (isEmptyFirst) {
          continue;
        }
        setMessages((prev) => {
          const next = [...prev];
          const target = assistantIndexRef.current ?? next.length - 1;
          if (!next[target]) {
            next.push({ role: "assistant", content: "" });
            assistantIndexRef.current = next.length - 1;
          }
          next[assistantIndexRef.current ?? next.length - 1] = {
            ...next[target],
            content: first ? chunk : next[target].content + chunk,
          };
          return next;
        });
        if (first) {
          first = false;
        }
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setPending(false);
      const form = document.getElementById("chat-form") as HTMLFormElement;
      if (form) form.reset();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const form = document.getElementById("chat-form") as HTMLFormElement;
    if (form) {
      const input = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
      if (input) {
        input.value = suggestion;
        form.requestSubmit();
      }
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-12 h-12 rounded-full bg-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110",
          isOpen && "bg-red-500"
        )}
        aria-label="Open chat"
      >
        <Icon
          icon={isOpen ? "humbleicons:times" : "humbleicons:ai"}
          className="w-6 h-6 transition-transform duration-300"
        />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-3 lg:right-24 z-40 w-[calc(100vw-1.5rem)] lg:w-[90vw] max-w-md h-[calc(100vh-8rem)] max-h-[600px] bg-white rounded-2xl shadow-2xl border border-[#e2e8f0] flex flex-col transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#e2e8f0] bg-gradient-to-r from-primary to-primary/90 rounded-t-2xl">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-lg font-semibold text-white">Ask Ilker</h3>
            <p className="text-xs text-white/80">AI Assistant</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
            aria-label="Close chat"
          >
            <Icon icon="f7:xmark" className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#f8fafc] flex flex-col gap-3">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={cn(
                "rounded-2xl px-4 py-3 text-sm shadow-sm max-w-[85%]",
                message.role === "assistant"
                  ? "bg-white text-primary"
                  : "bg-primary text-white self-end"
              )}
            >
              {message.role === "assistant" ? (
                <div className="prose-sm prose-slate">
                  <ReactMarkdown
                    components={{
                      a: ({ href, children }) => (
                        <Link
                          target="_blank"
                          href={href as string}
                          rel="noopener noreferrer"
                          className="text-primary underline hover:no-underline"
                        >
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

          {/* Suggested Questions */}
          {showSuggestions && messages.length === 1 && (
            <div className="flex flex-col gap-2 mt-2">
              <p className="text-xs text-secondary font-medium">Suggested questions:</p>
              <div className="flex flex-col gap-2">
                {SUGGESTED_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(question)}
                    className="text-left text-xs px-3 py-2 rounded-lg bg-white border border-[#e2e8f0] hover:border-primary hover:bg-primary/5 transition-colors text-primary"
                    disabled={pending}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* thinking mesajı assistant balonunun içinde gösteriliyor */}
          {/* thinking mesajı assistant balonunun içinde gösteriliyor */}

          {error && (
            <div className="rounded-2xl px-4 py-3 text-sm shadow-sm bg-red-50 text-red-600 border border-red-200">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form
          id="chat-form"
          onSubmit={handleSubmit}
          className="p-4 border-t border-[#e2e8f0] bg-white rounded-b-2xl"
        >
          <div className="flex flex-col gap-2">
            <textarea
              name="message"
              placeholder="Ask me anything..."
              rows={2}
              className="w-full rounded-xl border border-[#e2e8f0] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              disabled={pending}
              required
            />
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={pending}
                className={cn(
                  "px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium transition-all duration-200 flex items-center gap-2",
                  pending
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-primary/90 hover:shadow-md"
                )}
              >
                {pending ? (
                  <>
                    <Icon icon="eos-icons:loading" className="w-4 h-4" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send
                    <Icon icon="f7:paperplane" className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
