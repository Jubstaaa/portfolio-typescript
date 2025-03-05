import { cn } from "@/lib/cn";
import React from "react";

export interface InputProps {
  name: string;
  placeholder?: string;
  type?: string;
  error?: string;
}

function Input({ name, placeholder, type = "text", error }: InputProps) {
  const className = cn(
    "w-full p-4 rounded-lg bg-white focus:outline-none tracking-wide shadow-sm resize-none border border-transparent",
    {
      "col-span-full": type === "textarea",
      "border-red-500": error,
    }
  );

  if (type === "textarea") {
    return (
      <textarea
        name={name}
        className={className}
        placeholder={placeholder}
        rows={5}
      />
    );
  }

  return (
    <input
      type={type}
      name={name}
      className={className}
      placeholder={placeholder}
    />
  );
}

export default Input;
