import Link from "next/link";

interface StickyCTAProps {
  href?: string;
  label?: string;
}

export default function StickyCTA({
  href = "https://cal.com/tyler-dreher",
  label = "Book a Call",
}: StickyCTAProps) {
  const isExternal = href.startsWith("http");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t [border-color:var(--spr-border)] bg-[color:rgba(4,7,18,0.95)] px-4 pb-[calc(env(safe-area-inset-bottom)+0.85rem)] pt-3 backdrop-blur-xl lg:hidden">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="spr-button spr-button-primary w-full"
        >
          {label}
        </Link>
      </div>
    </div>
  );
}
