"use client";
import { useRef, type PropsWithChildren } from "react";
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
} from "react-resizable-panels";
import { useBuilder } from "../providers";
import { Env } from "../utils";
import { ResizeHandle } from "./ResizeHandle";
import { SidebarTray } from "./SidebarTray";

const DEFAULT_SIZE = 20;
const MIN_WIDTH = 2.4;

export function Sidebar({ children }: PropsWithChildren) {
  const ref = useRef<ImperativePanelHandle>(null);

  const { isProduction, isDisabled, defaultSize, setLayout } = useBuilder(
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
      };
    },
  );

  if (isProduction) return;

  return (
    <div className="pointer-events-none absolute left-0 top-0 z-50 h-full w-full">
      <PanelGroup direction="horizontal">
        <Panel
          id="sidebar"
          ref={ref}
          order={1}
          minSize={15}
          maxSize={40}
          defaultSize={defaultSize}
          collapsible
          collapsedSize={MIN_WIDTH}
          onResize={(size) => {
            if (size <= MIN_WIDTH) setLayout({ showSidebar: false });
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
