import { SparklesIcon } from "@heroicons/react/24/outline";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  badgeIcon?: React.ReactNode;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  badgeIcon,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignClass} mb-12`}>
      {badge && (
        <div
          className={`mb-6 ${align === "center" ? "flex justify-center" : ""}`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border [border-color:var(--spr-border)] bg-[color:rgba(255,171,102,0.14)] px-4 py-2 text-sm text-[color:var(--spr-accent)]">
            {badgeIcon || <SparklesIcon className="h-4 w-4" />}
            <span>{badge}</span>
          </div>
        </div>
      )}
      <h2 className="spr-heading-lg">{title}</h2>
      {subtitle && <p className="spr-body-lg mt-4 max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  );
}
