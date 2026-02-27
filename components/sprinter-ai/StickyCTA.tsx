import Link from "next/link";

export default function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t [border-color:var(--spr-border)] bg-[color:rgba(4,7,18,0.96)] px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur-xl lg:hidden">
      <div className="mx-auto w-full max-w-xl">
        <Link
          href="https://cal.com/tyler-dreher"
          target="_blank"
          rel="noopener noreferrer"
          className="spr-button spr-button-primary w-full"
        >
          Book a Call
        </Link>
      </div>
    </div>
  );
}
