import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "stat" | "glass" | "dark";
  hoverable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  hoverable = true,
  padding = "md",
  className = "",
  ...props
}) => {
  const baseStyles = "rounded-default transition-all duration-300 border border-outline-variant/10 overflow-hidden";
  
  const variants = {
    default: "bg-surface-container-lowest text-on-surface soft-shadow",
    stat: "bg-primary-container text-on-primary-container font-sans shadow-md border-primary/20",
    glass: "glass-card",
    dark: "bg-brand-navy text-white border-white/5 shadow-xl",
  };

  const hovers = hoverable
    ? variant === "glass"
      ? "hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5"
      : "soft-shadow-hover hover:-translate-y-0.5"
    : "";

  const paddings = {
    none: "p-0",
    sm: "p-sm",
    md: "p-md",
    lg: "p-lg md:p-xl",
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${hovers} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
