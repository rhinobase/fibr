"use client";
import { classNames } from "@rafty/ui";
import { HTMLAttributes } from "react";
import { useBuilder } from "./providers";
import { Env } from "./utils";
import { Panel } from "react-resizable-panels";
import { ResizeHandle } from "./ResizeHandle";

export type Settings = HTMLAttributes<HTMLDivElement>;

export function Settings({ className, ...props }: Settings) {
  const current = useBuilder((state) => state.env.current);

  if (current === Env.PRODUCTION) return;

  return (
    <>
      <ResizeHandle className="border-secondary-200 border-l" />
      <Panel
        id="settings"
        order={2}
        minSize={20}
        maxSize={25}
        defaultSize={20}
        className={classNames("h-full p-3", className)}
      >
        <div {...props} />
      </Panel>
    </>
  );
}
