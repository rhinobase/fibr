"use client";
import { type PropsWithChildren, useRef } from "react";
import {
  Tab,
  TabList,
  TabTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  classNames,
} from "@rafty/ui";
import { Env, useBuilder } from "@fibr/providers";
import { useDroppable } from "@dnd-kit/core";
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
} from "react-resizable-panels";
import { ResizeHandle } from "./ResizeHandle";

const DEFAULT_SIZE = 20;

export function FloatingSidebar({ children }: PropsWithChildren) {
  const sidebarRef = useRef<ImperativePanelHandle>(null);

  const { isProduction, defaultSize, isDisabled } = useBuilder(
    ({ env: { current }, layout: { sidebar }, tabs: { get, active } }) => {
      const currentTab = active != null ? get({ tabId: active }) : undefined;

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
          <SidebarTray>{children}</SidebarTray>
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

type SidebarTray = PropsWithChildren;

function SidebarTray({ children }: SidebarTray) {
  const { setNodeRef } = useDroppable({ id: "sidebar" });

  const { all, active, setActive, toggle, isExpanded } = useBuilder(
    ({ tabs: { all, active, setActive }, layout, setLayout }) => ({
      all,
      active,
      setActive,
      isExpanded: layout.sidebar,
      toggle: (value: boolean) => setLayout({ values: { sidebar: value } }),
    }),
  );

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
              <div className="focus:ring-1">
                <TabTrigger
                  value={name}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    if (isExpanded && active === name) {
                      setActive({ tabId: null });
                      toggle(false);
                    } else {
                      setActive({ tabId: name });
                      toggle(true);
                    }
                  }}
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
        {children}
      </div>
    </Tab>
  );
}
