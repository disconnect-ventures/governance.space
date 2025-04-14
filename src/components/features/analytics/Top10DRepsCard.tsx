import { Card, CardContent } from "@/components/ui/card";
import { ProfileStatus } from "../profile/ProfileStatus";
import { formatNumber } from "./utils/formatters";
import { use } from "react";
import { AnalyticsDashboardProps } from "./AnalyticsDashboard";

type Top10DRepsCardProps = Pick<
  AnalyticsDashboardProps,
  "drepListPromise" | "translations"
>;

const Top10DRepsCard = ({
  drepListPromise,
  translations,
}: Top10DRepsCardProps) => {
  const drepList = use(drepListPromise)?.elements;

  return (
    <Card className="bg-card text-card-foreground shadow-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          {translations.pageAnalytics.topDreps}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                  {translations.pageAnalytics.drepName}
                </th>
                <th className="text-center py-3 text-sm font-medium text-muted-foreground">
                  {translations.general.status}
                </th>
                <th className="text-right py-3 text-sm font-medium text-muted-foreground">
                  {translations.pageAnalytics.votingPower}
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
                    <ProfileStatus
                      drep={drep}
                      translations={translations.general}
                    />
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
  );
};
export default Top10DRepsCard;
