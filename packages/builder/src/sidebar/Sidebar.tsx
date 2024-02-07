"use client";
import { Tab, TabList, TabTrigger } from "@rafty/ui";
import type { PropsWithChildren } from "react";
import { useBuilder } from "../providers";
import { Env } from "../utils";
import { Panel } from "react-resizable-panels";
import { ResizeHandle } from "../ResizeHandle";

export function Sidebar({ children }: PropsWithChildren) {
  const current = useBuilder(({ env }) => env.current);

  if (current === Env.PRODUCTION) return;

  return (
    <>
      <Panel id="sidebar" order={0} minSize={20} maxSize={25} defaultSize={20}>
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
        {Array.from(all).map(([name, { icon }]) => (
          <TabTrigger
            key={name}
            value={name}
            className="hover:text-secondary-700 px-2"
          >
            {icon}
          </TabTrigger>
        ))}
      </TabList>
      {children}
    </Tab>
  );
}
