import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { DRep } from "~/lib/dreps";
import CopyToClipboard from "../CopyToClipboard";
import { Dictionary } from "~/config/dictionaries";
import { LinkIcon } from "lucide-react";
import Link from "../Link";

type ProfileBodyProps = {
  drep: DRep;
  translations: Pick<Dictionary, "general" | "pageDrepsDetails">;
};

export function ProfileBody({ drep, translations }: ProfileBodyProps) {
  const infoSections = [
    [translations.pageDrepsDetails.objectives, drep.objectives],
    [translations.pageDrepsDetails.motivations, drep.motivations],
    [translations.pageDrepsDetails.qualifications, drep.qualifications],
    [
      translations.pageDrepsDetails.paymentAddress,
      drep.paymentAddress ? (
        <span
          key={translations.pageDrepsDetails.paymentAddress}
          className="flex gap-2"
        >
          <span className="text-ellipsis overflow-hidden">
            {drep.paymentAddress}
          </span>
          {drep.paymentAddress && (
            <CopyToClipboard
              translations={translations.general}
              value={drep.paymentAddress}
            ></CopyToClipboard>
          )}
        </span>
      ) : null,
    ],
    [translations.pageDrepsDetails.metadataHash, drep.metadataHash],
    [
      translations.pageDrepsDetails.metadataUrl,
      drep.url ? (
        <Link
          key={translations.pageDrepsDetails.metadataUrl}
          href={drep.url}
          className="flex gap-2 text-primary hover:underline"
          target="_blank"
        >
          <span className="overflow-hidden text-ellipsis">{drep.url}</span>
          <LinkIcon className="h-4 inline pl-2"></LinkIcon>
        </Link>
      ) : null,
    ],
  ];

  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent className="flex flex-col gap-8">
        {infoSections.map(([label, text], index) => (
          <div className="space-y-2 w-full" key={index}>
            <h3 className="font-semibold">{label}</h3>
            <p className="text-ellipsis overflow-hidden">
              {text ?? (
                <span className="text-muted-foreground">
                  {translations.pageDrepsDetails.notProvided}
                </span>
              )}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
