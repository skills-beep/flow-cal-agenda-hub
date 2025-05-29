
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Video, Bell } from 'lucide-react';
import { format } from 'date-fns';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
}

export function AddEventModal({ isOpen, onClose, selectedDate }: AddEventModalProps) {
  const [eventType, setEventType] = useState<'task' | 'meeting'>('task');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    color: 'blue',
    startTime: '09:00',
    endTime: '10:00',
    invitees: '',
    reminder: true,
    recurring: false,
    recurringType: 'weekly'
  });

  const colors = [
    { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
    { name: 'Green', value: 'green', class: 'bg-green-500' },
    { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
    { name: 'Red', value: 'red', class: 'bg-red-500' },
    { name: 'Orange', value: 'orange', class: 'bg-orange-500' },
    { name: 'Pink', value: 'pink', class: 'bg-pink-500' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating event:', { ...formData, eventType, date: selectedDate });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {eventType === 'task' ? <Calendar className="h-5 w-5" /> : <Users className="h-5 w-5" />}
            {eventType === 'task' ? 'Create New Task' : 'Schedule Meeting'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Type Toggle */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant={eventType === 'task' ? 'default' : 'outline'}
              onClick={() => setEventType('task')}
              size="sm"
            >
              Task
            </Button>
            <Button
              type="button"
              variant={eventType === 'meeting' ? 'default' : 'outline'}
              onClick={() => setEventType('meeting')}
              size="sm"
            >
              Meeting
            </Button>
          </div>

          {selectedDate && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </div>
            </div>
          )}

          {/* Basic Information */}
          <div className="grid gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder={eventType === 'task' ? 'Task title...' : 'Meeting title...'}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Add details..."
                rows={3}
              />
            </div>
          </div>

          {/* Task-specific fields */}
          {eventType === 'task' && (
            <div>
              <Label>Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Meeting-specific fields */}
          {eventType === 'meeting' && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="invitees">Invitees</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="invitees"
                    value={formData.invitees}
                    onChange={(e) => setFormData(prev => ({ ...prev, invitees: e.target.value }))}
                    placeholder="Add email addresses..."
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  <span className="text-sm">Add video call link</span>
                </div>
                <Switch />
              </div>
            </div>
          )}

          {/* Color Selection */}
          <div>
            <Label>Color</Label>
            <div className="flex gap-2 mt-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                  className={`w-8 h-8 rounded-full ${color.class} ${
                    formData.color === color.value ? 'ring-2 ring-offset-2 ring-primary' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="text-sm">Enable reminder</span>
              </div>
              <Switch
                checked={formData.reminder}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, reminder: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <span className="text-sm">Recurring event</span>
                {formData.recurring && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {formData.recurringType}
                  </Badge>
                )}
              </div>
              <Switch
                checked={formData.recurring}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, recurring: checked }))}
              />
            </div>

            {formData.recurring && (
              <Select value={formData.recurringType} onValueChange={(value) => setFormData(prev => ({ ...prev, recurringType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Integration Hints */}
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-sm font-medium mb-2">🔗 Integration Ready</h4>
            <p className="text-xs text-muted-foreground">
              This event can be synced with Google Calendar, Outlook, and other calendar services.
              Video calls can be automatically generated for Zoom, Teams, or Google Meet.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {eventType === 'task' ? 'Create Task' : 'Schedule Meeting'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
