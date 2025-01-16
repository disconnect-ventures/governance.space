import { Calendar, Clock } from "lucide-react";

export const ProposalTimeline = () => {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8 text-gray-700 mb-4">
      <div className="flex items-center gap-3">
        <Calendar
          className="w-6 h-6 text-gray-500 shrink-0"
          aria-label="Submission date icon"
        />
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
          <p className="font-medium text-gray-800">
            Submitted: <span className="font-normal">31st Oct 2024</span>
          </p>
          <p className="text-sm text-gray-500">(Epoch 504)</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Clock
          className="w-6 h-6 text-gray-500 shrink-0"
          aria-label="Expiry date icon"
        />
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
          <p className="font-medium text-gray-800">
            Expires: <span className="font-normal">30th Dec 2024</span>
          </p>
          <p className="text-sm text-gray-500">(Epoch 565)</p>
        </div>
      </div>
    </div>
  );
};
