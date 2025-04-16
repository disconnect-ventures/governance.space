import { Link as LinkIcon } from "lucide-react";
import Link from "~/components/features/Link";
import { Markdown } from "../Markdown";
import { Separator } from "~/components/ui/separator";
import { BudgetDiscussion } from "~/lib/budgetDiscussions";
import { useMemo } from "react";

interface BudgetDiscussionContentProps {
  discussion: BudgetDiscussion;
}

export const BudgetDiscussionContent = ({
  discussion,
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
          ["Roadmap Alignment", psapbDetails?.explain_proposal_roadmap],
          [
            "Supplementary Endorsement",
            psapbDetails?.supplementary_endorsement,
          ],
        ].map(([label, content]) => (
          <div key={label} className="pb-4 space-y-4">
            <h3 className="text-2xl text-foreground">{label}</h3>
            <Separator />
            {content && <Markdown content={content} />}
          </div>
        ))}
      </div>

      <div className="pb-4 space-y-4">
        <h3 className="text-2xl text-foreground">Ownership Information</h3>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-muted-foreground">
              Submitted On Behalf Of
            </span>
            <p className="font-medium">
              {ownershipDetails?.submited_on_behalf}
            </p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Group Name</span>
            <p className="font-medium">{ownershipDetails?.group_name}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Type of Group</span>
            <p className="font-medium">{ownershipDetails?.type_of_group}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">
              Social Handles
            </span>
            <p className="font-medium">{ownershipDetails?.social_handles}</p>
          </div>
        </div>
        {ownershipDetails?.key_info_to_identify_group && (
          <div>
            <span className="text-sm text-muted-foreground">
              Key Information
            </span>
            <p>{ownershipDetails.key_info_to_identify_group}</p>
          </div>
        )}
      </div>

      {proposalDetails?.key_dependencies && (
        <div className="pb-4 space-y-4">
          <h3 className="text-2xl text-foreground">Key Dependencies</h3>
          <Separator />
          <Markdown content={proposalDetails.key_dependencies} />
        </div>
      )}

      {proposalLinks.length > 0 && (
        <div className="pb-4 space-y-4">
          <h3 className="text-2xl text-foreground">Supporting Links</h3>
          <Separator />
          <div className="space-y-3">
            {proposalLinks.map(({ prop_link_text, prop_link, id }) => (
              <Link
                key={id}
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
      )}

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
