import { Avatar, AvatarFallback } from "~/components/ui/avatar";

type ProposalIdentificationProps = {
  authorName: string;
  id: string;
};

export const ProposalIdentification = ({
  id,
  authorName,
}: ProposalIdentificationProps) => {
  return (
    <div className="space-y-4">
      <div className="space-x-2">
        <span className="text-muted-foreground font-bold">ID:</span>
        <span className="text-muted-foreground font-normal break-all">
          {id}
        </span>
      </div>
      <div className="w-full p-4 sm:p-6 flex items-start gap-4 bg-card rounded-lg border border-border">
        <Avatar className="h-8 w-8 shrink-0">
          {/* <AvatarImage src="https://avatars.githubusercontent.com/t/11181162?s=116&v=4" /> */}
          <AvatarFallback>{authorName.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h3 className="font-medium truncate">{authorName}</h3>
          {/* <p className="text-sm text-muted-foreground">
            Senior Governance Advisor
          </p> */}
        </div>
      </div>
    </div>
  );
};
