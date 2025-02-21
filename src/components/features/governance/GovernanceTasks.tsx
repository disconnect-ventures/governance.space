import { SquareCheckBig } from "lucide-react";
import ComingSoon from "~/components/layout/ComingSoon";
import { CardContent } from "~/components/ui/card";

type Task = {
  description: string;
  completed: boolean;
};

interface GovernanceTasksProps {
  tasks: Task[];
}

export const GovernanceTasks = ({ tasks }: GovernanceTasksProps) => {
  return (
    <CardContent className="p-6 dark:bg-gray-800 dark:border-gray-700">
      <h2 className="mb-4 text-lg font-medium dark:text-gray-100">Tasks</h2>
      <ComingSoon>
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center gap-3 group transition-colors">
              <SquareCheckBig
                className={`${
                  task.completed
                    ? "text-green-500 dark:text-green-400"
                    : "text-gray-400 dark:text-gray-600"
                } transition-colors`}
                aria-hidden="true"
              />
              <span className="text-gray-500 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300 transition-colors">
                {task.description}
              </span>
            </div>
          ))}
        </div>
      </ComingSoon>
    </CardContent>
  );
};
