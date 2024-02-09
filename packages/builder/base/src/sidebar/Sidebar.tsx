"use client";
import {
  Tab,
  TabList,
  TabTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@rafty/ui";
import { useRef, type PropsWithChildren } from "react";
import { ImperativePanelHandle, Panel } from "react-resizable-panels";
import { ResizeHandle } from "../ResizeHandle";
import { useBuilder } from "../providers";
import { Env } from "../utils";

const MIN_SIZE = 2.4;
const DEFAULT_SIZE = 24;

export function Sidebar({ children }: PropsWithChildren) {
  const { isProduction, isDisabled, defaultSize } = useBuilder(
    ({ env: { current }, layout: { showSidebar }, tabs: { get, active } }) => {
      const currentTab = active != null ? get(active) : undefined;

      return {
        isProduction: current === Env.PRODUCTION,
        isDisabled: !showSidebar || currentTab?.isResizeable === false,
        defaultSize: currentTab?.defaultSize ?? DEFAULT_SIZE,
      };
    },
  );
  const setLayout = useBuilder((state) => state.setLayout);
  const ref = useRef<ImperativePanelHandle>(null);

  if (isProduction) return;

  return (
    <>
      <Panel
        id="sidebar"
        ref={ref}
        order={1}
        minSize={15}
        defaultSize={defaultSize}
        collapsible
        collapsedSize={MIN_SIZE}
        onResize={(size) => {
          if (size === MIN_SIZE) setLayout({ showSidebar: false });
          else setLayout({ showSidebar: true });
        }}
        style={{ pointerEvents: "auto" }}
      >
        <SidebarTray
          expandPanel={() => {
            const panel = ref.current;

            if (!panel) return;

            panel.expand();
            panel.resize(defaultSize);
          }}
        >
          {children}
        </SidebarTray>
      </Panel>
      <ResizeHandle
        disabled={isDisabled}
        className="border-secondary-200 border-r"
      />
    </>
  );
}

type SidebarTray = PropsWithChildren<{
  isExpanded?: boolean;
  expandPanel?: () => void;
}>;

function SidebarTray({ children, expandPanel }: SidebarTray) {
  const { all, active, setActive, isExpanded } = useBuilder(
    ({ tabs: { all, active, setActive }, layout }) => ({
      all,
      active,
      setActive,
      isExpanded: layout.showSidebar,
    }),
  );

  return (
    <Tab
      value={isExpanded ? active : "None"}
      onValueChange={(value) => {
        setActive(value);
        if (!isExpanded) expandPanel?.();
      }}
      orientation="vertical"
      className="h-full"
    >
      <TabList>
        {Array.from(all).map(([name, { icon, label }]) => (
          <Tooltip key={name}>
            <TabTrigger value={name} className="hover:text-secondary-700 p-3">
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
