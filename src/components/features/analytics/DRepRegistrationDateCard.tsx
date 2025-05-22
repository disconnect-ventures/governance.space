import React, { useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { use } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  Legend,
  TooltipProps,
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
      total: "hsl(var(--chart-1))",
      monthly: "hsl(var(--chart-2))",
      background: "hsl(var(--background))",
      muted: "hsl(var(--muted))",
      mutedForeground: "hsl(var(--muted-foreground))",
    }),
    []
  );

  const getChartColor = useCallback(
    (
      type: "total" | "monthly" | "background" | "muted" | "mutedForeground"
    ) => {
      return chartColors[type];
    },
    [chartColors]
  );

  const formattedData = useMemo(() => {
    const locale = translations.general.locale || "en-US";

    const sortedData = [...registrationData].sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    let cumulativeCount = 0;
    const cumulativeData = sortedData.map((item) => {
      cumulativeCount += item.count;

      const [year, month] = item.date.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1, 1);
      const formattedMonth = new Intl.DateTimeFormat(locale, {
        month: "short",
      }).format(date);
      const formattedYear = year;
      const formattedDate = `${formattedMonth} ${formattedYear}`;

      return {
        ...item,
        totalCount: cumulativeCount,
        monthlyCount: item.count,
        formattedDate,
      };
    });

    return cumulativeData;
  }, [registrationData, translations.general.locale]);

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover p-4 rounded-md shadow-md border border-border text-sm">
          <p className="font-semibold mb-2">{label}</p>
          <div className="flex items-center gap-2 mb-1.5">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: getChartColor("monthly") }}
            ></div>
            <p className="text-card-foreground">
              {translations.general.month}:{" "}
              <span className="font-medium">
                {formatNumber(payload[0].value as number)}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: getChartColor("total") }}
            ></div>
            <p className="text-card-foreground">
              {translations.general.total}:{" "}
              <span className="font-medium">
                {formatNumber(payload[1].value as number)}
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-card text-card-foreground shadow-none">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {translations.pageAnalytics.drepRegistrationDateTitle}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {translations.pageAnalytics.drepRegistrationDateDesc}
        </p>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={formattedData}
              margin={{ top: 10, right: 15, left: 5, bottom: 35 }}
              layout="horizontal"
              stackOffset="none"
              barCategoryGap="10%"
              barGap={4}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted opacity-20"
                vertical={false}
              />
              <XAxis
                dataKey="formattedDate"
                angle={-40}
                textAnchor="end"
                height={50}
                tick={{
                  fontSize: 12,
                  fill: getChartColor("mutedForeground"),
                }}
                axisLine={{ stroke: getChartColor("muted"), opacity: 0.5 }}
                tickLine={{ stroke: getChartColor("muted"), opacity: 0.5 }}
                dy={8}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                tickFormatter={(value) => formatNumber(value)}
                tick={{
                  fontSize: 12,
                  fill: getChartColor("mutedForeground"),
                }}
                axisLine={{ stroke: getChartColor("muted"), opacity: 0.5 }}
                tickLine={{ stroke: getChartColor("muted"), opacity: 0.5 }}
                width={45}
                domain={[0, "auto"]}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => formatNumber(value)}
                tick={{
                  fontSize: 12,
                  fill: getChartColor("mutedForeground"),
                }}
                axisLine={{ stroke: getChartColor("muted"), opacity: 0.5 }}
                tickLine={{ stroke: getChartColor("muted"), opacity: 0.5 }}
                width={50}
                domain={[0, "auto"]}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: 10,
                  fontSize: 12,
                }}
                iconType="square"
                iconSize={10}
                align="center"
                verticalAlign="bottom"
              />
              <Bar
                yAxisId="left"
                dataKey="monthlyCount"
                name={translations.general.month}
                fill={getChartColor("monthly")}
                fillOpacity={0.85}
                radius={[4, 4, 0, 0]}
                barSize={24}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="totalCount"
                name={translations.general.total}
                stroke={getChartColor("total")}
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 0, fill: getChartColor("total") }}
                activeDot={{
                  r: 6,
                  strokeWidth: 1,
                  stroke: getChartColor("background"),
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DRepRegistrationDateCard;
