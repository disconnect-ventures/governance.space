// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=50-19796&t=GGJEhGlKd8rVords-4
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import { DRep } from "~/lib/dreps";

type CommentsProps = {
  drep: DRep;
};

export function Comments({}: CommentsProps) {
  return (
    <Card>
      <CardHeader>Comments</CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
