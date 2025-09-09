"use client"

import { useState } from "react";
import { SidebarNav, SidebarTriggerButton } from "./sidebar-nav";
import { Button } from "@/app/components/ui/button";
import { Settings, PanelLeft } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="h-screen w-screen bg-background overflow-hidden fixed inset-0">
      <div className="flex h-full w-full">
        <div className={isCollapsed ? "w-16" : "w-64"} style={{ 
          width: isCollapsed ? '64px' : '256px',
          transition: 'all 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isCollapsed ? 'translateX(-12px)' : 'translateX(0px)',
          opacity: isCollapsed ? 0.9 : 1
        }}>
          <div className="h-full border-r bg-card" style={{
            transform: isCollapsed ? 'scale(0.995)' : 'scale(1)',
            transition: 'transform 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}>
            <SidebarNav isCollapsed={isCollapsed} onToggle={toggleSidebar} />
          </div>
        </div>
        <div 
          className="flex-1 flex flex-col min-w-0" 
          style={{ 
            width: isCollapsed ? 'calc(100vw - 64px)' : 'calc(100vw - 256px)',
            transition: 'all 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: isCollapsed ? 'translateX(6px)' : 'translateX(0px)'
          }}
        >
          {/* Top Header Bar */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 pb-px bg-background" style={{ width: '100%' }}>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleSidebar}
              className="h-8 w-8 p-0 hover:bg-accent transition-colors duration-200"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <PanelLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1" />
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto px-4 py-4 sm:px-6 sm:py-6 pr-8" style={{ width: '100%' }}>
            <div className="w-full h-full main-content">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
