"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { 
  Coffee, 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  Link2, 
  Settings,
  PanelLeft
} from "lucide-react";

const navigation = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Toast Integration",
    url: "/toast",
    icon: Link2,
  },
];

interface SidebarNavProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function SidebarNav({ isCollapsed, onToggle }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className={cn(
      "h-full flex flex-col transition-all duration-700 ease-out",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="border-b p-4">
        <div className={cn(
          "flex items-center space-x-2 transition-all duration-700 ease-out",
          isCollapsed ? "justify-center" : ""
        )}>
          <Coffee className="h-8 w-8 text-primary flex-shrink-0" style={{
            transform: isCollapsed ? 'translateX(2px) scale(1.05)' : 'translateX(0px) scale(1)',
            transition: 'all 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }} />
          {!isCollapsed && (
            <div className="flex flex-col transition-all duration-700 ease-out" style={{
              transform: isCollapsed ? 'translateX(-8px) scale(0.95)' : 'translateX(0px) scale(1)',
              opacity: isCollapsed ? 0 : 1,
              transitionDelay: isCollapsed ? '0ms' : '200ms'
            }}>
              <span className="text-lg font-bold text-foreground">SmartPricing</span>
              <span className="text-xs text-muted-foreground">Coffee Shop POS</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {!isCollapsed && (
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 transition-all duration-300 ease-out">
              Navigation
            </div>
          )}
          <div className="space-y-1">
            {navigation.map((item, index) => (
              <Link
                key={item.title}
                href={item.url}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-700 ease-out w-full group",
                  pathname === item.url 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  isCollapsed ? "justify-end px-1" : ""
                )}
                title={isCollapsed ? item.title : undefined}
                style={{
                  transform: isCollapsed ? 'translateX(8px) scale(0.98)' : 'translateX(0px) scale(1)',
                  transitionDelay: `${index * 120}ms`
                }}
              >
                <item.icon className={cn(
                  "h-4 w-4 transition-all duration-700 ease-out",
                  isCollapsed ? "mr-0" : "mr-2"
                )} style={{
                  transform: isCollapsed ? 'translateX(0px) scale(1.08)' : 'translateX(0px) scale(1)',
                  transition: 'all 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }} />
                {!isCollapsed && (
                  <span className="transition-all duration-700 ease-out" style={{
                    transform: isCollapsed ? 'translateX(-6px) scale(0.92)' : 'translateX(0px) scale(1)',
                    opacity: isCollapsed ? 0 : 1,
                    transitionDelay: isCollapsed ? '0ms' : `${index * 120 + 250}ms`
                  }}>
                    {item.title}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <Link
          href="/settings"
          className={cn(
            "flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-700 ease-out w-full group",
            isCollapsed ? "justify-end px-1" : ""
          )}
          title={isCollapsed ? "Settings" : undefined}
          style={{
            transform: isCollapsed ? 'translateX(8px) scale(0.98)' : 'translateX(0px) scale(1)',
            transitionDelay: '500ms'
          }}
        >
          <Settings className={cn(
            "h-5 w-5 transition-all duration-700 ease-out",
            isCollapsed ? "mr-0" : "mr-2"
          )} style={{
            transform: isCollapsed ? 'translateX(0px) scale(1.08)' : 'translateX(0px) scale(1)',
            transition: 'all 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }} />
          {!isCollapsed && (
            <span className="transition-all duration-700 ease-out" style={{
              transform: isCollapsed ? 'translateX(-6px) scale(0.92)' : 'translateX(0px) scale(1)',
              opacity: isCollapsed ? 0 : 1,
              transitionDelay: isCollapsed ? '0ms' : '750ms'
            }}>
              Settings
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}

export function SidebarTriggerButton() {
  return (
    <Button variant="ghost" size="sm" className="md:hidden">
      <PanelLeft className="h-4 w-4" />
    </Button>
  );
}
