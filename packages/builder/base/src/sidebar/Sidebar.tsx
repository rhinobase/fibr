"use client";
import { useRef, type PropsWithChildren } from "react";
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
} from "react-resizable-panels";
import { useBuilder, Env } from "@fibr/providers";
import { ResizeHandle } from "./ResizeHandle";
import { SidebarTray } from "./SidebarTray";
import { useDroppable } from "@dnd-kit/core";

const DEFAULT_SIZE = 20;
const MIN_WIDTH = 2.4;

export function Sidebar({ children }: PropsWithChildren) {
  const { setNodeRef } = useDroppable({ id: "sidebar" });
  const ref = useRef<ImperativePanelHandle>(null);

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
          ref={ref}
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
          <aside className="h-full" ref={setNodeRef}>
            <SidebarTray
              expandPanel={() => ref.current?.resize(defaultSize)}
              collapsePanel={ref.current?.collapse}
            >
              {children}
            </SidebarTray>
          </aside>
        </Panel>
        <ResizeHandle disabled={isDisabled} />
        <Panel order={2} defaultSize={80} />
      </PanelGroup>
    </div>
  );
}
