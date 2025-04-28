import { useState } from "react";
import { tasks as initialTasks } from "@/data/mockData";
import { Task, TaskStatus, TaskPriority, TaskCategory } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Check, Clock, X, AlertTriangle } from "lucide-react";
import { formatDate } from "@/lib/formatters";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  
  const getPriorityIcon = (priority: TaskPriority | undefined) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case TaskPriority.MEDIUM:
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case TaskPriority.LOW:
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };
  
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
  
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.OPEN:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case TaskStatus.IN_PROGRESS:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case TaskStatus.COMPLETED:
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case TaskStatus.CANCELLED:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "";
    }
  };
  
  const filterTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };
  
  const markTaskAsComplete = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: TaskStatus.COMPLETED } : task
    ));
  };
  
  const markTaskAsInProgress = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: TaskStatus.IN_PROGRESS } : task
    ));
  };
  
  const cancelTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: TaskStatus.CANCELLED } : task
    ));
  };
  
  const renderTaskList = (filteredTasks: Task[]) => {
    if (filteredTasks.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No tasks found</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <Card key={task.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{task.title}</h3>
                    {task.priority && (
                      <Badge variant="outline" className={getPriorityColor(task.priority)}>
                        {getPriorityIcon(task.priority)}
                        <span className="ml-1">{task.priority}</span>
                      </Badge>
                    )}
                    <Badge variant="outline" className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </div>
                  {task.description && (
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  )}
                  {task.dueDate && (
                    <p className="text-xs text-muted-foreground">Due: {formatDate(task.dueDate)}</p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {task.status === TaskStatus.OPEN && (
                    <Button size="sm" variant="outline" onClick={() => markTaskAsInProgress(task.id)}>
                      Start
                    </Button>
                  )}
                  {(task.status === TaskStatus.OPEN || task.status === TaskStatus.IN_PROGRESS) && (
                    <Button size="sm" variant="default" onClick={() => markTaskAsComplete(task.id)}>
                      Complete
                    </Button>
                  )}
                  {task.status !== TaskStatus.CANCELLED && task.status !== TaskStatus.COMPLETED && (
                    <Button size="sm" variant="destructive" onClick={() => cancelTask(task.id)}>
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and track property-related tasks
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
      
      <Tabs defaultValue="open">
        <TabsList>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="open" className="mt-4">
          {renderTaskList(filterTasksByStatus(TaskStatus.OPEN))}
        </TabsContent>
        <TabsContent value="in-progress" className="mt-4">
          {renderTaskList(filterTasksByStatus(TaskStatus.IN_PROGRESS))}
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          {renderTaskList(filterTasksByStatus(TaskStatus.COMPLETED))}
        </TabsContent>
        <TabsContent value="cancelled" className="mt-4">
          {renderTaskList(filterTasksByStatus(TaskStatus.CANCELLED))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tasks;