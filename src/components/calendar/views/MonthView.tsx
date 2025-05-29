
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MonthViewProps {
  currentDate: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onDateChange: (date: Date) => void;
}

export function MonthView({ currentDate, selectedDate, onDateSelect }: MonthViewProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Mock events data
  const events = [
    { date: new Date(2024, 11, 15), title: 'Team Meeting', color: 'bg-blue-500' },
    { date: new Date(2024, 11, 20), title: 'Project Review', color: 'bg-green-500' },
    { date: new Date(2024, 11, 25), title: 'Client Call', color: 'bg-purple-500' },
  ];

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-border/40 overflow-hidden">
      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b border-border/40">
        {weekDays.map((day) => (
          <div key={day} className="p-4 text-sm font-medium text-muted-foreground text-center bg-muted/30">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isDayToday = isToday(day);

          return (
            <div
              key={index}
              className={cn(
                "min-h-[120px] border-r border-b border-border/20 p-2 transition-colors hover:bg-muted/50",
                !isCurrentMonth && "bg-muted/20 text-muted-foreground"
              )}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDateSelect(day)}
                className={cn(
                  "h-8 w-8 p-0 font-normal mb-1",
                  isDayToday && "bg-primary text-primary-foreground hover:bg-primary/90",
                  isSelected && !isDayToday && "bg-accent text-accent-foreground",
                  !isCurrentMonth && "text-muted-foreground"
                )}
              >
                {format(day, 'd')}
              </Button>

              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className={cn(
                      "text-xs p-1 rounded text-white truncate",
                      event.color
                    )}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
