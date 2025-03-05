import Image from "next/image";
import Link from "~/components/features/Link";

export default function Logo() {
  return (
    <div className="w-auto h-full hover:text-accent">
      <Link className="w-full" href="/" aria-label="Home">
        <div className="flex items-center whitespace-nowrap focus:text-inherit">
          <Image
            src={"/assets/icon-512.png"}
            height={512}
            width={512}
            alt="logo-icon"
            className="h-10 w-10"
          />
          <span className="text-xl font-semibold text-foreground">GOVERNANCE</span>
          <span className="text-xl text-muted-foreground">SPACE</span>
        </div>
      </Link>
    </div>
  );
}
