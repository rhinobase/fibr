import {
  BuilderProvider,
  EventManagerProvider,
  type CreateBuilderStoreProps,
  type EditorEventBusProps,
} from "@fibr/providers";
import { classNames } from "@rafty/ui";
import { forwardRef, type HTMLAttributes } from "react";
import { Toaster } from "react-hot-toast";

export type Workspace = HTMLAttributes<HTMLElement> &
  CreateBuilderStoreProps &
  EditorEventBusProps;

export const Workspace = forwardRef<HTMLElement, Workspace>(function Workspace(
  { initialEvents, env, tabs, className, ...props },
  forwardedRef,
) {
  return (
    <EventManagerProvider initialEvents={initialEvents}>
      <BuilderProvider tabs={tabs} env={env}>
        <main
          {...props}
          className={classNames("flex h-screen w-full flex-col", className)}
          ref={forwardedRef}
        />
        <Toaster />
      </BuilderProvider>
    </EventManagerProvider>
  );
});
