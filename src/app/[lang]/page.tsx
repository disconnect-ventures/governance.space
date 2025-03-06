import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Dictionary, getDictionary } from "~/config/dictionaries";
import { PageProps } from "./layout";

const Banner = ({
  title,
  description,
  buttonMain,
  buttonSecondary,
}: Dictionary["homepage"]["banner"]) => {
  return (
    <div className="w-full bg-background bg-gradient-to-b from-blue-50 to-white py-16 md:py-24  rounded">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-fit md:max-w-1/2 space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-md">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                {buttonMain} <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-border hover:bg-accent hover:text-accent-foreground"
              >
                {buttonSecondary}
              </Button>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative">
            <div className="relative aspect-[4/3] w-full max-w-md mx-auto">
              <div className="absolute inset-0 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/assets/icon-512.png"
                  alt="Dashboard de governança blockchain"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
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

export default async function IndexPage({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
  const dictionary = await getDictionary(params.lang);

  return (
    <div>
      <Banner {...dictionary.homepage.banner} />
    </div>
  );
}
