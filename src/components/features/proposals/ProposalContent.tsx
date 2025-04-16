import { Link as LinkIcon } from "lucide-react";
import Link from "~/components/features/Link";
import { Proposal } from "~/lib/proposals";
import { Markdown } from "../Markdown";
import { Separator } from "~/components/ui/separator";
import { useMemo } from "react";
import { Dictionary } from "~/config/dictionaries";

interface ProposalContentProps {
  proposal: Proposal;
  translations: Dictionary;
}

export const ProposalContent = ({
  proposal,
  translations,
}: ProposalContentProps) => {
  const { prop_rationale, prop_abstract, prop_motivation } =
    proposal.attributes.content.attributes;
  const proposalLinks = useMemo(
    () =>
      proposal.attributes.content.attributes.proposal_links.filter(
        (l) => !!l.prop_link
      ) ?? [],
    [proposal]
  );

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

        <div>
          <h3 className="font-medium mb-2">Supporting links</h3>
          <div className="space-y-3">
            {proposalLinks.length > 0 ? (
              proposalLinks.map(({ prop_link_text, prop_link }, index) => (
                <Link
                  key={index}
                  href={prop_link}
                  className="flex items-center gap-2 transition-colors hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkIcon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-primary hover:text-primary/80 break-all">
                    {prop_link_text}
                  </span>
                </Link>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">
                {translations.pageProposalsDetails.noSupportingLinks}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
