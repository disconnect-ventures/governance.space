import { Dictionary } from "~/config/dictionaries";
import { getBudgetDiscussionPollById } from "~/lib/budgetDiscussions";
import { VoteResults } from "../VoteResults";
import { Skeleton } from "~/components/ui/skeleton";

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

  const formatValue = (value: number) => {
    return value.toLocaleString();
  };

  if (!data) {
    return null;
  }
  return (
    <VoteResults
      title={dictionary.pageBudgetDiscussionDetails.pollResults}
      description={dictionary.pageBudgetDiscussionDetails.pollDescription}
      votes={{
        yes: { count: data.attributes.poll_yes },
        no: { count: data.attributes.poll_no },
        abstain: { count: 0, hide: true },
      }}
      threshold={0.51}
      formatValue={formatValue}
      translations={dictionary.general}
    />
  );
}

export function VoteResultsSkeleton() {
  return (
    <div className="border rounded-lg p-6 space-y-4 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-4 w-full max-w-md" />
      <div className="space-y-3 py-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex justify-between items-center p-3 border rounded-lg dark:border-gray-700"
          >
            <Skeleton className="h-5 w-24" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-16 rounded-full" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        ))}
      </div>
      <Skeleton className="h-3 w-full rounded-full mt-6" />
    </div>
  );
}
