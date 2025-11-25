"use client";

import Card from "./ui/Card";
import { Icon } from "@iconify/react";

export default function MusicCard() {
  const handleClick = () => {
    const event = new CustomEvent("openChat");
    window.dispatchEvent(event);
  };

  return (
    <Card
      classNames={{
        body: "h-auto p-4 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group",
      }}
      onClick={handleClick}
    >
      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
        <Icon icon="humbleicons:ai" className="w-6 h-6 text-white" />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-white mb-1">Ask Ilker</p>
        <p className="text-xs text-white/80">AI Assistant</p>
      </div>
      <p className="text-xs text-white/70 text-center">Click to chat</p>
    </Card>
  );
}
