import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { Proposal } from "~/lib/proposals";

interface ProposalContentProps {
  proposal: Proposal;
}

export const ProposalContent = ({ proposal }: ProposalContentProps) => {
  const { prop_rationale, prop_abstract, prop_motivation } =
    proposal.attributes.content.attributes;

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

        <div>
          <h3 className="font-medium mb-2">Supporting links</h3>
          <div className="space-y-3">
            {[
              "Documentação de Governança",
              "Histórico de Propostas",
              "Discussão no Fórum",
            ].map((label, index) => (
              <Link
                key={index}
                href="#"
                className="flex items-center gap-2 transition-colors"
              >
                <LinkIcon className="w-4 h-4 text-indigo-500" />
                <span className="text-indigo-600">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
