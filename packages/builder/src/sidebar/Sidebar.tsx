"use client";
import { Tab, TabList, TabTrigger } from "@rafty/ui";
import { PropsWithChildren } from "react";
import { SidebarProvider, useSidebar } from "../providers";

export function Sidebar({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <div className="flex h-full w-80 items-center justify-center">
        <SidebarTray>{children}</SidebarTray>
      </div>
    </SidebarProvider>
  );
}

function SidebarTray({ children }: PropsWithChildren) {
  const { tabs, active, onActiveChange } = useSidebar();

  return (
    <Tab
      value={active}
      onValueChange={onActiveChange}
      orientation="vertical"
      className="h-full w-full"
    >
      <TabList className="p-1">
        {Array.from(tabs.entries()).map(([name, { icon }]) => (
          <TabTrigger
            key={name}
            value={name}
            className="ring-secondary-400 dark:ring-offset-secondary-950 !rounded !border-0 p-1.5 ring-offset-1 ring-offset-white focus:outline-none focus:ring-2"
          >
            {icon}
          </TabTrigger>
        ))}
      </TabList>
      {children}
    </Tab>
  );
}
