import { Card, CardContent } from "@/components/ui/card";
import { use, useMemo } from "react";
import { AnalyticsDashboardProps } from "./AnalyticsDashboard";
import { KoiosTokenomics } from "~/lib/koios";
import { formatAda, formatVotingPower } from "~/lib/utils";

type CardanoTokenomicsCardProps = {
  tokenomicsPromise: Promise<KoiosTokenomics[]>;
} & Pick<AnalyticsDashboardProps, "translations">;

const CardanoTokenomicsCard = ({
  translations,
  tokenomicsPromise,
}: CardanoTokenomicsCardProps) => {
  const [tokenomics] = use(tokenomicsPromise);

  const tokenomicsData = useMemo(
    () => [
      {
        position: translations.pageAnalytics.circulation,
        amount: Number(tokenomics?.circulation ?? -1),
      },
      {
        position: translations.pageAnalytics.treasury,
        amount: Number(tokenomics?.treasury ?? -1),
      },
      {
        position: translations.pageAnalytics.reserves,
        amount: Number(tokenomics?.reserves ?? -1),
      },
      {
        position: translations.pageAnalytics.rewards,
        amount: Number(tokenomics?.reward ?? -1),
      },
      {
        position: translations.pageAnalytics.deposits,
        amount: tokenomics
          ? Number(tokenomics?.deposits_stake) +
            Number(tokenomics?.deposits_drep) +
            Number(tokenomics?.deposits_proposal)
          : -1,
      },
    ],
    [tokenomics, translations]
  );

  return (
    <Card className="bg-card text-card-foreground shadow-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          {translations.pageAnalytics.tokenomics}
        </h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                {translations.pageAnalytics.position}
              </th>
              <th className="text-right py-3 text-sm font-medium text-muted-foreground">
                {translations.pageAnalytics.amountInAda}
              </th>
            </tr>
          </thead>
          <tbody>
            {tokenomicsData.map((row) => (
              <tr
                key={row.position}
                className="border-b border-border last:border-0"
              >
                <td className="py-4 text-sm text-foreground">{row.position}</td>
                <td className="py-4 text-sm text-right font-medium text-foreground">
                  {formatAda(formatVotingPower(row.amount))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};
export default CardanoTokenomicsCard;
