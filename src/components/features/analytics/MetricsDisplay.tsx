"use client";
import React, { use } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Database, Vote, Award, Clock } from "lucide-react";
import { NetworkInfo, NetworkMetrics, NetworkStake } from "~/lib/analytics";
import { formatNumber, formatStake } from "./utils/formatters";
import { DRep } from "~/lib/dreps";
import { DRepStats } from "~/lib/drepStats";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { getMockMetrics } from "~/lib/mock";
import ComingSoon from "~/components/layout/ComingSoon";
import { ProfileStatus } from "../profile/ProfileStatus";
import { Dictionary } from "~/config/dictionaries";
import StakeDistributionGraph from "./StakeDistributionGraph";

interface MetricsDisplayProps {
  data: NetworkMetrics & NetworkInfo & NetworkStake;
  drepListPromise: Promise<{ elements: DRep[] }>;
  drepStatsPromise: Promise<DRepStats>;
  translations: Dictionary["general"];
}

const MetricsDisplay = ({
  data,
  drepListPromise,
  drepStatsPromise,
  translations,
}: MetricsDisplayProps) => {
  const drepList = use(drepListPromise)?.elements;
  const drepStats = use(drepStatsPromise);
  const isLoadingStats = !drepStats;

  const drepStatusData = React.useMemo(() => {
    if (!drepStats) {
      return [
        { name: "Active DReps", value: 0 },
        { name: "Inactive DReps", value: 0 },
        { name: "Retired DReps", value: 0 },
      ];
    }

    return [
      { name: "Active DReps", value: drepStats.active },
      { name: "Inactive DReps", value: drepStats.inactive },
      { name: "Retired DReps", value: drepStats.retired },
    ];
  }, [drepStats]);

  const totalDReps = drepStats?.total || 0;

  const mockData = getMockMetrics();
  const circulation = 35949488472 * 1e6;
  const epoch = data.epochNo;

  const chartColors = {
    dreps: "hsl(var(--chart-1))",
    spos: "hsl(var(--chart-2))",
    votingPowerAbstain: "hsl(var(--chart-1))",
    votingPowerNoConfidence: "hsl(var(--chart-2))",
    governanceAbstain: "hsl(var(--chart-2))",
    governanceNoConfidence: "hsl(var(--chart-3))",
    notTakingPart: "hsl(var(--muted))",
    activeDReps: "hsl(var(--chart-1))",
    inactiveDReps: "hsl(var(--chart-2))",
    retiredDReps: "hsl(var(--chart-3))",
  };

  const metrics = [
    { icon: <Users />, label: "Delegators", value: data.uniqueDelegators },
    {
      icon: <Database />,
      label: "Total DReps",
      value: data.totalRegisteredDReps,
    },
    { icon: <Vote />, label: "DRep Votes", value: data.totalDRepVotes },
    { icon: <Award />, label: "Active DReps", value: data.totalActiveDReps },
    {
      icon: <Clock />,
      label: "Gov Actions",
      value: data.totalGovernanceActions,
    },
  ];

  const votingPowerData = [
    {
      name: "Always Abstain",
      value: data.alwaysAbstainVotingPower,
      formatted: formatStake(data.alwaysAbstainVotingPower),
    },
    {
      name: "No Confidence",
      value: data.alwaysNoConfidenceVotingPower,
      formatted: formatStake(data.alwaysNoConfidenceVotingPower),
    },
  ];

  const notTakingPart =
    circulation -
    (data.totalStakeControlledByDReps +
      data.alwaysAbstainVotingPower +
      data.alwaysNoConfidenceVotingPower);

  const governanceData = [
    {
      name: "Not taking part in Governance",
      value: notTakingPart,
      percentage: ((notTakingPart / circulation) * 100).toFixed(2),
    },
    {
      name: "Active dReps",
      value: data.totalStakeControlledByDReps,
      percentage: ((data.totalStakeControlledByDReps / circulation) * 100).toFixed(2),
    },
    {
      name: "Always Abstain",
      value: data.alwaysAbstainVotingPower,
      percentage: ((data.alwaysAbstainVotingPower / circulation) * 100).toFixed(2),
    },
    {
      name: "No-Confidence",
      value: data.alwaysNoConfidenceVotingPower,
      percentage: ((data.alwaysNoConfidenceVotingPower / circulation) * 100).toFixed(2),
    },
  ];

  const tokenomicsData = [
    { position: "Circulation", amount: circulation },
    { position: "Treasury", amount: mockData.treasury },
    { position: "Reserves", amount: mockData.reserves },
    { position: "Rewards", amount: mockData.rewards },
    { position: "Deposits", amount: mockData.deposits },
  ];

  const epochMetricsData = [
    {
      item: "Total DReps",
      value: mockData.dashboard.metrics.totalDReps.value,
      change: mockData.dashboard.metrics.totalDReps.change,
    },
    {
      item: "Total Delegators",
      value: mockData.dashboard.metrics.totalDelegators.value,
      change: mockData.dashboard.metrics.totalDelegators.change,
    },
    {
      item: "New DReps",
      value: mockData.dashboard.metrics.newDReps.value,
      change: mockData.dashboard.metrics.newDReps.change,
    },
    {
      item: "New Delegators",
      value: mockData.dashboard.metrics.newDelegators.value,
      change: mockData.dashboard.metrics.newDelegators.change,
    },
    {
      item: "Delegation Rate",
      value: mockData.dashboard.metrics.delegationRate.value,
      change: mockData.dashboard.metrics.delegationRate.change,
    },
    {
      item: "Active Delegated",
      value: mockData.dashboard.metrics.activeDelegated.value,
      change: mockData.dashboard.metrics.activeDelegated.change,
    },
    {
      item: "Abstain/No Confidence",
      value: mockData.dashboard.metrics.abstainNoConfidence.value,
      change: mockData.dashboard.metrics.abstainNoConfidence.change,
    },
  ];

  const getGovernanceColor = (index: number) => {
    switch (index) {
      case 0:
        return chartColors.notTakingPart;
      case 1:
        return chartColors.activeDReps;
      case 2:
        return chartColors.governanceAbstain;
      case 3:
        return chartColors.governanceNoConfidence;
      default:
        return chartColors.notTakingPart;
    }
  };

  const getDRepStatusColor = (index: number) => {
    switch (index) {
      case 0:
        return chartColors.activeDReps;
      case 1:
        return chartColors.inactiveDReps;
      case 2:
        return chartColors.retiredDReps;
      default:
        return chartColors.notTakingPart;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-card text-card-foreground shadow-none">
            <CardContent className="p-6">
              <div className="flex gap-4 items-center">
                <div className="p-2 bg-primary/10 rounded-lg text-primary h-fit">
                  {React.cloneElement(metric.icon, { className: "h-5 w-5" })}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {formatNumber(metric.value)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <StakeDistributionGraph data={data} />
        <Card className="bg-card text-card-foreground shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Voting Power</h3>
            <div className="flex">
              <div className="h-32 flex-1">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={votingPowerData}
                      innerRadius="65%"
                      outerRadius="100%"
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {votingPowerData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            index === 0
                              ? chartColors.votingPowerAbstain
                              : chartColors.votingPowerNoConfidence
                          }
                          strokeWidth={0}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-4">
                {votingPowerData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            index === 0
                              ? chartColors.votingPowerAbstain
                              : chartColors.votingPowerNoConfidence,
                        }}
                      />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.formatted}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card className="bg-card text-card-foreground shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Governance Delegation </h3>
            <p className="text-sm text-muted-foreground mb-6">
              ADA taking part in Governance as of today by category in relation to the circulating
              supply of ADA on Cardano
            </p>
            <div className="flex">
              <div className="h-48 flex-1">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={governanceData} dataKey="value" startAngle={90} endAngle={-270}>
                      {governanceData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getGovernanceColor(index)}
                          strokeWidth={0}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-3">
                {governanceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getGovernanceColor(index) }}
                      />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">({item.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">DRep Status Distribution</h3>
            <ComingSoon>
              <p className="text-sm text-muted-foreground mb-6">
                Distribution of all registered DReps by their current status
              </p>
              {isLoadingStats ? (
                <div className="flex justify-center items-center h-48">
                  <p className="text-muted-foreground">Loading DRep statistics...</p>
                </div>
              ) : (
                <div className="flex">
                  <div className="h-48 flex-1">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={drepStatusData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          startAngle={90}
                          endAngle={-270}
                        >
                          {drepStatusData.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={getDRepStatusColor(index)}
                              strokeWidth={0}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 flex flex-col justify-center space-y-3">
                    {drepStatusData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: getDRepStatusColor(index),
                            }}
                          />
                          <span className="text-sm text-muted-foreground">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {formatNumber(item.value)}{" "}
                          {totalDReps > 0
                            ? `(${((item.value / totalDReps) * 100).toFixed(1)}%)`
                            : "(0%)"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ComingSoon>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card className="bg-card text-card-foreground shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Top 10 DReps</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                      DRep Name
                    </th>
                    <th className="text-center py-3 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-muted-foreground">
                      Voting Power
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {drepList?.slice(0, 10).map((drep, index) => (
                    <tr key={drep.drepId}>
                      <td className="py-4 text-sm text-foreground">{`${
                        index + 1
                      }º ${drep.givenName || "Anonymous DRep"}`}</td>
                      <td className="py-4 text-sm text-center">
                        <ProfileStatus drep={drep} translations={translations} />
                      </td>
                      <td className="py-4 text-sm text-right font-medium text-foreground">
                        ₳ {formatNumber(drep.votingPower)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Epoch {epoch} Metrics</h3>
            <ComingSoon>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                        #Item
                      </th>
                      <th className="text-center py-3 text-sm font-medium text-muted-foreground">
                        Epoch {epoch}
                      </th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">
                        Changed
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border">
                    {epochMetricsData.map((row) => {
                      const isError =
                        row.item === "Active Delegated" || row.item === "Abstain/No Confidence";

                      return (
                        <tr key={row.item}>
                          <td className="py-4 text-sm text-foreground">{row.item}</td>
                          <td className="py-4 text-sm text-center font-medium text-foreground">
                            {row.value}
                          </td>
                          <td
                            className={`py-4 text-sm text-right font-medium ${
                              isError
                                ? "text-red-500 dark:text-red-400"
                                : "text-green-500 dark:text-green-400"
                            }`}
                          >
                            {isError ? `-${row.change}` : `+${row.change}`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </ComingSoon>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card text-card-foreground shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Cardano Tokenomics </h3>
            <ComingSoon>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                      Position
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-muted-foreground">
                      Amount in ADA
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tokenomicsData.map((row) => (
                    <tr key={row.position} className="border-b border-border last:border-0">
                      <td className="py-4 text-sm text-foreground">{row.position}</td>
                      <td className="py-4 text-sm text-right font-medium text-foreground">
                        {formatNumber(row.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ComingSoon>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MetricsDisplay;
