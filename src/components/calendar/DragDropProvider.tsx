
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { createContext, useContext, useState, ReactNode } from 'react';

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate?: Date;
  color: string;
  description?: string;
  tags?: string[];
  timeSlot?: string;
  duration?: number;
  subtasks?: Subtask[];
}

interface DragDropContextType {
  tasks: Task[];
  updateTask: (id: string, updates: Partial<Task>) => void;
  moveTask: (taskId: string, destination: string) => void;
}

const TaskDragDropContext = createContext<DragDropContextType | undefined>(undefined);

interface DragDropProviderProps {
  children: ReactNode;
}

export function DragDropProvider({ children }: DragDropProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review project proposal',
      priority: 'high',
      completed: false,
      dueDate: new Date(),
      color: 'bg-red-500',
      description: 'Need to review the Q4 project proposal and provide feedback.',
      tags: ['Work', 'Urgent'],
      subtasks: [
        { id: 'sub1', title: 'Read proposal document', completed: true },
        { id: 'sub2', title: 'Schedule team meeting', completed: false }
      ]
    },
    {
      id: '2',
      title: 'Update team documentation',
      priority: 'medium',
      completed: true,
      dueDate: new Date(),
      color: 'bg-blue-500',
      description: 'Update the team documentation with latest procedures.',
      tags: ['Work', 'Documentation'],
      subtasks: [
        { id: 'sub3', title: 'Review current docs', completed: true },
        { id: 'sub4', title: 'Add new procedures', completed: true }
      ]
    },
    {
      id: '3',
      title: 'Schedule client follow-up',
      priority: 'low',
      completed: false,
      color: 'bg-green-500',
      description: 'Follow up with client about project status.',
      tags: ['Work', 'Client']
    }
  ]);

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const moveTask = (taskId: string, destination: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, timeSlot: destination } : task
    ));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const { draggableId, destination } = result;
    moveTask(draggableId, destination.droppableId);
  };

  return (
    <TaskDragDropContext.Provider value={{ tasks, updateTask, moveTask }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {children}
      </DragDropContext>
    </TaskDragDropContext.Provider>
  );
}

export function useDragDrop() {
  const context = useContext(TaskDragDropContext);
  if (!context) {
    throw new Error('useDragDrop must be used within DragDropProvider');
  }
  return context;
}
