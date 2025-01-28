import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="w-auto h-full hover:text-accent">
      <Link className="w-full" href="/" aria-label="Home">
        <div className="flex items-center whitespace-nowrap focus:text-inherit">
          <Image
            src={"/icon-512.png"}
            height={512}
            width={512}
            alt="logo-icon"
            className="h-10 w-10"
          />
          <span className="text-xl font-semibold text-gray-800">
            GOVERNANCE
          </span>
          <span className="text-xl text-gray-500">SPACE</span>
        </div>
      </Link>
    </div>
  );
}
