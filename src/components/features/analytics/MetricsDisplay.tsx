import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Database, Vote, Award, Clock } from "lucide-react";
import { MetricsData } from "~/lib/analytics";
import { formatNumber, formatStake } from "./utils/formatters";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DRep } from "~/lib/dreps";

interface MetricsDisplayProps {
  data: MetricsData;
  drepList: DRep[];
}

const MetricsDisplay = ({ data, drepList }: MetricsDisplayProps) => {
  const chartColors = {
    dreps: "hsl(var(--chart-1))",
    spos: "hsl(var(--chart-2))",
    votingPowerAbstain: "hsl(var(--chart-1))",
    votingPowerNoConfidence: "hsl(var(--chart-2))",
    governanceAbstain: "hsl(var(--chart-2))",
    governanceNoConfidence: "hsl(var(--chart-3))",
    notTakingPart: "hsl(var(--muted))",
    activeDReps: "hsl(var(--chart-1))",
  };

  const metrics = [
    { icon: <Users />, label: "Delegators", value: data.uniqueDelegators },
    { icon: <Database />, label: "Total DReps", value: data.totalRegisteredDReps },
    { icon: <Vote />, label: "DRep Votes", value: data.totalDRepVotes },
    { icon: <Award />, label: "Active DReps", value: data.totalActiveDReps },
    {
      icon: <Clock />,
      label: "Gov Actions",
      value: data.totalGovernanceActions,
    },
  ];

  const stakeData = [
    { name: "DReps", value: data.totalStakeControlledByDReps },
    { name: "SPOs", value: data.totalStakeControlledBySPOs },
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

  const notTakingPart = data.circulation - (data.dreps + data.alwaysAbstain + data.noConfidence);
  const governanceData = [
    {
      name: "Not taking part in Governance",
      value: notTakingPart,
      percentage: ((notTakingPart / data.circulation) * 100).toFixed(2),
    },
    {
      name: "Active dReps",
      value: data.dreps,
      percentage: ((data.dreps / data.circulation) * 100).toFixed(2),
    },
    {
      name: "Always Abstain",
      value: data.alwaysAbstain,
      percentage: ((data.alwaysAbstain / data.circulation) * 100).toFixed(2),
    },
    {
      name: "No-Confidence",
      value: data.noConfidence,
      percentage: ((data.noConfidence / data.circulation) * 100).toFixed(2),
    },
  ];

  const tokenomicsData = [
    { position: "Circulation", amount: data.circulation },
    { position: "Treasury", amount: data.treasury },
    { position: "Reserves", amount: data.reserves },
    { position: "Rewards", amount: data.rewards },
    { position: "Deposits", amount: data.deposits },
  ];

  const epochMetricsData = [
    {
      item: "Total DReps",
      value: data.dashboard.metrics.totalDReps.value,
      change: data.dashboard.metrics.totalDReps.change,
    },
    {
      item: "Total Delegators",
      value: data.dashboard.metrics.totalDelegators.value,
      change: data.dashboard.metrics.totalDelegators.change,
    },
    {
      item: "New DReps",
      value: data.dashboard.metrics.newDReps.value,
      change: data.dashboard.metrics.newDReps.change,
    },
    {
      item: "New Delegators",
      value: data.dashboard.metrics.newDelegators.value,
      change: data.dashboard.metrics.newDelegators.change,
    },
    {
      item: "Delegation Rate",
      value: data.dashboard.metrics.delegationRate.value,
      change: data.dashboard.metrics.delegationRate.change,
    },
    {
      item: "Active Delegated",
      value: data.dashboard.metrics.activeDelegated.value,
      change: data.dashboard.metrics.activeDelegated.change,
    },
    {
      item: "Abstain/No Confidence",
      value: data.dashboard.metrics.abstainNoConfidence.value,
      change: data.dashboard.metrics.abstainNoConfidence.change,
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

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-card shadow-none">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {React.cloneElement(metric.icon, { className: "h-5 w-5" })}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold mt-1">{formatNumber(metric.value)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card className="shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Stake Distribution</h3>
            <div className="h-32">
              <ResponsiveContainer>
                <BarChart data={stakeData} layout="vertical" margin={{ right: 80, left: 60 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    width={50}
                  />
                  <Bar
                    dataKey="value"
                    radius={4}
                    barSize={20}
                    label={{
                      position: "right",
                      formatter: formatStake,
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                      dx: 8,
                    }}
                  >
                    {stakeData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? chartColors.dreps : chartColors.spos}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Voting Power</h3>
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
                    <span className="text-sm font-medium">{item.formatted}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card className="shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Governance Delegation </h3>
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
                    <span className="text-sm font-medium">({item.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Cardano Tokenomics </h3>
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
                    <td className="py-4 text-sm">{row.position}</td>
                    <td className="py-4 text-sm text-right font-medium">
                      {formatNumber(row.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Top 10 DReps</h3>
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
                      <td className="py-4 text-sm">{`${index + 1}º ${drep.givenName || "Anonymous DRep"}`}</td>
                      <td className="py-4 text-sm text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            drep.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : drep.status === "Inactive"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {drep.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-right font-medium">
                        ₳ {formatNumber(drep.votingPower)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Epoch {data.dashboard.epoch} Metrics</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                      #Item
                    </th>
                    <th className="text-center py-3 text-sm font-medium text-muted-foreground">
                      Epoch {data.dashboard.epoch}
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
                    const isWarning = row.item === "Delegation Rate";

                    return (
                      <tr key={row.item}>
                        <td className="py-4 text-sm">{row.item}</td>
                        <td className="py-4 text-sm text-center font-medium">{row.value}</td>
                        <td
                          className={`py-4 text-sm text-right font-medium ${
                            isError ? "text-destructive" : "text-green-500"
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MetricsDisplay;
