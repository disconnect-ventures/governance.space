import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Dictionary, getDictionary } from "~/config/dictionaries";
import { PageProps } from "./layout";
import {
  BarChart3,
  Blocks,
  MessageSquare,
  ShieldCheck,
  Users,
  Vote,
} from "lucide-react";

interface FeatureItemProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const FeatureItem = ({ title, description, icon }: FeatureItemProps) => {
  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-sm p-6 border border-border">
      {icon && <div className="text-blue-500 mb-4">{icon}</div>}
      <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

interface FeatureSectionProps {
  title: string;
  subtitle?: string;
  features: {
    title: string;
    description: string;
    icon?: string;
  }[];
  variant?: "grid" | "cards";
}

const getIconComponent = (iconName?: string) => {
  if (!iconName) return null;

  const icons: Record<string, React.ReactNode> = {
    blocks: <Blocks size={32} />,
    vote: <Vote size={32} />,
    users: <Users size={32} />,
    chart: <BarChart3 size={32} />,
    message: <MessageSquare size={32} />,
    shield: <ShieldCheck size={32} />,
  };

  return icons[iconName] || null;
};

const FeatureSection = ({
  title,
  subtitle,
  features,
  variant = "cards",
}: FeatureSectionProps) => {
  return (
    <section>
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`grid ${
            variant === "grid"
              ? "grid-cols-1 md:grid-cols-3 gap-8"
              : "grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto"
          }`}
        >
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              title={feature.title}
              description={feature.description}
              icon={getIconComponent(feature.icon)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

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
    <div className="space-y-24">
      <Banner {...dictionary.homepage.banner} />
      <FeatureSection
        title={dictionary.homepage.whyChooseUs.title}
        subtitle={dictionary.homepage.whyChooseUs.subtitle}
        features={dictionary.homepage.whyChooseUs.features}
      />
      <FeatureSection
        title={dictionary.homepage.features.title}
        features={dictionary.homepage.features.features}
        variant="grid"
      />
    </div>
  );
}
