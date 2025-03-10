import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { buttonVariants } from "~/components/ui/button";
import { Dictionary } from "~/config/dictionaries";
import Link from "next/link";
import clsx from "clsx";

export const Banner = ({
  title,
  description,
  buttonMain,
  buttonSecondary,
}: Dictionary["homepage"]["banner"]) => {
  return (
    <div className="w-full bg-background bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:background py-16 md:py-24  rounded">
      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-fit md:max-w-1/2 space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-md">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                className={clsx(
                  buttonVariants(),
                  "w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                )}
                href="/dreps"
              >
                {buttonMain} <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/help"
                className={clsx(
                  buttonVariants({ variant: "outline" }),
                  "w-full sm:w-auto border-border hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {buttonSecondary}
              </Link>
            </div>
          </div>

          <div className="w-full relative">
            <div className="relative aspect-[3/2] w-full mx-auto">
              <div className="absolute inset-0 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/assets/governance.png"
                  alt="Dashboard de governança blockchain"
                  fill
                  // width={1000}
                  // height={494}
                  sizes="(max-width: 1000px) 100vw, 50vw"
                  className="object-cover rounded"
                  priority
                />
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-background rounded-md shadow-md p-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    Powered by
                  </span>
                  <span className="text-xs font-semibold text-blue-500">
                    Cardano Blockchain
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
