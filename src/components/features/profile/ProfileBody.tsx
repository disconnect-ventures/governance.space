// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=50-19626&t=GGJEhGlKd8rVords-4

import { Copy } from "lucide-react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { DRep } from "~/lib/dreps";

type ProfileBodyProps = {
  drep: DRep;
};

export function ProfileBody({ drep }: ProfileBodyProps) {
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent className="flex flex-col gap-8">
        {[
          ["Objectives", drep.objectives],
          ["Motivations", drep.motivations],
          ["Qualifications", drep.qualifications],
          [
            "Payment Address",
            <>
              <span>
                addr1q98p4n60dghz3c9ar9vnmne7ygp7a5sm8dcn4g282aak4cwpa4hsu40evhlp7ptq0zll5km9um87jskrduvcefy60pls8zl4sr
              </span>
              <Copy className="w-4 h-4 inline-block ml-2" />
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
