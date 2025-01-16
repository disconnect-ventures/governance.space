import { Badge } from "~/components/ui/badge";
import { Eye, MessageSquare } from "lucide-react";

export const ProposalHeader = () => {
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <Badge variant="secondary" className="text-sm bg-[#C5D0EC] color-black">
          Hard Fork
        </Badge>
        <span className="text-sm text-muted-foreground">
          Governance Action Type
        </span>
        <Badge className="text-sm ml-auto bg-green-100 text-green-800">
          Active
        </Badge>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">
        Implementation of Quarterly Community Reviews
      </h2>

      <div className="flex items-center gap-4 mb-4">
        <Badge className="text-sm bg-[#F3E8FF] text-[#6B21A8]">
          Community Governance
        </Badge>
        <div className="flex items-center gap-1.5">
          <Eye />
          <span className="text-sm">1234</span>
          <MessageSquare />
          <span className="text-sm">45</span>
        </div>
      </div>
    </div>
  );
};