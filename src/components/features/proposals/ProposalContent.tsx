import { Link as LinkIcon } from "lucide-react";
import Link from "~/components/features/Link";
import { Proposal } from "~/lib/proposals";
import { Markdown } from "../Markdown";
import { Separator } from "~/components/ui/separator";

interface ProposalContentProps {
  proposal: Proposal;
}

export const ProposalContent = ({ proposal }: ProposalContentProps) => {
  const { prop_rationale, prop_abstract, prop_motivation } =
    proposal.attributes.content.attributes;
  const proposalLinks = proposal.attributes.content.attributes.proposal_links;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {[
          ["Abstract", prop_abstract],
          ["Motivation", prop_motivation],
          ["Rational", prop_rationale],
        ].map(([label, link]) => (
          <div key={label} className="pb-4 space-y-4">
            <h3 className="text-2xl text-foreground">{label}</h3>
            <Separator />
            <Markdown content={link} />
          </div>
        ))}

        {proposalLinks.length ? (
          <div>
            <h3 className="font-medium mb-2">Supporting links</h3>
            <div className="space-y-3">
              {proposalLinks.map(({ prop_link_text, prop_link }, index) => (
                <Link
                  key={index}
                  href={prop_link}
                  className="flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <LinkIcon className="w-4 h-4 text-primary" />
                  <span className="text-primary hover:text-primary/80">
                    {prop_link_text}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
