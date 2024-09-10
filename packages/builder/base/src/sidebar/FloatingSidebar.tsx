"use client";
import { useDroppable } from "@dnd-kit/core";
import { Env, useBuilder } from "../providers";
import { Tooltip, TooltipContent, TooltipTrigger } from "@rafty/ui";
import { classNames, eventHandler } from "../utils";
import { type PropsWithChildren, useRef } from "react";
import {
  type ImperativePanelHandle,
  Panel,
  PanelGroup,
} from "react-resizable-panels";
import { ResizeHandle } from "./ResizeHandle";
import * as Tabs from "@radix-ui/react-tabs";

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
    <Tabs.Root
      value={isExpanded ? active ?? undefined : "None"}
      orientation="vertical"
      className={classNames(
        (active === null || !isExpanded) && "w-max",
        "pointer-events-auto flex h-full items-center gap-2 py-2 pl-2",
      )}
      ref={setNodeRef}
    >
      <Tabs.List className="dark:bg-secondary-950 flex h-max flex-col gap-1 rounded-md rounded-t-md bg-white p-1 shadow-md">
        {Object.entries(all).map(([name, { icon, label }]) => (
          <Tooltip key={name}>
            <TooltipTrigger asChild>
              {/* This extra div is placed to avoid passing tooltip data props to tab trigger */}
              <div className="focus:ring-1">
                <Tabs.Trigger
                  value={name}
                  onClick={setActiveTab(name)}
                  onKeyDown={setActiveTab(name)}
                  className="text-secondary-600 dark:text-secondary-400 dark:hover:text-secondary-100 data-[state=active]:bg-primary-100 data-[state=active]:hover:bg-primary-100 dark:data-[state=active]:text-secondary-100 data-[disabled]:text-secondary-400 dark:data-[disabled]:text-secondary-600 dark:data-[state=active]:bg-secondary-800 rounded p-2 font-medium transition-colors ease-in-out hover:text-black data-[disabled]:cursor-not-allowed data-[state=active]:text-black"
                >
                  {icon}
                </Tabs.Trigger>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
          </Tooltip>
        ))}
      </Tabs.List>
      <div className="dark:bg-secondary-950 h-full w-full overflow-hidden rounded-md bg-white shadow-md">
        {props.children}
      </div>
    </Tabs.Root>
  );
}
