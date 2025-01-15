// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=50-19626&t=GGJEhGlKd8rVords-4

import { Card, CardContent } from "~/components/ui/card";
import { DRep } from "~/lib/dreps";
import { Rating } from "../Rating";

type ProfileInfoProps = {
  drep: DRep;
};

export function ProfileInfo({}: ProfileInfoProps) {
  const ratings = {
    5: { count: 30 },
    4: { count: 20 },
    3: { count: 0 },
    2: { count: 5 },
    1: { count: 1 },
  };

  return (
    <Card>
      <CardContent>
        <Rating ratings={ratings} className="shadow-none border-none" />
      </CardContent>
    </Card>
  );
}
