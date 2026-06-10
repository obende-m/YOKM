import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  action?: React.ReactNode;
  titleClassName?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  centered = false,
  action,
  titleClassName = "",
}) => {
  const containerClass = centered
    ? "text-center flex flex-col items-center max-w-2xl mx-auto mb-xl"
    : "flex flex-col md:flex-row justify-between items-start md:items-end gap-md mb-xl";

  const contentClass = centered ? "flex flex-col items-center" : "max-w-xl";

  return (
    <div className={containerClass}>
      <div className={contentClass}>
        {badge && (
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm border border-secondary/20 mb-xs">
            {badge}
          </span>
        )}
        <h2 className={`font-headline-lg text-headline-lg text-on-surface leading-tight ${titleClassName}`}>
          {title}
        </h2>
        {centered && <div className="h-1 w-20 bg-secondary mt-sm rounded-full" />}
        {subtitle && (
          <p className="text-on-surface-variant text-body-md mt-sm leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className={centered ? "mt-md" : "flex-shrink-0"}>{action}</div>}
    </div>
  );
};
