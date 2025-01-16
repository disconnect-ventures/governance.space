import { Calendar, Clock } from "lucide-react";

export const ProposalTimeline = () => {
  return (
    <div className="flex gap-8 text-gray-600 mb-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-gray-400" />
        <div>
          <span className="font-medium mr-2">Submitted:</span>
          <span>31st Oct 2024</span>
          <span className="text-gray-400 ml-1">(Epoch 504)</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-gray-400" />
        <div>
          <span className="font-medium mr-2">Expires:</span>
          <span>30th Dec 2024</span>
          <span className="text-gray-400 ml-1">(Epoch 565)</span>
        </div>
      </div>
    </div>
  );
};