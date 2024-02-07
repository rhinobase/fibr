"use client";
import {
  Tab,
  TabList,
  TabTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@rafty/ui";
import type { PropsWithChildren } from "react";
import { Panel } from "react-resizable-panels";
import { ResizeHandle } from "../ResizeHandle";
import { useBuilder } from "../providers";

export function Sidebar({ children }: PropsWithChildren) {
  return (
    <>
      <Panel id="sidebar" order={1} minSize={20} maxSize={25} defaultSize={20}>
        <SidebarTray>{children}</SidebarTray>
      </Panel>
      <ResizeHandle className="border-secondary-200 border-r" />
    </>
  );
}

function SidebarTray({ children }: PropsWithChildren) {
  const { all, active, setActive } = useBuilder(
    ({ tabs: { all, active, setActive } }) => ({
      all,
      active,
      setActive,
    }),
  );

  return (
    <Tab
      value={active}
      onValueChange={setActive}
      orientation="vertical"
      className="h-full"
    >
      <TabList>
        {Array.from(all).map(([name, { icon, label }]) => (
          <Tooltip key={name}>
            <TabTrigger value={name} className="hover:text-secondary-700">
              <TooltipTrigger>{icon}</TooltipTrigger>
            </TabTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
          </Tooltip>
        ))}
      </TabList>
      {children}
    </Tab>
  );
}
