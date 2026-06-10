import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "support" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-default transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-on-primary hover:bg-surface-tint focus:ring-primary shadow-md",
    secondary: "bg-primary-container text-on-primary-container hover:bg-primary/20 focus:ring-primary-container",
    support: "bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container focus:ring-secondary shadow-md",
    outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary/5 focus:ring-primary",
    ghost: "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface focus:ring-outline",
  };

  const sizes = {
    sm: "px-4 py-2 text-label-sm",
    md: "px-6 py-2.5 text-label-md",
    lg: "px-8 py-4 text-body-lg",
  };

  const widthStyle = fullWidth ? "w-full" : "";
  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="mr-2 inline-flex">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2 inline-flex">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {content}
    </button>
  );
};
