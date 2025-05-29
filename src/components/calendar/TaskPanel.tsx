
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate?: Date;
  color: string;
}

interface TaskPanelProps {
  selectedDate: Date | null;
  onTaskAdd: () => void;
}

export function TaskPanel({ selectedDate, onTaskAdd }: TaskPanelProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review project proposal',
      priority: 'high',
      completed: false,
      dueDate: new Date(),
      color: 'bg-red-500'
    },
    {
      id: '2',
      title: 'Update team documentation',
      priority: 'medium',
      completed: true,
      dueDate: new Date(),
      color: 'bg-blue-500'
    },
    {
      id: '3',
      title: 'Schedule client follow-up',
      priority: 'low',
      completed: false,
      color: 'bg-green-500'
    }
  ]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="w-80 border-l border-border/40 bg-background p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Tasks</h3>
        <Button size="sm" onClick={onTaskAdd}>
          <Plus className="h-4 w-4 mr-1" />
          Add Task
        </Button>
      </div>

      {selectedDate && (
        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {format(selectedDate, 'EEEE, MMM d')}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "p-3 rounded-lg border transition-all hover:shadow-sm",
              task.completed 
                ? "bg-muted/50 border-border/40" 
                : "bg-background border-border/60"
            )}
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="mt-1"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className={cn("w-2 h-2 rounded-full", task.color)} />
                  <p className={cn(
                    "text-sm font-medium",
                    task.completed && "line-through text-muted-foreground"
                  )}>
                    {task.title}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="secondary" 
                    className={cn("text-xs", getPriorityColor(task.priority))}
                  >
                    {task.priority}
                  </Badge>
                  
                  {task.dueDate && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {format(task.dueDate, 'MMM d')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-sm mb-2">Today's Progress</h4>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {tasks.filter(t => t.completed).length}/{tasks.length}
          </span>
        </div>
      </div>
    </div>
  );
}
