"use client";
import { classNames } from "@rafty/ui";
import { type HTMLAttributes } from "react";
import { useBuilder } from "./providers";
import { Env } from "./utils";

export type Settings = HTMLAttributes<HTMLDivElement>;

export function Settings({ className, children, ...props }: Settings) {
  const isProduction = useBuilder(
    (state) => state.env.current === Env.PRODUCTION,
  );

  if (isProduction) return;

  return (
    <div {...props} className={classNames("h-full w-80 p-3", className)}>
      <h4 className="font-medium">Settings</h4>
      <hr className="my-3" />
      {children}
    </div>
  );
}
