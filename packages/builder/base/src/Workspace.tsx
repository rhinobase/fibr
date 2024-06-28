import {
  BuilderProvider,
  EventManagerProvider,
  type BuilderStoreProps,
  type EditorEventBusProps,
} from "./providers";
import { classNames } from "./utils";
import { forwardRef, type HTMLAttributes } from "react";
import { Toaster } from "react-hot-toast";

export type Workspace = Omit<HTMLAttributes<HTMLElement>, "onError"> &
  BuilderStoreProps &
  EditorEventBusProps;

export const Workspace = forwardRef<HTMLElement, Workspace>(function Workspace(
  { initialEvents, env, tabs, className, onError, ...props },
  forwardedRef,
) {
  const eventManagerProviderProps: EditorEventBusProps = { initialEvents };
  const builderProviderProps: BuilderStoreProps = { tabs, env, onError };

  return (
    <EventManagerProvider {...eventManagerProviderProps}>
      <BuilderProvider {...builderProviderProps}>
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
