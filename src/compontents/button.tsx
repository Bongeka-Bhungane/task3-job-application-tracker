import React from "react";
import type { ReactNode, MouseEventHandler } from "react";

interface Btn {
  name: string;
  color: string;
  backgroundColor?: string;
  className?: string;
  icon?: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ name, color, className, icon, backgroundColor, onClick, type}: Btn) {
  return (
    <div>
      <button
      onClick={onClick}
        style={{
          background: backgroundColor,
          color: color,
          fontSize: "100%",
        }}
        className={className}
        type={type}
      >
        {icon && <span>{icon}</span>}
        {name}
      </button>
    </div>
  );
}
