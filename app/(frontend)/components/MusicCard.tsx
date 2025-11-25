"use client";

import Card from "./ui/Card";

export default function MusicCard() {
  return (
    <Card
      classNames={{
        body: "flex-1 lg:flex-unset p-3 bg-white border border-divider rounded-2xl flex flex-col gap-3",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] uppercase tracking-[0.25em] text-secondary">
            Ad spot
          </p>
          <p className="text-base font-semibold text-foreground">
            Tiny billboard
          </p>
        </div>
        <span className="text-xs font-semibold text-secondary uppercase tracking-[0.2em]">
          Slot #07
        </span>
      </div>

      <p className="text-xs text-secondary leading-snug">
        Drop your wittiest one-liner here—ship a feature, roast a bug, brag
        about coffee count. Max 120 characters, vibe unlimited.
      </p>

      <div className="w-full flex items-center justify-between text-[10px] text-secondary">
        <span>Width: 230px</span>
        <button className="text-primary underline decoration-dotted">
          Drop a quip
        </button>
      </div>
    </Card>
  );
}
