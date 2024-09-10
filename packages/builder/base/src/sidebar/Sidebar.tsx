"use client";
import { useDroppable } from "@dnd-kit/core";
import { Env, useBuilder } from "../providers";
import { Tooltip, TooltipContent, TooltipTrigger } from "@rafty/ui";
import { classNames, eventHandler } from "../utils";
import { type PropsWithChildren, useEffect, useRef } from "react";
import {
  type ImperativePanelHandle,
  Panel,
  PanelGroup,
} from "react-resizable-panels";
import { ResizeHandle } from "./ResizeHandle";
import * as Tabs from "@radix-ui/react-tabs";

const DEFAULT_SIZE = 20;
const MIN_WIDTH = 2.4;

export function Sidebar(props: PropsWithChildren) {
  const sidebarRef = useRef<ImperativePanelHandle>(null);

  const { isProduction, isDisabled, defaultSize, toggle } = useBuilder(
    ({
      env: { current },
      layout: { sidebar },
      setLayout,
      tabs: { get, active },
    }) => {
      const currentTab = active != null ? get(active) : undefined;

      return {
        isProduction: current === Env.PRODUCTION,
        isDisabled: !sidebar || currentTab?.isResizeable === false,
        defaultSize: currentTab?.defaultSize ?? DEFAULT_SIZE,
        toggle: (value: boolean) => setLayout({ sidebar: value }),
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
          collapsible
          collapsedSize={MIN_WIDTH}
          onResize={(size) => {
            if (size <= MIN_WIDTH) toggle(false);
            else toggle(true);
          }}
          style={{ pointerEvents: "auto" }}
        >
          <SidebarTray
            expandPanel={() => sidebarRef.current?.resize(defaultSize)}
            collapsePanel={sidebarRef.current?.collapse}
          >
            {props.children}
          </SidebarTray>
        </Panel>
        <ResizeHandle disabled={isDisabled} />
        <Panel order={2} defaultSize={80} />
      </PanelGroup>
    </div>
  );
}

type SidebarTray = PropsWithChildren<{
  expandPanel?: () => void;
  collapsePanel?: () => void;
}>;

function SidebarTray({ children, expandPanel, collapsePanel }: SidebarTray) {
  const { setNodeRef } = useDroppable({ id: "sidebar" });

  const { all, active, setActive, isExpanded } = useBuilder(
    ({ tabs: { all, active, setActive }, layout }) => ({
      all,
      active,
      setActive,
      isExpanded: layout.sidebar,
    }),
  );

  useEffect(() => {
    if (isExpanded) expandPanel?.();
    else collapsePanel?.();
  }, [isExpanded, expandPanel, collapsePanel]);

  const setActiveTab = (name: string) =>
    eventHandler(() => {
      if (active === name && isExpanded) {
        setActive(null);
        collapsePanel?.();
      } else {
        setActive(name);
        if (!isExpanded) expandPanel?.();
      }
    });

  return (
    <Tabs.Root
      value={isExpanded ? active ?? undefined : "None"}
      orientation="vertical"
      className={classNames(
        (active === null || !isExpanded) && "w-max",
        "dark:bg-secondary-950 pointer-events-auto flex h-full bg-white",
      )}
      ref={setNodeRef}
    >
      <Tabs.List className="dark:border-secondary-800 border-secondary-300 flex flex-col border-r">
        {Object.entries(all).map(([name, { icon, label }]) => (
          <Tooltip key={name}>
            <TooltipTrigger asChild>
              {/* This extra div is placed to avoid passing tooltip data props to tab trigger */}
              <div>
                <Tabs.Trigger
                  value={name}
                  onClick={setActiveTab(name)}
                  onKeyDown={setActiveTab(name)}
                  className="dark:hover:text-secondary-100 text-secondary-600 dark:text-secondary-400 dark:data-[state=active]:text-secondary-100 data-[disabled]:text-secondary-400 dark:data-[disabled]:text-secondary-600 data-[state=active]:border-primary-500 dark:data-[state=active]:border-primary-300 data-[state=active]:bg-secondary-100 dark:data-[state=active]:bg-secondary-800 -mr-px rounded-l-md border-r-2 border-transparent p-2 font-medium transition-colors ease-in-out hover:text-black data-[disabled]:cursor-not-allowed data-[state=active]:text-black"
                >
                  {icon}
                </Tabs.Trigger>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
          </Tooltip>
        ))}
      </Tabs.List>
      <div className="border-secondary-200 dark:border-secondary-800 w-full overflow-hidden border-r">
        {children}
      </div>
    </Tabs.Root>
  );
}
