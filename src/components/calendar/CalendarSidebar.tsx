
import { Calendar, List, Settings, Sun, Moon, Layout } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';

interface CalendarSidebarProps {
  currentView: 'month' | 'week' | 'day';
  onViewChange: (view: 'month' | 'week' | 'day') => void;
  isOpen: boolean;
  onToggle: () => void;
}

const navigationItems = [
  { title: 'Calendar View', icon: Calendar, key: 'calendar' },
  { title: 'Task List', icon: List, key: 'tasks' },
  { title: 'Dashboard', icon: Layout, key: 'dashboard' },
  { title: 'Settings', icon: Settings, key: 'settings' },
];

const viewItems = [
  { title: 'Month View', key: 'month' as const },
  { title: 'Week View', key: 'week' as const },
  { title: 'Day View', key: 'day' as const },
];

export function CalendarSidebar({ currentView, onViewChange, isOpen, onToggle }: CalendarSidebarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold">Calendar Pro</h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton className="w-full">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Calendar Views</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {viewItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton 
                    onClick={() => onViewChange(item.key)}
                    className={`w-full ${currentView === item.key ? 'bg-accent text-accent-foreground' : ''}`}
                  >
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Stats</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-3 p-2">
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="text-sm text-blue-600 dark:text-blue-400">Today's Tasks</div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">5</div>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="text-sm text-green-600 dark:text-green-400">Upcoming Meetings</div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">3</div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleTheme}
          className="w-full"
        >
          {theme === 'light' ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
