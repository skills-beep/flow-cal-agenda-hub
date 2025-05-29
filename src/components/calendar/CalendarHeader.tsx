
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, Search, Menu } from 'lucide-react';
import { format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns';

interface CalendarHeaderProps {
  currentDate: Date;
  currentView: 'month' | 'week' | 'day';
  onDateChange: (date: Date) => void;
  onViewChange: (view: 'month' | 'week' | 'day') => void;
  onToggleSidebar: () => void;
}

export function CalendarHeader({ 
  currentDate, 
  currentView, 
  onDateChange, 
  onViewChange,
  onToggleSidebar 
}: CalendarHeaderProps) {
  const navigateDate = (direction: 'prev' | 'next') => {
    let newDate: Date;
    
    if (direction === 'prev') {
      switch (currentView) {
        case 'month':
          newDate = subMonths(currentDate, 1);
          break;
        case 'week':
          newDate = subWeeks(currentDate, 1);
          break;
        case 'day':
          newDate = subDays(currentDate, 1);
          break;
      }
    } else {
      switch (currentView) {
        case 'month':
          newDate = addMonths(currentDate, 1);
          break;
        case 'week':
          newDate = addWeeks(currentDate, 1);
          break;
        case 'day':
          newDate = addDays(currentDate, 1);
          break;
      }
    }
    
    onDateChange(newDate);
  };

  const getDateFormat = () => {
    switch (currentView) {
      case 'month':
        return 'MMMM yyyy';
      case 'week':
        return 'MMM dd, yyyy';
      case 'day':
        return 'EEEE, MMM dd, yyyy';
      default:
        return 'MMMM yyyy';
    }
  };

  return (
    <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigateDate('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="min-w-[200px] text-center">
              <h1 className="text-xl font-semibold">
                {format(currentDate, getDateFormat())}
              </h1>
            </div>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigateDate('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => onDateChange(new Date())}
              className="ml-2"
            >
              Today
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search events, tasks..." 
              className="pl-10 w-64"
            />
          </div>
          
          <div className="flex bg-muted rounded-lg p-1">
            {(['month', 'week', 'day'] as const).map((view) => (
              <Button
                key={view}
                variant={currentView === view ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewChange(view)}
                className="capitalize"
              >
                {view}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
