import {
  Home,
  Activity,
  BarChart3,
  Settings,
  Globe,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const TabsList = [
  { title: "Home", url: "/", icon: Home },
  { title: "Dashboard", url: "/dashboard", icon: Activity },
  { title: "Endpoints", url: "/endpoints", icon: Globe },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();

  const isCollapsed = state === "collapsed";

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-monitoring-success/20 text-monitoring-success font-medium border-r-2 border-monitoring-success"
      : "hover:bg-muted/50";

  return (
    <Sidebar collapsible="icon">
      {/* sidebar content */}
      <SidebarContent className="!overflow-visible">
        <div className="p-4 border-b relative">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-monitoring-primary" />
              <span className="font-bold text-lg">UptimeMonitor</span>
            </div>
          )}
          {isCollapsed && (
            <Activity className="h-6 w-6 text-monitoring-primary mx-auto" />
          )}
          <div
            className="ml-auto absolute -right-3 p-1 bg-gray-200 rounded-full overflow-hidden"
            onClick={toggleSidebar}
          >
            <ChevronLeftIcon
              className={cn(
                "w-4 h-4 rotate-0 transition-all transform duration-200 ease-in-out",
                state === "collapsed" && "rotate-180"
              )}
            />
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {TabsList.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavClass}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
