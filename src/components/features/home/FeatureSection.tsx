import clsx from "clsx";
import {
  BarChart3,
  Blocks,
  MessageSquare,
  ShieldCheck,
  Users,
  Vote,
} from "lucide-react";
import { Dictionary } from "~/config/dictionaries";

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

interface FeatureSectionProps {
  translations:
    | Dictionary["homepage"]["whyChooseUs"]
    | Dictionary["homepage"]["mainFunctionalities"];
  layoutClassName?: string;
}

export const FeatureSection = ({
  translations,
  layoutClassName = "",
}: FeatureSectionProps) => {
  return (
    <section>
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            {translations.title}
          </h2>
          {"subtitle" in translations && translations.subtitle && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {translations.subtitle}
            </p>
          )}
        </div>
        <div className={clsx(`grid`, layoutClassName)}>
          {translations.features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-card rounded-lg shadow-sm p-6 border border-border"
            >
              {"icon" in feature && feature.icon && (
                <div className="text-blue-500 mb-4">
                  {getIconComponent(feature.icon)}
                </div>
              )}
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
