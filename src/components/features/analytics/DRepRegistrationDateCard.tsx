import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { use } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
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

  const chartColors = useMemo(
    () => ({
      primary: "hsl(var(--chart-1))",
      secondary: "hsl(var(--chart-2))",
    }),
    []
  );

  const getBarColor = useMemo(
    () => (index: number) =>
      index % 2 === 0 ? chartColors.primary : chartColors.secondary,
    [chartColors]
  );

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
              margin={{ top: 20, right: 10, left: 10, bottom: 30 }}
            >
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
              <Bar dataKey="count" name="Registrations" radius={[4, 4, 0, 0]}>
                {registrationData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getBarColor(index)}
                    strokeWidth={0}
                  />
                ))}
                <LabelList
                  dataKey="count"
                  position="top"
                  formatter={formatNumber}
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    fill: "hsl(var(--foreground))",
                  }}
                  offset={5}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DRepRegistrationDateCard;
