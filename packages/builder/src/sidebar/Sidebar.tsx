"use client";
import { Tab, TabList, TabTrigger } from "@rafty/ui";
import { PropsWithChildren } from "react";
import { useBuilder } from "../providers";
import { Env } from "../utils";
import { Panel } from "react-resizable-panels";
import { ResizeHandle } from "../ResizeHandle";

export function Sidebar({ children }: PropsWithChildren) {
  const {
    env: { current },
  } = useBuilder();

  if (current === Env.PRODUCTION) return;

  return (
    <>
      <Panel id="sidebar" order={0} minSize={20} maxSize={25} defaultSize={20}>
        <SidebarTray>{children}</SidebarTray>
      </Panel>
      <ResizeHandle />
    </>
  );
}

function SidebarTray({ children }: PropsWithChildren) {
  const {
    tabs: { all, active, setActive },
  } = useBuilder();

  return (
    <Tab
      value={active}
      onValueChange={setActive}
      orientation="vertical"
      className="h-full"
    >
      <TabList className="p-1">
        {Array.from(all.entries()).map(([name, { icon }]) => (
          <TabTrigger
            key={name}
            value={name}
            className="ring-secondary-400 dark:ring-offset-secondary-950 rounded border-none p-1.5 ring-offset-1 ring-offset-white focus:outline-none focus:ring-2"
          >
            {icon}
          </TabTrigger>
        ))}
      </TabList>
      {children}
    </Tab>
  );
}
