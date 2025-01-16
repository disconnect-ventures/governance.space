import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export const ProposalIdentification = () => {
  return (
    <div className="space-y-4">
      <div>
        <span className="text-[#4B5563] font-bold">ID:</span>
        <br />
        <span className="text-[#4B5563] font-normal break-all">
          cdf14fed344ccccd344f36691fed51068f166afoef565f346f166
        </span>
      </div>

      <div className="w-full p-4 sm:p-6 flex items-start gap-4 bg-[#F9FAFB] rounded-lg">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src="https://avatars.githubusercontent.com/t/11181162?s=116&v=4" />
          <AvatarFallback>DV</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h3 className="font-medium truncate">Sarah Chen</h3>
          <p className="text-sm text-muted-foreground">Senior Governance Advisor</p>
        </div>
      </div>
    </div>
  );
};