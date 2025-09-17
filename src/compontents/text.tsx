import React from "react";

type props = {
  variant?: string;
  children: React.ReactNode;
  className?: string;
};

const Text: React.FC<props> = ({ variant, children, className }) => {
  if (variant === "h2") return <h2 className={className}>{children}</h2>;
  if (variant === "p") return <p className={className}>{children}</p>;
    return (
    <div className={className}>{children}</div>
);
};

export default Text;
