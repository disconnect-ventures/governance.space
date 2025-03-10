import clsx from "clsx";
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

interface FeatureSectionProps {
  title: string;
  subtitle?: string;
  features: {
    title: string;
    description: string;
    icon?: string;
  }[];
  layoutClassName?: string;
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

const FeatureItem = ({ title, description, icon }: FeatureItemProps) => {
  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-sm p-6 border border-border">
      {icon && <div className="text-blue-500 mb-4">{icon}</div>}
      <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export const FeatureSection = ({
  title,
  subtitle,
  features,
  layoutClassName = "",
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

        <div className={clsx(`grid`, layoutClassName)}>
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
