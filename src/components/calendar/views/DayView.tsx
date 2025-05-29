
import { format, isToday } from 'date-fns';
import { cn } from '@/lib/utils';

interface DayViewProps {
  currentDate: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onDateChange: (date: Date) => void;
}

export function DayView({ currentDate }: DayViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Mock events for the day
  const events = [
    { startHour: 9, duration: 1, title: 'Morning Standup', color: 'bg-blue-500' },
    { startHour: 11, duration: 2, title: 'Project Review', color: 'bg-green-500' },
    { startHour: 14, duration: 1, title: 'Client Meeting', color: 'bg-purple-500' },
    { startHour: 16, duration: 1.5, title: 'Team Sync', color: 'bg-orange-500' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-border/40 overflow-hidden">
      {/* Day header */}
      <div className="p-6 border-b border-border/40 bg-muted/30">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            {format(currentDate, 'EEEE')}
          </h2>
          <p className={cn(
            "text-lg",
            isToday(currentDate) ? "text-primary font-medium" : "text-muted-foreground"
          )}>
            {format(currentDate, 'MMMM d, yyyy')}
          </p>
        </div>
      </div>

      {/* Schedule */}
      <div className="max-h-[600px] overflow-y-auto">
        <div className="relative">
          {/* Time slots */}
          {hours.map((hour) => (
            <div key={hour} className="flex border-b border-border/20 hover:bg-muted/30 transition-colors">
              <div className="w-20 p-4 text-sm text-muted-foreground border-r border-border/40">
                {format(new Date().setHours(hour, 0, 0, 0), 'HH:mm')}
              </div>
              <div className="flex-1 min-h-[80px] p-2 relative">
                {/* Events for this hour */}
                {events
                  .filter(event => 
                    hour >= Math.floor(event.startHour) && 
                    hour < Math.ceil(event.startHour + event.duration)
                  )
                  .map((event, index) => {
                    const isStartHour = hour === Math.floor(event.startHour);
                    if (!isStartHour) return null;
                    
                    return (
                      <div
                        key={index}
                        className={cn(
                          "absolute left-2 right-2 rounded-lg p-3 text-white shadow-sm",
                          event.color
                        )}
                        style={{
                          height: `${event.duration * 80 - 8}px`,
                        }}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm opacity-90">
                          {format(new Date().setHours(event.startHour, 0, 0, 0), 'HH:mm')} - {' '}
                          {format(new Date().setHours(event.startHour + event.duration, 0, 0, 0), 'HH:mm')}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
