// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=50-19626&t=GGJEhGlKd8rVords-4
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { DRep } from "~/lib/dreps";
import { Rating } from "../Rating";
import { MailIcon, MapPinIcon, VoteIcon } from "lucide-react";
import { Badge } from "~/components/ui/badge";
// import Link from "~/components/features/Link";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "~/components/ui/tooltip";
// import { Comment } from "~/lib/comments";
import { formatVotingPower } from "~/lib/utils";
import { Dictionary } from "~/config/dictionaries";
import Link from "../Link";
import {
  getContactLinkIcon,
  DRepMetadataPayload,
  Metadata,
} from "~/lib/metadata";

type ProfileInfoProps = {
  drep: DRep;
  // comments: Array<Comment>;
  translations: Pick<Dictionary, "general" | "pageDreps" | "pageDrepsDetails">;
  metadata: Metadata<DRepMetadataPayload> | null;
};

export function ProfileInfo({
  drep,
  translations,
  metadata,
}: ProfileInfoProps) {
  const ratings = {
    5: { count: 30 },
    4: { count: 20 },
    3: { count: 0 },
    2: { count: 5 },
    1: { count: 1 },
  };

  const contactLinks =
    metadata?.metadata?.references
      ?.map((reference) => ({
        label: reference.label,
        icon: getContactLinkIcon(reference),
        value: reference.uri,
      }))
      .filter(({ value }) => !!value) ?? [];

  return (
    <div className="flex flex-col gap-4">
      <Card className="bg-card text-card-foreground">
        <CardContent className="pt-6 space-y-4">
          {[
            {
              label: translations.pageDreps.votingPower,
              value: (
                <Badge
                  key={"2"}
                  className="bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400 rounded-full"
                >
                  <span className="mr-1">₳</span>
                  {formatVotingPower(drep.votingPower ?? 0)}
                </Badge>
              ),
              icon: <VoteIcon className="h-4 w-4 text-muted-foreground" />,
            },
            // {
            //   label: "Delegators",
            //   value: "3,350",
            //   icon: <UsersIcon className="h-4 w-4 text-muted-foreground" />,
            // },
            // {
            //   label: (
            //     <>
            //       Influence Power
            //       <TooltipProvider delayDuration={300}>
            //         <Tooltip>
            //           <TooltipTrigger>
            //             <InfoIcon className="h-4 w-4 text-muted-foreground" />
            //           </TooltipTrigger>
            //           <TooltipContent className="bg-popover text-popover-foreground">
            //             <p>Percentage of total voting power</p>
            //           </TooltipContent>
            //         </Tooltip>
            //       </TooltipProvider>
            //     </>
            //   ),
            //   value: "2.54%",
            //   icon: <MessageSquareIcon className="h-4 w-4 text-muted-foreground" />,
            // },
            // {
            //   label: "Voting",
            //   value: "120",
            //   icon: <MegaphoneIcon className="h-4 w-4 text-muted-foreground" />,
            // },
          ].map(({ label, value, icon }, index) => (
            <div
              key={index}
              className="w-full flex justify-between items-center gap-8"
            >
              <span className="text-sm text-muted-foreground inline-flex items-center gap-2">
                {icon}
                {label}
              </span>
              <span className="font-medium text-ellipsis overflow-hidden text-foreground">
                {value}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {contactLinks.length > 0 && (
        <Card>
          <CardHeader className="text-foreground">
            {translations.pageDrepsDetails.contacts}
          </CardHeader>
          <CardContent>
            {contactLinks?.map(({ label, icon: Icon, value }, index) => (
              <Link
                key={index}
                href={value ?? "#"}
                className="w-full flex justify-start items-center gap-2 py-2 hover:bg-accent text-foreground hover:text-accent-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span>{label}</span>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      <Card className="bg-card text-card-foreground">
        <CardHeader className="text-foreground">
          {translations.pageDrepsDetails.info}
        </CardHeader>
        <CardContent className="space-y-3">
          {metadata?.metadata?.email && (
            <div className="text-sm">
              <span className="text-muted-foreground">
                <MailIcon className="inline h-4 w-4"></MailIcon> Email:
              </span>
              <span className="ml-2 text-foreground">
                {metadata?.metadata.email}
              </span>
            </div>
          )}
          <div className="text-sm">
            <span className="text-muted-foreground">
              <MapPinIcon className="inline h-4 w-4 mr-1"></MapPinIcon>{" "}
              {translations.pageDreps.registrationDate}:
            </span>
            <span className="ml-2 text-foreground">
              {new Date(drep.latestRegistrationDate).toLocaleDateString(
                translations.general.locale
              )}
            </span>
          </div>
        </CardContent>
      </Card>
      {/* <Card className="bg-card text-card-foreground">
        <CardHeader className="text-foreground">Supporting Links</CardHeader>
        <CardContent className="space-y-3">

          {[
            "Work Proposal Document",
            "Activity History",
            "Public Documents and Meetings",
            "Workflow Doc",
          ].map((label, index) => (
            <Link
              key={index}
              href="#"
              className="w-full flex justify-start gap-2 py-2 hover:bg-accent text-foreground hover:text-accent-foreground"
            >
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
              <span>{label}</span>
            </Link>
          ))}
        </CardContent>
      </Card> */}

      <Rating ratings={ratings} translations={translations.pageDrepsDetails} />
    </div>
  );
}
