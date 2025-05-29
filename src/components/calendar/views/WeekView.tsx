
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface WeekViewProps {
  currentDate: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onDateChange: (date: Date) => void;
}

export function WeekView({ currentDate, selectedDate, onDateSelect }: WeekViewProps) {
  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Mock events
  const events = [
    { 
      date: new Date(2024, 11, 16), 
      startHour: 9, 
      duration: 2, 
      title: 'Team Meeting', 
      color: 'bg-blue-500' 
    },
    { 
      date: new Date(2024, 11, 18), 
      startHour: 14, 
      duration: 1, 
      title: 'Client Call', 
      color: 'bg-green-500' 
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-border/40 overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-8 border-b border-border/40">
        <div className="p-4 border-r border-border/40"></div>
        {days.map((day) => (
          <div key={day.toISOString()} className="p-4 text-center">
            <div className="text-sm text-muted-foreground">
              {format(day, 'EEE')}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDateSelect(day)}
              className={cn(
                "h-8 w-8 p-0 mt-1",
                isToday(day) && "bg-primary text-primary-foreground",
                selectedDate && isSameDay(day, selectedDate) && !isToday(day) && "bg-accent"
              )}
            >
              {format(day, 'd')}
            </Button>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="max-h-[600px] overflow-y-auto">
        <div className="grid grid-cols-8">
          {/* Time column */}
          <div className="border-r border-border/40">
            {hours.map((hour) => (
              <div key={hour} className="h-16 p-2 border-b border-border/20 text-xs text-muted-foreground">
                {format(new Date().setHours(hour, 0, 0, 0), 'HH:mm')}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((day) => (
            <div key={day.toISOString()} className="border-r border-border/40 relative">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="h-16 border-b border-border/20 hover:bg-muted/30 transition-colors"
                />
              ))}
              
              {/* Events */}
              {events
                .filter(event => isSameDay(event.date, day))
                .map((event, index) => (
                  <div
                    key={index}
                    className={cn(
                      "absolute left-1 right-1 rounded p-1 text-xs text-white",
                      event.color
                    )}
                    style={{
                      top: `${event.startHour * 64}px`,
                      height: `${event.duration * 64 - 4}px`,
                    }}
                  >
                    {event.title}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
