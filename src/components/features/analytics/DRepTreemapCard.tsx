import React, { useCallback, useMemo } from "react";
import { Treemap, ResponsiveContainer, Tooltip, TooltipProps } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { use } from "react";
import { formatAda, formatVotingPower } from "~/lib/utils";
import { AnalyticsDashboardProps } from "./AnalyticsDashboard";
import {
  TreemapDataPoint,
  getTop20DRepsByVotingPower,
  calculateTop20Percentage,
  prepareTreemapData,
  calculatePercentageOfTotal,
  getTruncatedDisplayName,
  calculateDynamicFontSize,
} from "~/lib/drepTreemap";

type DRepTreemapCardProps = Pick<
  AnalyticsDashboardProps,
  "translations" | "drepVotingPowerDataPromise"
>;

interface TreemapContentProps {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
  name: string;
  value: number;
}

const DRepTreemapCard = ({
  translations,
  drepVotingPowerDataPromise,
}: DRepTreemapCardProps) => {
  const drepList = use(drepVotingPowerDataPromise);

  const chartColors = useMemo(
    () => ({
      chart1: "hsl(var(--chart-1))",
      chart2: "hsl(var(--chart-2))",
      chart3: "hsl(var(--chart-3))",
      chart4: "hsl(var(--chart-4))",
      background: "hsl(var(--background))",
      muted: "hsl(var(--muted))",
      mutedForeground: "hsl(var(--muted-foreground))",
    }),
    []
  );

  const getChartColor = useCallback(
    (index: number) => {
      const colorNumber = (index % 4) + 1;
      return chartColors[`chart${colorNumber}` as keyof typeof chartColors];
    },
    [chartColors]
  );

  const top20Dreps = useMemo(
    () => getTop20DRepsByVotingPower(drepList),
    [drepList]
  );

  const top20Percentage = useMemo(
    () => calculateTop20Percentage(drepList, top20Dreps),
    [drepList, top20Dreps]
  );

  const enhancedTreemapData = useMemo(() => {
    return prepareTreemapData(top20Dreps).map((item, index) => ({
      ...item,
      fill: getChartColor(index),
    }));
  }, [top20Dreps, getChartColor]);

  const PowerConcentrationBar = ({
    top20Percent,
  }: {
    top20Percent: number;
  }) => {
    return (
      <div className="mt-4 mb-6">
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="bg-chart-1 h-full"
            style={{ width: `${top20Percent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0%</span>
          <span>
            {translations.pageAnalytics.votingPower} {top20Percent}%
          </span>
          <span>100%</span>
        </div>
      </div>
    );
  };

  const CustomTooltip = useCallback(
    ({ active, payload }: TooltipProps<number, string>) => {
      if (active && payload && payload.length) {
        const data = payload[0].payload as TreemapDataPoint & {
          fullName: string;
        };

        const percentage = calculatePercentageOfTotal(data.size, drepList);

        return (
          <div className="bg-popover p-3 rounded-md shadow-md border border-border">
            <p className="text-card-foreground font-semibold mb-1 text-sm">
              {data.fullName || data.name}
            </p>

            <dl className="text-xs">
              <div className="flex justify-between mt-2">
                <dt className="text-muted-foreground">
                  {translations.pageAnalytics?.votingPower}:
                </dt>
                <dd className="font-medium ml-2">
                  {formatAda(formatVotingPower(data.size))}
                </dd>
              </div>

              <div className="flex justify-between mt-1">
                <dt className="text-muted-foreground">
                  {translations.pageAnalytics.shareOfTotal}:
                </dt>
                <dd className="font-medium ml-2">{percentage}%</dd>
              </div>
            </dl>
          </div>
        );
      }
      return null;
    },
    [translations, drepList]
  );

  const TreemapCustomContent = useCallback(
    (props: TreemapContentProps) => {
      const { x, y, width, height, index, name, value } = props;
      const rectArea = width * height;
      const rectElement = (
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          className="brightness-95 dark:brightness-125"
          style={{
            fill: getChartColor(index || 0),
            stroke: chartColors.background,
          }}
        />
      );
      if (width < 40 || height < 30) {
        return <g>{rectElement}</g>;
      }

      const fontSize = Math.max(calculateDynamicFontSize(rectArea), 9);
      const percentageFontSize = Math.max(fontSize * 0.9, 8);

      const displayText = getTruncatedDisplayName(
        name || "",
        width - 10,
        fontSize
      );
      const percentage = calculatePercentageOfTotal(value, drepList);
      const percentageText = `${percentage}%`;

      const verticalOffset = fontSize * 0.8;

      return (
        <g>
          {rectElement}
          <text
            x={x + width / 2}
            y={y + height / 2 - verticalOffset}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-background font-medium"
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            {displayText}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + verticalOffset}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-background font-medium"
            style={{
              fontSize: `${percentageFontSize}px`,
            }}
          >
            {percentageText}
          </text>
        </g>
      );
    },
    [getChartColor, chartColors.background, drepList]
  );

  return (
    <Card className="bg-card text-card-foreground shadow-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {translations.pageAnalytics.drepTreemapTitle}
        </h3>

        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">
            <span className="text-chart-1 font-semibold">
              {top20Percentage}%
            </span>{" "}
            {translations.pageAnalytics.drepTreemapDesc}
          </p>
        </div>

        <PowerConcentrationBar top20Percent={top20Percentage} />

        <div className="h-[28rem] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={enhancedTreemapData}
              dataKey="size"
              nameKey="name"
              isAnimationActive={false}
              content={React.createElement(TreemapCustomContent)}
            >
              <Tooltip content={<CustomTooltip />} />
            </Treemap>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DRepTreemapCard;
