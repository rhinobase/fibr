"use client";
import { useRef, type PropsWithChildren, useEffect } from "react";
import {
  type ImperativePanelHandle,
  Panel,
  PanelGroup,
} from "react-resizable-panels";
import { useBuilder, Env } from "@fibr/providers";
import { ResizeHandle } from "./ResizeHandle";
import { useDroppable } from "@dnd-kit/core";
import {
  Tab,
  TabList,
  TabTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  classNames,
} from "@rafty/ui";

const DEFAULT_SIZE = 20;
const MIN_WIDTH = 2.4;

export function Sidebar({ children }: PropsWithChildren) {
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
            {children}
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

  return (
    <Tab
      value={isExpanded ? active ?? undefined : "None"}
      orientation="vertical"
      className={classNames(
        (active === null || !isExpanded) && "w-max",
        "pointer-events-auto h-full bg-white",
      )}
      ref={setNodeRef}
    >
      <TabList>
        {Object.entries(all).map(([name, { icon, label }]) => (
          <Tooltip key={name}>
            <TooltipTrigger asChild>
              <div>
                <TabTrigger
                  value={name}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    if (active === name && isExpanded) {
                      setActive(null);
                      collapsePanel?.();
                    } else {
                      setActive(name);
                      if (!isExpanded) expandPanel?.();
                    }
                  }}
                  className="hover:text-secondary-700 p-2"
                >
                  {icon}
                </TabTrigger>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
          </Tooltip>
        ))}
      </TabList>
      <div className="border-secondary-200 w-full overflow-hidden border-r">
        {children}
      </div>
    </Tab>
  );
}
