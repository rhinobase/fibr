"use client";
import { useDroppable } from "@dnd-kit/core";
import { Env, useBuilder } from "../providers";
import {
  Tab,
  TabList,
  TabTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@rafty/ui";
import { classNames, eventHandler } from "../utils";
import { type PropsWithChildren, useRef } from "react";
import {
  type ImperativePanelHandle,
  Panel,
  PanelGroup,
} from "react-resizable-panels";
import { ResizeHandle } from "./ResizeHandle";

const DEFAULT_SIZE = 20;

export function FloatingSidebar(props: PropsWithChildren) {
  const sidebarRef = useRef<ImperativePanelHandle>(null);

  const { isProduction, defaultSize, isDisabled } = useBuilder(
    ({ env: { current }, layout: { sidebar }, tabs: { get, active } }) => {
      const currentTab = active != null ? get(active) : undefined;

      return {
        isProduction: current === Env.PRODUCTION,
        isDisabled: !sidebar || currentTab?.isResizeable === false,
        defaultSize: currentTab?.defaultSize ?? DEFAULT_SIZE,
      };
    },
  );

  if (isProduction) return;

  return (
    <div className="pointer-events-none absolute left-0 top-0 z-50 h-full w-full">
      <PanelGroup direction="horizontal">
        <Panel
          id="sidebar"
          ref={sidebarRef}
          order={1}
          minSize={15}
          maxSize={40}
          defaultSize={defaultSize}
        >
          <SidebarTray>{props.children}</SidebarTray>
        </Panel>
        <ResizeHandle
          disabled={isDisabled}
          className="my-2 overflow-hidden rounded-r-full"
        />
        <Panel order={2} defaultSize={80} />
      </PanelGroup>
    </div>
  );
}

function SidebarTray(props: PropsWithChildren) {
  const { setNodeRef } = useDroppable({ id: "sidebar" });

  const { all, active, setActive, toggle, isExpanded } = useBuilder(
    ({ tabs: { all, active, setActive }, layout, setLayout }) => ({
      all,
      active,
      setActive,
      isExpanded: layout.sidebar,
      toggle: (value: boolean) => setLayout({ sidebar: value }),
    }),
  );

  const setActiveTab = (name: string) =>
    eventHandler(() => {
      if (isExpanded && active === name) {
        setActive(null);
        toggle(false);
      } else {
        setActive(name);
        toggle(true);
      }
    });

  return (
    <Tab
      value={isExpanded ? active ?? undefined : "None"}
      orientation="vertical"
      className={classNames(
        (active === null || !isExpanded) && "w-max",
        "pointer-events-auto h-full items-center gap-2 py-2 pl-2",
      )}
      ref={setNodeRef}
    >
      <TabList className="dark:bg-secondary-950 h-max rounded-md bg-white p-1 shadow-md data-[orientation=vertical]:gap-1 data-[orientation=vertical]:rounded-t-md data-[orientation=vertical]:border-r-0">
        {Object.entries(all).map(([name, { icon, label }]) => (
          <Tooltip key={name}>
            <TooltipTrigger asChild>
              {/* This extra div is placed to avoid passing tooltip data props to tab trigger */}
              <div className="focus:ring-1">
                <TabTrigger
                  value={name}
                  onClick={setActiveTab(name)}
                  onKeyDown={setActiveTab(name)}
                  className="hover:text-secondary-700 data-[state=active]:bg-primary-100 data-[state=active]:hover:bg-primary-100 rounded p-2 data-[orientation=vertical]:border-r-0"
                >
                  {icon}
                </TabTrigger>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
          </Tooltip>
        ))}
      </TabList>
      <div className="dark:bg-secondary-950 h-full w-full overflow-hidden rounded-md bg-white shadow-md">
        {props.children}
      </div>
    </Tab>
  );
}
