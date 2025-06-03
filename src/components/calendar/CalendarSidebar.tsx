import { useState } from 'react';
import { Calendar, Clock, List, Menu, X, Home, Users, Settings, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarFooter
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { DeveloperSection } from './DeveloperSection';

interface CalendarSidebarProps {
  currentView: 'month' | 'week' | 'day';
  onViewChange: (view: 'month' | 'week' | 'day') => void;
  isOpen: boolean;
  onToggle: () => void;
}

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'tasks', label: 'Tasks', icon: List },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const viewOptions = [
  { value: 'month' as const, label: 'Month View', icon: Calendar },
  { value: 'week' as const, label: 'Week View', icon: Clock },
  { value: 'day' as const, label: 'Day View', icon: List },
];

export const CalendarSidebar = ({ currentView, onViewChange, isOpen, onToggle }: CalendarSidebarProps) => {
  const [activeNavItem, setActiveNavItem] = useState('calendar');
  const [showDeveloperSection, setShowDeveloperSection] = useState(false);

  const handleNavItemClick = (itemId: string) => {
    setActiveNavItem(itemId);
    console.log(`Navigating to: ${itemId}`);
  };

  return (
    <>
      <Sidebar className={cn("transition-all duration-300", !isOpen && "w-0")}>
        <SidebarHeader className="border-b">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-semibold">Calendar App</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onToggle}
              className="h-8 w-8"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </SidebarHeader>

        <SidebarContent className="flex-1 overflow-y-auto">
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={activeNavItem === item.id}
                      onClick={() => handleNavItemClick(item.id)}
                      className={cn(
                        "w-full justify-start transition-colors",
                        activeNavItem === item.id && "bg-primary text-primary-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>View Options</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {viewOptions.map((option) => (
                  <SidebarMenuItem key={option.value}>
                    <SidebarMenuButton
                      isActive={currentView === option.value}
                      onClick={() => onViewChange(option.value)}
                      className={cn(
                        "w-full justify-start transition-colors",
                        currentView === option.value && "bg-accent text-accent-foreground"
                      )}
                    >
                      <option.icon className="h-4 w-4" />
                      <span>{option.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t">
          <div className="p-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => setShowDeveloperSection(true)}
            >
              <User className="h-4 w-4 mr-2" />
              Developer Info
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Developer Section Overlay */}
      {showDeveloperSection && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="relative bg-background rounded-lg max-w-md w-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={() => setShowDeveloperSection(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <DeveloperSection />
          </div>
        </div>
      )}
    </>
  );
};
