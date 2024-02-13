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
import { ResizeHandle } from "./ResizeHandle";
import { useBuilder } from "../providers";
import { Env } from "../utils";
import { useCanvas } from "@fibr/providers";

const DEFAULT_SIZE = 20;
export function Sidebar({ children }: PropsWithChildren) {
  const ref = useRef<ImperativePanelHandle>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const [minWidth, setMinWidth] = useState(2.4);

  const { isProduction, isDisabled, defaultSize, setLayout, isExpanded } =
    useBuilder(
      ({
        env: { current },
        layout: { showSidebar },
        setLayout,
        tabs: { get, active },
      }) => {
        const currentTab = active != null ? get(active) : undefined;

        return {
          isProduction: current === Env.PRODUCTION,
          isDisabled: !showSidebar || currentTab?.isResizeable === false,
          defaultSize: currentTab?.defaultSize ?? DEFAULT_SIZE,
          setLayout,
          isExpanded: showSidebar,
        };
      },
    );
  const isSelected = useCanvas((state) => state.active.block != null);

  useEffect(() => {
    if (tabListRef.current == null) return;

    // Window Width
    const windowWidth = window.screen.width;

    // Tab tray width
    const tabTrayWidth = tabListRef.current.offsetWidth;

    // Screen width - Settings Panel width
    const panelGroupWidth = windowWidth - (isSelected ? 320 : 0);

    // Calculated min width in %
    const calcMinWidth = +((tabTrayWidth * 100) / panelGroupWidth).toFixed(2);

    if (calcMinWidth > 0) setMinWidth(calcMinWidth);

    // Correcthing the panel size
    if (isExpanded) {
      const panel = ref.current;
      if (panel) {
        const currentPanelSize = panel.getSize();

        /**
         * (PreviousPanelGroupWidth - CurrentSidebarSize) / CurrentPanelGroupWidth
         */

        panel.resize(
          ((windowWidth - (!isSelected ? 320 : 0)) * currentPanelSize) /
            panelGroupWidth,
        );
      }
    }
  }, [isSelected, isExpanded]);

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
          if (size <= minWidth) setLayout({ showSidebar: false });
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
          collapsePanel={() => {
            const panel = ref.current;

            if (!panel) return;

            panel.collapse();
          }}
          listRef={tabListRef}
        >
          {children}
        </SidebarTray>
      </Panel>
      <ResizeHandle disabled={isDisabled} />
    </>
  );
}

type SidebarTray = PropsWithChildren<{
  expandPanel?: () => void;
  collapsePanel?: () => void;
  listRef: RefObject<HTMLDivElement>;
}>;

function SidebarTray({
  children,
  expandPanel,
  collapsePanel,
  listRef,
}: SidebarTray) {
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
      value={isExpanded ? active ?? undefined : "None"}
      orientation="vertical"
      className="h-full"
    >
      <TabList ref={listRef}>
        {Array.from(all).map(([name, { icon, label }]) => (
          <Tooltip key={name}>
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
              className="hover:text-secondary-700 p-3"
            >
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
