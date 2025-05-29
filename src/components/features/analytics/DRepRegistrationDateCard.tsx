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
  TooltipProps,
  Legend,
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
      total: "hsl(var(--chart-8))",
      monthly: "hsl(var(--chart-6))",
      inactive: "hsl(var(--chart-13))",
      background: "hsl(var(--background))",
      muted: "hsl(var(--muted))",
      mutedForeground: "hsl(var(--muted-foreground))",
    }),
    []
  );

  const getChartColor = useCallback(
    (
      type:
        | "total"
        | "monthly"
        | "inactive"
        | "background"
        | "muted"
        | "mutedForeground"
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

    let cumulativeTotal = 0;
    let cumulativeInactive = 0;

    const cumulativeData = sortedData.map((item) => {
      cumulativeTotal += item.count;
      cumulativeInactive += item.inactiveCount;

      const [year, month] = item.date.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1, 1);
      const formattedMonth = new Intl.DateTimeFormat(locale, {
        month: "short",
      }).format(date);
      const formattedYear = year;
      const formattedDate = `${formattedMonth} ${formattedYear}`;

      return {
        ...item,
        totalDReps: cumulativeTotal,
        monthlyRegistrations: item.count,
        inactiveDReps: cumulativeInactive,
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
      const data = payload[0]?.payload;
      return (
        <div className="bg-popover p-4 rounded-md shadow-md border border-border text-sm">
          <p className="font-semibold mb-2">{label}</p>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: getChartColor("monthly") }}
            ></div>
            <p className="text-card-foreground">
              {translations.general.monthly}:{" "}
              <span className="font-medium">
                {formatNumber(data?.monthlyRegistrations || 0)}
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
                {formatNumber(data?.totalDReps || 0)}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: getChartColor("inactive") }}
            ></div>
            <p className="text-card-foreground">
              {translations.pageAnalytics.totalInactive}:{" "}
              <span className="font-medium">
                {formatNumber(data?.inactiveDReps || 0)}
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
            <ComposedChart data={formattedData}>
              <CartesianGrid className="stroke-muted opacity-0" />
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
                tick={{
                  fontSize: 12,
                  fill: getChartColor("mutedForeground"),
                }}
                axisLine={{ stroke: getChartColor("muted"), opacity: 0.5 }}
                tickLine={{ stroke: getChartColor("muted"), opacity: 0.5 }}
                width={55}
                domain={[0, "auto"]}
                allowDecimals={false}
                tickFormatter={(value) => formatNumber(value)}
                label={{
                  value: translations.pageAnalytics.monthlyRegistrations,
                  angle: -90,
                  position: "insideLeft",
                  style: {
                    textAnchor: "middle",
                    fill: getChartColor("mutedForeground"),
                    fontSize: "14px",
                  },
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{
                  fontSize: 12,
                  fill: getChartColor("mutedForeground"),
                }}
                axisLine={{ stroke: getChartColor("muted"), opacity: 0.5 }}
                tickLine={{ stroke: getChartColor("muted"), opacity: 0.5 }}
                width={55}
                domain={[0, "auto"]}
                allowDecimals={false}
                tickFormatter={(value) => formatNumber(value)}
                label={{
                  value: translations.pageAnalytics.totalRegistrations,
                  angle: 90,
                  position: "insideRight",
                  style: {
                    textAnchor: "middle",
                    fill: getChartColor("mutedForeground"),
                    fontSize: "14px",
                  },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: 16,
                }}
                iconType={"circle"}
                iconSize={12}
                formatter={(value) => (
                  <span
                    style={{
                      color: getChartColor("mutedForeground"),
                      fontSize: "12px",
                    }}
                  >
                    {value}
                  </span>
                )}
              />
              <Bar
                yAxisId="left"
                name={translations.general.monthly}
                dataKey="monthlyRegistrations"
                fill={getChartColor("monthly")}
                fillOpacity={0.85}
                radius={[4, 4, 0, 0]}
                maxBarSize={25}
              />
              <Line
                yAxisId="right"
                name={translations.general.total}
                type="monotone"
                dataKey="totalDReps"
                stroke={getChartColor("total")}
                strokeWidth={2}
                dot={{
                  r: 4,
                  strokeWidth: 0.4,
                  fill: getChartColor("total"),
                  stroke: getChartColor("background"),
                }}
                activeDot={{
                  r: 6,
                  strokeWidth: 0.4,
                  fill: getChartColor("total"),
                  stroke: getChartColor("background"),
                }}
              />
              <Line
                yAxisId="right"
                name={translations.pageAnalytics.totalInactive}
                type="monotone"
                dataKey="inactiveDReps"
                stroke={getChartColor("inactive")}
                strokeWidth={2}
                dot={{
                  r: 4,
                  strokeWidth: 0.4,
                  fill: getChartColor("inactive"),
                  stroke: getChartColor("background"),
                }}
                activeDot={{
                  r: 6,
                  strokeWidth: 0.4,
                  fill: getChartColor("inactive"),
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
