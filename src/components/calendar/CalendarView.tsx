
import { MonthView } from './views/MonthView';
import { WeekView } from './views/WeekView';
import { DayView } from './views/DayView';

interface CalendarViewProps {
  currentDate: Date;
  currentView: 'month' | 'week' | 'day';
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onDateChange: (date: Date) => void;
}

export function CalendarView({ 
  currentDate, 
  currentView, 
  selectedDate, 
  onDateSelect, 
  onDateChange 
}: CalendarViewProps) {
  const commonProps = {
    currentDate,
    selectedDate,
    onDateSelect,
    onDateChange,
  };

  switch (currentView) {
    case 'month':
      return <MonthView {...commonProps} />;
    case 'week':
      return <WeekView {...commonProps} />;
    case 'day':
      return <DayView {...commonProps} />;
    default:
      return <MonthView {...commonProps} />;
  }
}
