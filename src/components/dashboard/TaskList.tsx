import { Task, TaskPriority } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatters";

interface TaskListProps {
  tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  const getPriorityColor = (priority: TaskPriority | undefined) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case TaskPriority.MEDIUM:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case TaskPriority.LOW:
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
              <div>
                <h4 className="font-medium">{task.title}</h4>
                {task.description && (
                  <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                )}
                {task.dueDate && (
                  <p className="text-xs text-muted-foreground mt-1">Due: {formatDate(task.dueDate)}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {task.priority && (
                  <Badge variant="outline" className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                )}
                <Badge variant="outline">{task.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;