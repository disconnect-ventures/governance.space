import {
  GovernanceSectionVoting,
  GovernanceSectionVotingProps,
} from "./GovernanceSectionVoting";

export const GovernaceVoting = () => {
  const sposVotingData: GovernanceSectionVotingProps = {
    title: "SPOS",
    votes: [
      { type: "yes", amount: 298123958.303 },
      { type: "no", amount: 107487.105 },
      { type: "abstain", amount: 4124.547 },
    ],
    threshold: 0.51,
    currentProgress: 72,
  };

  const constitutionalCommitteeVotingData: GovernanceSectionVotingProps = {
    title: "Constitutional Committee",
    votes: [
      { type: "yes", amount: 164543736.097 },
      { type: "no", amount: 98254.094 },
      { type: "abstain", amount: 1453.986 },
    ],
    threshold: 0.51,
    currentProgress: 72,
  };

  const dRepsVotingData: GovernanceSectionVotingProps = {
    title: "DReps",
    votes: [
      { type: "yes", amount: 154937453.163 },
      { type: "no", amount: 175986.543 },
      { type: "abstain", amount: 2098.123 },
    ],
    threshold: 0.51,
    currentProgress: 72,
  };

  return (
    <div className="m-8 bg-white">
      <h2 className="text-lg font-bold mb-6">
        Votes submitted for this Governance Action By:
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <GovernanceSectionVoting {...sposVotingData} />
        <GovernanceSectionVoting {...constitutionalCommitteeVotingData} />
        <GovernanceSectionVoting {...dRepsVotingData} />
      </div>
    </div>
  );
};
