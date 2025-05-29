
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FABProps {
  onAdd: () => void;
}

export function FAB({ onAdd }: FABProps) {
  return (
    <Button
      onClick={onAdd}
      size="lg"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 z-50"
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
}
