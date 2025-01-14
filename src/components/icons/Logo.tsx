import Link from "next/link";

export default function Logo() {
  return (
    <div className="w-auto h-full hover:text-accent">
      <Link className="w-full" href="/" aria-label="Home">
        <div className="flex items-center">
          <span className="text-xl font-semibold">🏛️ GOVERNANCE</span>
          <span className="text-xl text-gray-500">SPACE</span>
        </div>
      </Link>
    </div>
  );
}
