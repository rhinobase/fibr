import {
  BuilderProvider,
  EventManagerProvider,
  type CreateBuilderStoreProps,
  type EditorEventBusProps,
} from "@fibr/providers";
import type { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

export type Workspace = PropsWithChildren<
  CreateBuilderStoreProps & EditorEventBusProps
>;

export function Workspace({ children, initialEvents, ...props }: Workspace) {
  return (
    <EventManagerProvider initialEvents={initialEvents}>
      <BuilderProvider {...props}>
        <div className="divide-secondary-200 dark:divide-secondary-800 flex h-screen w-full flex-col divide-y">
          {children}
        </div>
        <Toaster />
      </BuilderProvider>
    </EventManagerProvider>
  );
}
