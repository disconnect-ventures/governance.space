import React from "react";
import { Card, CardContent } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  ArrowUpDown,
  Filter,
  Star,
  MessageSquare,
  Globe,
  Users,
  EyeIcon,
} from "lucide-react";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export type DRepsDirectoryProps = {
  dreps: Array<{
    avatarUrl: string;
    name: string;
    id: string;
    status: "Active" | "Inactive" | "Retired";
    votingPower: string;
    social: boolean;
    delegators: number;
    influencePower: string;
    voting: number;
    registrationDate: string;
  }>;
};

export const DRepsDirectory = ({ dreps }: DRepsDirectoryProps) => {
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Users className="h-6 w-6" />
            <h2 className="text-2xl font-bold">DReps Directory</h2>
            <Badge variant="secondary" className="bg-gray-100">
              259 registered DReps
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search DReps by name or ID"
              className="w-full"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <ArrowUpDown className="h-4 w-4" /> Sort
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>DRep name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Voting Power</TableHead>
              <TableHead>Social</TableHead>
              <TableHead>Delegators</TableHead>
              <TableHead>Influence Power</TableHead>
              <TableHead>Voting</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dreps?.map((drep) => (
              <TableRow key={drep.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={drep.avatarUrl} />
                      <AvatarFallback>
                        {drep.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{drep.name}</div>
                      <div className="text-sm text-gray-500">{drep.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={drep.status === "Active" ? "default" : "secondary"}
                    className={clsx(
                      drep.status === "Active" && "bg-green-100 text-green-800",
                      drep.status === "Retired" &&
                        "bg-yellow-100 text-yellow-800",
                      drep.status === "Inactive" && "bg-red-100 text-red-800"
                    )}
                  >
                    {drep.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-blue-600">
                  {drep.votingPower}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                    <Globe className="h-4 w-4 text-gray-400" />
                  </div>
                </TableCell>
                <TableCell>{drep.delegators}</TableCell>
                <TableCell>{drep.influencePower}</TableCell>
                <TableCell className="text-blue-600">{drep.voting}</TableCell>
                <TableCell>{drep.registrationDate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-gray-400" />
                    <Button variant="secondary" size="sm" className="gap-1">
                      <EyeIcon className="h-4 w-4" /> Details
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
