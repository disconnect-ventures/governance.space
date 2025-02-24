import { Link as LinkIcon } from "lucide-react";
import Link from "~/components/features/Link";
import { Proposal } from "~/lib/proposals";

interface ProposalContentProps {
  proposal: Proposal;
}

export const ProposalContent = ({ proposal }: ProposalContentProps) => {
  const { prop_rationale, prop_abstract, prop_motivation } =
    proposal.attributes.content.attributes;
  const proposalLinks = proposal.attributes.content.attributes.proposal_links;

  return (
    <div className="space-y-6">
      <div>
        {[
          ["Abstract", prop_abstract],
          ["Motivation", prop_motivation],
          ["Rational", prop_rationale],
        ].map(([label, link]) => (
          <div key={label}>
            <h3 className="font-medium mb-2">{label}</h3>
            <p className="text-muted-foreground mb-4">{link}</p>
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
                  className="flex items-center gap-2 transition-colors"
                >
                  <LinkIcon className="w-4 h-4 text-indigo-500" />
                  <span className="text-indigo-600">{prop_link_text}</span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
