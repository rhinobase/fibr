"use client";
import {
  Tab,
  TabList,
  TabTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@rafty/ui";
import {
  useRef,
  type PropsWithChildren,
  RefObject,
  useEffect,
  useState,
} from "react";
import { ImperativePanelHandle, Panel } from "react-resizable-panels";
import { ResizeHandle } from "../ResizeHandle";
import { useBuilder } from "../providers";
import { Env } from "../utils";
import { useFormBuilder } from "@fibr/providers";

const DEFAULT_SIZE = 24;
export function Sidebar({ children }: PropsWithChildren) {
  const ref = useRef<ImperativePanelHandle>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const [minWidth, setMinWidth] = useState(2.4);

  const { isProduction, isDisabled, defaultSize, setLayout } = useBuilder(
    ({ env: { current }, layout: { showSidebar }, setLayout, tabs: { get, active } }) => {
      const currentTab = active != null ? get(active) : undefined;

      return {
        isProduction: current === Env.PRODUCTION,
        isDisabled: !showSidebar || currentTab?.isResizeable === false,
        defaultSize: currentTab?.defaultSize ?? DEFAULT_SIZE,
        setLayout
      };
    },
  );
  const isSelected = useFormBuilder((state) => state.active.block != null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: We want to update the sie based upon the opening and closing of settings panel
useEffect(() => {
    const windowSize = window.screen.width;
    const panelGroupWidth = windowSize - 320;
    const ListWidth = tabListRef.current?.offsetWidth ?? 0;
    setMinWidth((ListWidth * 100) / panelGroupWidth);
  }, [isSelected]);

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
        collapsedSize={minWidth}
        onResize={(size) => {
          if (size === minWidth) setLayout({ showSidebar: false });
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
          listRef={tabListRef}
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
  listRef: RefObject<HTMLDivElement>;
}>;

function SidebarTray({ children, expandPanel, listRef }: SidebarTray) {
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
      <TabList ref={listRef}>
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
