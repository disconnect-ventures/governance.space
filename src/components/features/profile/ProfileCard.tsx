import { ArrowRightCircle } from "lucide-react";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DRep } from "~/lib/dreps";
import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import CopyToClipboard from "../CopyToClipboard";
import { Badge } from "~/components/ui/badge";
import clsx from "clsx";

type ProfileCardProps = {
  drep: DRep;
};

export const getDrepStatusBadge = (drep: DRep, className?: string) => {
  return (
    <Badge
      variant={drep.status === "Active" ? "default" : "secondary"}
      className={clsx(
        "w-fit",
        drep.status === "Active" && "bg-green-500/20 text-green-500",
        drep.status === "Retired" && "bg-yellow-500/20 text-yellow-500",
        drep.status === "Inactive" && "bg-red-500/20 text-red-500",
        className
      )}
    >
      {drep.status}
    </Badge>
  );
};

export function ProfileCard({ drep }: ProfileCardProps) {
  return (
    <Card className="w-full bg-card text-card-foreground shadow-sm space-y-2">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex gap-8 py-4">
            <div className="relative w-12 h-12">
              <Avatar className="h-16 w-16">
                <AvatarImage src={drep.imageUrl ?? ""} />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {drep.givenName?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">
                  {drep.givenName}
                </h2>
                {/* <span className="text-yellow-400">
                  <Star></Star>
                </span> */}
              </div>
              {getDrepStatusBadge(drep)}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-start md:justify-end md:ml-auto">
            <Button
              variant="outline"
              className="border-border text-foreground hover:bg-accent hover:text-accent-foreground"
              disabled
            >
              Send message
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              disabled
            >
              <ArrowRightCircle />
              Delegate Voting Power
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-row items-center gap-2 text-sm text-muted-foreground overflow-hidden">
          <span>DRep ID:</span>
          <span className="w-full sm:w-fit text-ellipsis overflow-hidden text-foreground">
            {drep.drepId}
          </span>
          <CopyToClipboard value={drep.drepId} />
        </div>
        <p className="mt-4 text-muted-foreground line-clamp-2">
          {drep.objectives}
        </p>
      </CardContent>
    </Card>
  );
}
