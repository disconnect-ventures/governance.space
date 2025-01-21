import { Calendar, Clock, Copy } from "lucide-react";
import {
  GovernanceSectionVoting,
  GovernanceSectionVotingProps,
} from "./GovernanceSectionVoting";
import { Progress } from "~/components/ui/progress";

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <GovernanceSectionVoting {...sposVotingData} />
        <GovernanceSectionVoting {...constitutionalCommitteeVotingData} />
        <GovernanceSectionVoting {...dRepsVotingData} />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-8 mt-6">
        <div className="w-full md:flex-1">
          <p className="mb-4 font-bold text-gray-600">Governance Action ID:</p>

          <div className="flex items-center gap-2 mb-8">
            <code className="text-xs sm:text-sm font-mono break-all">
              cef1e0b5b464244c0a285e659d65fe1d5159855866afde3b6259b88ff0#0
            </code>
            <button className="p-2 hover:bg-gray-100 rounded flex-shrink-0">
              <Copy className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-500 font-bold">Submitted:</span>
              <span className="text-[#4B5563]">31st Oct 2024</span>
              <span className="text-sm font-thin text-[#4B5563]">
                (Epoch 504)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Clock className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-500 font-bold">Expires:</span>
              <span className="text-[#4B5563]">30th Dec 2024</span>
              <span className="text-sm font-thin text-[#4B5563]">
                (Epoch 565)
              </span>
            </div>
          </div>
        </div>

        <div className="w-full md:flex-1">
          <p className="mb-4 font-bold text-gray-600">
            (CIP-129) Governance Action ID:
          </p>

          <div className="flex items-center gap-2 mb-8">
            <code className="text-xs sm:text-sm font-mono break-all">
              gov_action1emc7e07r4g4np2cvl3dge40mcakykdc3lcqqrfz8ce#0
            </code>
            <button className="p-2 hover:bg-gray-100 rounded flex-shrink-0">
              <Copy className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-600">Deadline</p>
              <span className="font-medium text-[#2563EB]">75 %</span>
            </div>
            <Progress value={75} className="h-2" color="#2563EB" />
          </div>
        </div>
      </div>
    </div>
  );
};
