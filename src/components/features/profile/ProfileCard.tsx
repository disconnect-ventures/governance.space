"use client";

import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DRep } from "~/lib/dreps";
import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { ArrowRightCircle, Copy, Star } from "lucide-react";

type ProfileCardProps = {
  drep: DRep;
};

export function ProfileCard({ drep }: ProfileCardProps) {
  function handleCopyDRepId() {
    navigator.clipboard.writeText(drep.drepId);
  }

  return (
    <Card className="w-full bg-white shadow-sm space-y-2">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex gap-8 py-4">
            <div className="relative w-12 h-12">
              <Avatar className="h-16 w-16">
                <AvatarImage src={drep.imageUrl ?? ""} />
                <AvatarFallback>
                  {drep.givenName?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{drep.givenName}</h2>
                <span className="text-yellow-400">
                  <Star></Star>
                </span>
              </div>

              <Badge
                variant="secondary"
                className="w-fit bg-green-100 text-green-800 hover:bg-green-100 rounded-full"
              >
                {drep.status}
              </Badge>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-start md:justify-end md:ml-auto">
            <Button variant="outline">Send message</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ArrowRightCircle />
              Delegate Voting Power
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="w-full flex flex-row items-center gap-2 text-sm text-gray-600 overflow-hidden">
          <span>DRep ID:</span>
          <span className="w-full sm:w-fit text-ellipsis overflow-hidden">
            {drep.drepId}
          </span>
          <button
            onClick={handleCopyDRepId}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        <p className="mt-4 text-gray-600 line-clamp-2">{drep.objectives}</p>
      </CardContent>
    </Card>
  );
}
