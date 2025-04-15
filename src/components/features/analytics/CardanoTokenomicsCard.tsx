import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "./utils/formatters";
import { useMemo } from "react";
import ComingSoon from "~/components/layout/ComingSoon";
import { getMockMetrics } from "~/lib/mock";
import { AnalyticsDashboardProps } from "./AnalyticsDashboard";

type CardanoTokenomicsCardProps = Pick<AnalyticsDashboardProps, "translations">;

const CardanoTokenomicsCard = ({
  translations,
}: CardanoTokenomicsCardProps) => {
  const circulation = 35949488472 * 1e6;
  const mockData = getMockMetrics();

  const tokenomicsData = useMemo(
    () => [
      { position: translations.pageAnalytics.circulation, amount: circulation },
      {
        position: translations.pageAnalytics.treasury,
        amount: mockData.treasury,
      },
      {
        position: translations.pageAnalytics.reserves,
        amount: mockData.reserves,
      },
      {
        position: translations.pageAnalytics.rewards,
        amount: mockData.rewards,
      },
      {
        position: translations.pageAnalytics.deposits,
        amount: mockData.deposits,
      },
    ],
    [mockData, circulation, translations]
  );

  return (
    <Card className="bg-card text-card-foreground shadow-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          {translations.pageAnalytics.tokenomics}
        </h3>
        <ComingSoon>
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
                  <td className="py-4 text-sm text-foreground">
                    {row.position}
                  </td>
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
  );
};
export default CardanoTokenomicsCard;
