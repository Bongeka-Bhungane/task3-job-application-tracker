import React from "react";

type props = {
  variant?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Text: React.FC<props> = ({ variant, children, className, onClick }) => {
  if (variant === "h2") return <h2 className={className}>{children}</h2>;
  if (variant === "p") return <p className={className}>{children}</p>;
  if (variant === "span") return <span className={className} onClick={onClick}>{children}</span>;
    return (
    <div className={className}>{children}</div>
);
};

export default Text;
