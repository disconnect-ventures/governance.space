import { Link as LinkIcon } from "lucide-react";
import Link from "~/components/features/Link";
import { Markdown } from "../Markdown";
import { Separator } from "~/components/ui/separator";
import { BudgetDiscussion } from "~/lib/budgetDiscussions";
import { useMemo } from "react";
import { Dictionary } from "~/config/dictionaries";
import { cn } from "~/lib/utils";

interface BudgetDiscussionContentProps {
  discussion: BudgetDiscussion;
  translations: Dictionary;
}

export const BudgetDiscussionContent = ({
  discussion,
  translations,
}: BudgetDiscussionContentProps) => {
  const proposalDetails =
    discussion.attributes.bd_proposal_detail?.data.attributes;
  const costingDetails = discussion.attributes.bd_costing?.data.attributes;
  const psapbDetails = discussion.attributes.bd_psapb?.data.attributes;
  const ownershipDetails =
    discussion.attributes.bd_proposal_ownership?.data.attributes;
  const proposalLinks = useMemo(
    () =>
      discussion.attributes.bd_further_information?.data.attributes.proposal_links.filter(
        (l) => !!l.prop_link
      ) ?? [],
    [discussion]
  );

  const formatCurrency = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(Number(amount));
  };

  const currency =
    costingDetails?.preferred_currency.data?.attributes.currency_letter_code ??
    "USD";
  const formattedAmount = formatCurrency(
    costingDetails?.amount_in_preferred_currency ?? "0",
    currency
  );
  const formattedAdaAmount = Number(
    costingDetails?.ada_amount ?? 0
  ).toLocaleString();

  const InfoSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => {
    return (
      <div>
        <div key={title} className="pb-4 space-y-4">
          <h4 className="text-2xl text-foreground">{title}</h4>
          <Separator />
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Budget</span>
            <span className="font-medium">
              {formattedAmount} ({formattedAdaAmount} ADA)
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">ADA Rate</span>
            <span className="font-medium">
              ${costingDetails?.usd_to_ada_conversion_rate}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">
              Preferred Currency
            </span>
            <span className="font-medium">
              {
                costingDetails?.preferred_currency.data?.attributes
                  .currency_name
              }{" "}
              (
              {
                costingDetails?.preferred_currency.data?.attributes
                  .currency_letter_code
              }
              )
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Contract Type</span>
            <span className="font-medium">
              {
                proposalDetails?.contract_type_name.data.attributes
                  .contract_type_name
              }
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {[
          ["Description", proposalDetails?.proposal_description],
          ["Problem Statement", psapbDetails?.problem_statement],
          ["Proposal Benefit", psapbDetails?.proposal_benefit],
          [
            "Key Proposal Deliverables",
            proposalDetails?.key_proposal_deliverables,
          ],
          ["Cost Breakdown", costingDetails?.cost_breakdown],
          [
            "Resourcing & Duration",
            proposalDetails?.resourcing_duration_estimates,
          ],
          ["Experience", proposalDetails?.experience],
          ["Maintenance & Support", proposalDetails?.maintain_and_support],
          [
            "Supplementary Endorsement",
            psapbDetails?.supplementary_endorsement,
          ],
        ].map(([label, content]) => (
          <InfoSection key={label} title={label ?? ""}>
            <Markdown content={content ?? ""} />
          </InfoSection>
        ))}

        <InfoSection title="Roadmap Alignment">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["", psapbDetails?.explain_proposal_roadmap, "col-span-full"],
              [
                "Does your proposal align with any of the Intersect Committees?",
                psapbDetails?.committee_name.data.attributes.committee_name,
              ],
              [
                "Does this proposal align to the Product Roadmap and Roadmap Goals?",
                psapbDetails?.roadmap_name.data.attributes.roadmap_name,
              ],
            ]
              .filter(([, content]) => !!content)
              .map(([label, content, className], index) => (
                <div
                  key={`${label}-${index}`}
                  className={cn("pb-4 space-y-4", className)}
                >
                  {label && (
                    <h4 className="text-sm text-foreground mb-2">{label}</h4>
                  )}
                  <Markdown content={content ?? ""} />
                </div>
              ))}
          </div>
        </InfoSection>

        <InfoSection title="Administration and Auditing">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              [
                "Would you like Intersect to be your named Administrator, including acting as the auditor, as per the Cardano Constitution?",
                discussion.attributes.intersect_named_administrator
                  ? translations.general.yes
                  : translations.general.no,
              ],
            ]
              .filter(([, content]) => !!content)
              .map(([label, content, className], index) => (
                <div
                  key={`${label}-${index}`}
                  className={cn("pb-4 space-y-4", className)}
                >
                  <h4 className="text-sm text-foreground mb-2">{label}</h4>
                  <Markdown content={content ?? ""} />
                </div>
              ))}
          </div>
        </InfoSection>

        <InfoSection title="Ownership Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["Submitted On Behalf Of", ownershipDetails?.submited_on_behalf],
              ["Group Name", ownershipDetails?.group_name],
              ["Type of Group", ownershipDetails?.type_of_group],
              ["Social Handles", ownershipDetails?.social_handles],
            ]
              .filter(([, content]) => !!content)
              .map(([label, content, className], index) => (
                <div
                  key={`${label}-${index}`}
                  className={cn("pb-4 space-y-4", className)}
                >
                  <h4 className="text-sm text-foreground mb-2">{label}</h4>
                  <span className="text-muted-foreground">{content}</span>
                </div>
              ))}
          </div>
        </InfoSection>

        {proposalDetails?.key_dependencies && (
          <InfoSection title="Key Dependencies">
            <Markdown content={proposalDetails.key_dependencies} />
          </InfoSection>
        )}

        <InfoSection title="Supporting Links">
          <div className="space-y-3">
            {proposalLinks.length > 0 ? (
              proposalLinks.map(({ prop_link_text, prop_link, id }) => (
                <Link
                  key={id}
                  href={prop_link}
                  className="flex items-center gap-2 transition-colors hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkIcon className="w-4 h-4 text-primary" />
                  <span className="text-primary hover:text-primary/80">
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
        </InfoSection>
      </div>

      <div className="text-sm text-muted-foreground">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8">
          <div>
            <span className="mr-2">Created:</span>
            {new Date(discussion.attributes.createdAt).toLocaleDateString()}
          </div>
          <div>
            <span className="mr-2">Last updated:</span>
            {new Date(discussion.attributes.updatedAt).toLocaleDateString()}
          </div>
          <div>
            <span className="mr-2">ID:</span>
            {discussion.id}
          </div>
        </div>
      </div>
    </div>
  );
};
