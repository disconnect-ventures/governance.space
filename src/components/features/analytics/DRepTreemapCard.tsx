import React, { useCallback, useMemo } from "react";
import { Treemap, ResponsiveContainer, Tooltip, TooltipProps } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { use } from "react";
import { formatNumber } from "./utils/formatters";
import { AnalyticsDashboardProps } from "./AnalyticsDashboard";
import {
  TreemapDataPoint,
  getTop20DRepsByVotingPower,
  calculateTop20Percentage,
  prepareTreemapData,
  calculatePercentageOfTotal,
  getTruncatedDisplayName,
  calculateDynamicFontSize,
} from "~/lib/drepService";

const PowerConcentrationBar = ({ top20Percent }: { top20Percent: number }) => {
  return (
    <div className="mt-4 mb-6">
      <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
        <div
          className="bg-primary h-full"
          style={{ width: `${top20Percent}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>0%</span>
        <span>Top 20 DReps: {top20Percent}% of total voting power</span>
        <span>100%</span>
      </div>
    </div>
  );
};

type DRepTreemapCardProps = Pick<
  AnalyticsDashboardProps,
  "translations" | "drepVotingPowerDataPromise"
>;

type TreemapContentProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
  name: string;
};

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
      chart5: "hsl(var(--chart-5))",
      background: "hsl(var(--background))",
      muted: "hsl(var(--muted))",
      mutedForeground: "hsl(var(--muted-foreground))",
    }),
    []
  );

  const getChartColor = useCallback(
    (index: number) => {
      const colorNumber = (index % 5) + 1;
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

  // Enhanced treemap data with fill colors
  const enhancedTreemapData = useMemo(() => {
    return prepareTreemapData(top20Dreps).map((item, index) => ({
      ...item,
      fill: getChartColor(index),
    }));
  }, [top20Dreps, getChartColor]);

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
            <div className="flex justify-between items-center text-xs mt-2">
              <span className="text-muted-foreground">
                {translations.pageAnalytics?.votingPower || "Voting Power"}
                :{" "}
              </span>
              <span className="font-medium">{formatNumber(data.size)}</span>
            </div>
            <div className="flex justify-between items-center text-xs mt-1">
              <span className="text-muted-foreground">Share of Total: </span>
              <span className="font-medium text-primary">{percentage}% </span>
            </div>
          </div>
        );
      }
      return null;
    },
    [translations, drepList]
  );

  const TreemapCustomContent = useCallback(
    (props: TreemapContentProps) => {
      const { x, y, width, height, index, name } = props;

      // Simplified area calculation
      const rectArea = width * height;

      const rectElement = (
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: getChartColor(index || 0),
            stroke: chartColors.background,
            strokeWidth: 2,
            opacity: 0.85,
            cursor: "pointer",
          }}
        />
      );

      // Adjusted threshold for text display
      if (width < 40 || height < 30) {
        return <g>{rectElement}</g>;
      }

      const fontSize = calculateDynamicFontSize(rectArea);
      const displayText = getTruncatedDisplayName(
        name || "",
        width - 10,
        fontSize
      );

      return (
        <g>
          {rectElement}
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-background font-light"
            style={{
              fontSize: `${fontSize}px`,
              pointerEvents: "none",
              textShadow: "0 0 3px rgba(0,0,0,0.3)",
            }}
          >
            {displayText}
          </text>
        </g>
      );
    },
    [getChartColor, chartColors.background]
  );

  const cardTitle = "Top DReps by Voting Power";
  const concentrationDescription = "Voting power concentration";

  if (!drepList || drepList.length === 0) {
    return (
      <Card className="bg-card text-card-foreground shadow-none">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {cardTitle}
          </h3>
          <div className="h-80 flex items-center justify-center">
            <p className="text-muted-foreground">
              No voting power data available
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card text-card-foreground shadow-none flex flex-col">
      <CardContent className="p-6 flex flex-col grow">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {cardTitle}
        </h3>

        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">
            {concentrationDescription}
          </p>

          <div className="text-sm font-medium">
            <span className="text-primary">{top20Percentage}%</span> of power in
            top 20 DReps
          </div>
        </div>

        <PowerConcentrationBar top20Percent={top20Percentage} />

        <div className="w-full grow">
          {enhancedTreemapData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={enhancedTreemapData}
                dataKey="size"
                nameKey="name"
                stroke={chartColors.background}
                fill={chartColors.chart1}
                animationDuration={0}
                isAnimationActive={false}
                content={TreemapCustomContent as unknown as React.ReactElement}
              >
                <Tooltip content={<CustomTooltip />} />
              </Treemap>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">No data to display</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DRepTreemapCard;
