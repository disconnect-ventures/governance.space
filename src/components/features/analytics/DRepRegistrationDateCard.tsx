import { Card, CardContent } from "@/components/ui/card";
import { use } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { formatNumber } from "./utils/formatters";
import { AnalyticsDashboardProps } from "./AnalyticsDashboard";

type DRepRegistrationDateCardProps = Pick<
  AnalyticsDashboardProps,
  "translations" | "drepRegistrationDataPromise"
>;

const DRepRegistrationDateCard = ({
  translations,
  drepRegistrationDataPromise,
}: DRepRegistrationDateCardProps) => {
  const registrationData = use(drepRegistrationDataPromise);
  const chartColors = {
    primary: "hsl(var(--chart-1))",
    secondary: "hsl(var(--chart-2))",
  };

  return (
    <Card className="bg-card text-card-foreground shadow-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {translations.pageAnalytics.drepsRegistryDateDistribution}
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          {translations.pageAnalytics.drepsRegistryDateDistributionDesc}
        </p>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={registrationData}
              margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="formattedDate"
                angle={-45}
                textAnchor="end"
                height={50}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={(value) => formatNumber(value)}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value) => [
                  formatNumber(value as number),
                  translations.general.registrations,
                ]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Bar dataKey="count" name="Registrations" radius={[4, 4, 0, 0]}>
                {registrationData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index % 2 === 0
                        ? chartColors.primary
                        : chartColors.secondary
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DRepRegistrationDateCard;
