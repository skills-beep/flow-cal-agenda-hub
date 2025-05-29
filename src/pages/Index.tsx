
import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CalendarSidebar } from '@/components/calendar/CalendarSidebar';
import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { CalendarView } from '@/components/calendar/CalendarView';
import { TaskPanel } from '@/components/calendar/TaskPanel';
import { FAB } from '@/components/calendar/FAB';
import { AddEventModal } from '@/components/calendar/AddEventModal';
import { ThemeProvider } from '@/components/calendar/ThemeProvider';

const Index = () => {
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <CalendarSidebar 
            currentView={currentView}
            onViewChange={setCurrentView}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <CalendarHeader 
              currentDate={currentDate}
              currentView={currentView}
              onDateChange={setCurrentDate}
              onViewChange={setCurrentView}
              onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
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
              />
            </div>
          </div>
          
          <FAB onAdd={() => setIsAddModalOpen(true)} />
          
          <AddEventModal 
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            selectedDate={selectedDate}
          />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Index;
