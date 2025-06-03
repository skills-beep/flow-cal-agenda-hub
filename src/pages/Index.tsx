import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CalendarSidebar } from '@/components/calendar/CalendarSidebar';
import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { CalendarView } from '@/components/calendar/CalendarView';
import { TaskPanel } from '@/components/calendar/TaskPanel';
import { FAB } from '@/components/calendar/FAB';
import { AddEventModal } from '@/components/calendar/AddEventModal';
import { TaskDetailsModal } from '@/components/calendar/TaskDetailsModal';
import { SearchAndFilter } from '@/components/calendar/SearchAndFilter';
import { ThemeProvider } from '@/components/calendar/ThemeProvider';
import { DragDropProvider, useDragDrop } from '@/components/calendar/DragDropProvider';
import { AnimatedBackground } from '@/components/calendar/AnimatedBackground';

const CalendarContent = () => {
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<any>({});

  const { tasks, updateTask } = useDragDrop();

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setIsTaskDetailsOpen(true);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    console.log('Search query:', query);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log('Filters:', newFilters);
  };

  const availableTags = ['Work', 'Personal', 'Urgent', 'Documentation', 'Client', 'Meeting'];

  return (
    <div className="min-h-screen flex w-full bg-background relative">
      <AnimatedBackground />
      
      <CalendarSidebar 
        currentView={currentView}
        onViewChange={setCurrentView}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <CalendarHeader 
          currentDate={currentDate}
          currentView={currentView}
          onDateChange={setCurrentDate}
          onViewChange={setCurrentView}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <SearchAndFilter
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          availableTags={availableTags}
        />
        
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 p-4">
            <CalendarView 
              currentDate={currentDate}
              currentView={currentView}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              onDateChange={setCurrentDate}
            />
          </div>
          
          <TaskPanel 
            selectedDate={selectedDate}
            onTaskAdd={() => setIsAddModalOpen(true)}
            onTaskClick={handleTaskClick}
          />
        </div>
      </div>
      
      <FAB onAdd={() => setIsAddModalOpen(true)} />
      
      <AddEventModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        selectedDate={selectedDate}
      />

      <TaskDetailsModal
        isOpen={isTaskDetailsOpen}
        onClose={() => setIsTaskDetailsOpen(false)}
        task={selectedTask}
        onUpdateTask={updateTask}
      />
    </div>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <DragDropProvider>
          <CalendarContent />
        </DragDropProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Index;
