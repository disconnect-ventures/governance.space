import { Dictionary } from "~/config/dictionaries";
import { getBudgetDiscussionPollById } from "~/lib/budgetDiscussions";
import { GovernanceVotingCard } from "../governance/GovernanceVotingCard";

type BudgetVotesProps = {
  discussionId: number;
  dictionary: Dictionary;
};

export async function BudgetVotes({
  dictionary,
  discussionId,
}: BudgetVotesProps) {
  const voteResponse = await getBudgetDiscussionPollById(discussionId);
  const data = voteResponse?.data[0];

  return data ? (
    <GovernanceVotingCard
      title={"Votes"}
      votes={{
        no: { count: data.attributes.poll_no },
        yes: { count: data.attributes.poll_yes },
        abstain: { count: 0 },
      }}
      threshold={0.51}
      translations={dictionary.general}
    />
  ) : null;
}
