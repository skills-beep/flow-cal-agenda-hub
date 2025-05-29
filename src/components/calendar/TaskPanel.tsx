
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Clock, Calendar, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDragDrop } from './DragDropProvider';

interface TaskPanelProps {
  selectedDate: Date | null;
  onTaskAdd: () => void;
  onTaskClick?: (task: any) => void;
}

export function TaskPanel({ selectedDate, onTaskAdd, onTaskClick }: TaskPanelProps) {
  const { tasks, updateTask } = useDragDrop();

  const toggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
    }
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

      <Droppable droppableId="task-panel">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={cn(
                      "p-3 rounded-lg border transition-all hover:shadow-sm cursor-pointer",
                      task.completed 
                        ? "bg-muted/50 border-border/40" 
                        : "bg-background border-border/60",
                      snapshot.isDragging && "shadow-lg rotate-2"
                    )}
                    onClick={() => onTaskClick?.(task)}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={(e) => {
                          e.stopPropagation();
                          toggleTask(task.id);
                        }}
                        className="mt-1"
                        onClick={(e) => e.stopPropagation()}
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
                          {task.description && (
                            <FileText className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 flex-wrap">
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

                          {task.tags?.slice(0, 2).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {task.tags && task.tags.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{task.tags.length - 2}
                            </span>
                          )}
                        </div>

                        {task.subtasks && task.subtasks.length > 0 && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            {task.subtasks.filter(s => s.completed).length}/{task.subtasks.length} subtasks
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-sm mb-2">Today's Progress</h4>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length) * 100 : 0}%` }}
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
