// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=50-19626&t=GGJEhGlKd8rVords-4
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { DRep } from "~/lib/dreps";
import CopyToClipboard from "../CopyToClipboard";
import { Dictionary } from "~/config/dictionaries";
import { LinkIcon } from "lucide-react";
import Link from "../Link";

type ProfileBodyProps = {
  drep: DRep;
  translations: Dictionary["pageDrepsDetails"];
};

export function ProfileBody({ drep, translations }: ProfileBodyProps) {
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent className="flex flex-col gap-8">
        {[
          [translations.objectives, drep.objectives],
          [translations.motivations, drep.motivations],
          [translations.qualifications, drep.qualifications],
          [
            translations.paymentAddress,
            <span key={translations.paymentAddress} className="flex gap-2">
              <span className="text-ellipsis overflow-hidden">
                {drep.paymentAddress}
              </span>
              <CopyToClipboard
                value={drep.paymentAddress ?? ""}
              ></CopyToClipboard>
            </span>,
          ],
          [translations.metadataHash, drep.metadataHash],
          [
            translations.metadataUrl,
            <Link
              key={translations.metadataUrl}
              href={drep.url}
              className="flex gap-2 text-primary hover:underline"
              target="_blank"
            >
              <span className="overflow-hidden text-ellipsis">{drep.url}</span>
              <LinkIcon className="h-4 inline pl-2"></LinkIcon>
            </Link>,
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
