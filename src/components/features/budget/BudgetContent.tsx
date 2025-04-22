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
            <span className="text-sm text-muted-foreground">
              {translations.pageBudgetDiscussionDetails.budget}
            </span>
            <span className="font-medium">
              {formattedAmount} ({formattedAdaAmount} {translations.general.ada}
              )
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">
              {translations.pageBudgetDiscussionDetails.adaRate}
            </span>
            <span className="font-medium">
              ${costingDetails?.usd_to_ada_conversion_rate}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">
              {translations.pageBudgetDiscussionDetails.preferredCurrency}
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
            <span className="text-sm text-muted-foreground">
              {translations.pageBudgetDiscussionDetails.contractType}
            </span>
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
          [
            translations.general.description,
            proposalDetails?.proposal_description,
          ],
          [
            translations.pageBudgetDiscussionDetails.problemStatement,
            psapbDetails?.problem_statement,
          ],
          [
            translations.pageBudgetDiscussionDetails.proposalBenefit,
            psapbDetails?.proposal_benefit,
          ],
          [
            translations.pageBudgetDiscussionDetails.keyProposalDeliverables,
            proposalDetails?.key_proposal_deliverables,
          ],
          [
            translations.pageBudgetDiscussionDetails.costBreakdown,
            costingDetails?.cost_breakdown,
          ],
          [
            translations.pageBudgetDiscussionDetails.resourcingAndDuration,
            proposalDetails?.resourcing_duration_estimates,
          ],
          [
            translations.pageBudgetDiscussionDetails.experience,
            proposalDetails?.experience,
          ],
          [
            translations.pageBudgetDiscussionDetails.maintenanceAndSupport,
            proposalDetails?.maintain_and_support,
          ],
          [
            translations.pageBudgetDiscussionDetails.supplementaryEndorsement,
            psapbDetails?.supplementary_endorsement,
          ],
        ].map(([label, content]) => (
          <InfoSection key={label} title={label ?? ""}>
            <Markdown content={content ?? ""} />
          </InfoSection>
        ))}

        <InfoSection
          title={translations.pageBudgetDiscussionDetails.roadmapAlignment}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["", psapbDetails?.explain_proposal_roadmap, "col-span-full"],
              [
                translations.pageBudgetDiscussionDetails
                  .alignIntersectCommittees,
                psapbDetails?.committee_name.data.attributes.committee_name,
              ],
              [
                translations.pageBudgetDiscussionDetails
                  .alignProductRoadmapAndRoadmapGoals,
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
                    <h4 className="text-sm text-muted-foreground mb-2">
                      {label}
                    </h4>
                  )}
                  <Markdown content={content ?? ""} />
                </div>
              ))}
          </div>
        </InfoSection>

        <InfoSection
          title={
            translations.pageBudgetDiscussionDetails.administrationAndAuditing
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              [
                translations.pageBudgetDiscussionDetails.namedAdministrator,
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
                  <h4 className="text-sm text-muted-foreground mb-2">
                    {label}
                  </h4>
                  <Markdown content={content ?? ""} />
                </div>
              ))}
          </div>
        </InfoSection>

        <InfoSection
          title={translations.pageBudgetDiscussionDetails.ownershipInformation}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              [
                translations.pageBudgetDiscussionDetails.submittedOnBehalfOf,
                ownershipDetails?.submited_on_behalf,
              ],
              [
                translations.pageBudgetDiscussionDetails.groupName,
                ownershipDetails?.group_name,
              ],
              [
                translations.pageBudgetDiscussionDetails.typeOfGroup,
                ownershipDetails?.type_of_group,
              ],
              [
                translations.pageBudgetDiscussionDetails.socialHandles,
                ownershipDetails?.social_handles,
              ],
            ]
              .filter(([, content]) => !!content)
              .map(([label, content, className], index) => (
                <div
                  key={`${label}-${index}`}
                  className={cn("pb-4 space-y-4", className)}
                >
                  <h4 className="text-sm text-muted-foreground mb-2">
                    {label}
                  </h4>
                  <span className="text-foreground">{content}</span>
                </div>
              ))}
          </div>
        </InfoSection>

        {proposalDetails?.key_dependencies && (
          <InfoSection
            title={translations.pageBudgetDiscussionDetails.keyDependencies}
          >
            <Markdown content={proposalDetails.key_dependencies} />
          </InfoSection>
        )}

        <InfoSection title={translations.general.supportingLinks}>
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
                  <LinkIcon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-primary hover:text-primary/80 break-all">
                    {prop_link_text || prop_link}
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
            <span className="mr-2">{translations.general.created}:</span>
            {new Date(discussion.attributes.createdAt).toLocaleDateString()}
          </div>
          <div>
            <span className="mr-2">{translations.general.updated}:</span>
            {new Date(discussion.attributes.updatedAt).toLocaleDateString()}
          </div>
          <div>
            <span className="mr-2">{translations.general.id}:</span>
            {discussion.id}
          </div>
        </div>
      </div>
    </div>
  );
};
