"use client";
import { classNames } from "@rafty/ui";
import { HTMLAttributes } from "react";
import { Panel } from "react-resizable-panels";
import { ResizeHandle } from "./ResizeHandle";

export type Settings = HTMLAttributes<HTMLDivElement>;

export function Settings({ className, children, ...props }: Settings) {
  return (
    <>
      <ResizeHandle className="border-secondary-200 border-l" />
      <Panel
        id="settings"
        order={3}
        minSize={20}
        maxSize={25}
        defaultSize={20}
        className={classNames("h-full p-3", className)}
      >
        <div {...props}>
          <h4 className="font-medium">Settings</h4>
          <hr className="my-3" />
          {children}
        </div>
      </Panel>
    </>
  );
}
