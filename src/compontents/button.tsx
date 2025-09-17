import React, { ReactNode, MouseEventHandler } from "react";

interface Btn {
  name?: string;
  color: string;
  backgroundColor?: string;
  className?: string;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ name, color, className, icon, backgroundColor, onClick}: Btn) {
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
      >
        {icon && <span>{icon}</span>}
        {name}
      </button>
    </div>
  );
}
