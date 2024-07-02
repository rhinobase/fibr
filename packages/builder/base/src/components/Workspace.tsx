import { forwardRef, type HTMLAttributes } from "react";
import {
  BuilderProvider,
  EventManagerProvider,
  type BuilderStoreProps,
  type EditorEventBusProps,
} from "../providers";

export type Workspace = Omit<HTMLAttributes<HTMLElement>, "onError"> &
  BuilderStoreProps &
  EditorEventBusProps;

export const Workspace = forwardRef<HTMLElement, Workspace>(function Workspace(
  { initialEvents, env, tabs, onError, ...props },
  forwardedRef,
) {
  const eventManagerProviderProps: EditorEventBusProps = { initialEvents };
  const builderProviderProps: BuilderStoreProps = { tabs, env, onError };

  return (
    <EventManagerProvider {...eventManagerProviderProps}>
      <BuilderProvider {...builderProviderProps}>
        <main {...props} ref={forwardedRef} />
      </BuilderProvider>
    </EventManagerProvider>
  );
});
