// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=50-19626&t=GGJEhGlKd8rVords-4
"use client";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { DRep } from "~/lib/dreps";
import CopyToClipboard from "../CopyToClipboard";
import { useTranslation } from "~/hooks/use-translation/use-translation";

type ProfileBodyProps = {
  drep: DRep;
};

export function ProfileBody({ drep }: ProfileBodyProps) {
  const {
    dictionary: { pageDrepsDetails },
  } = useTranslation();
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent className="flex flex-col gap-8">
        {[
          [pageDrepsDetails.objectives, drep.objectives],
          [pageDrepsDetails.motivations, drep.motivations],
          [pageDrepsDetails.qualifications, drep.qualifications],
          [
            pageDrepsDetails.paymentAddress,
            <>
              <span>{drep.paymentAddress}</span>
              <CopyToClipboard value={drep.paymentAddress ?? ""}></CopyToClipboard>
            </>,
          ],
        ].map(([label, text], index) => (
          <div className="space-y-2 w-full" key={index}>
            <h3 className="font-semibold">{label}</h3>
            <p className="text-ellipsis overflow-hidden">{text}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
