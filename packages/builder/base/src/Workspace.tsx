import { BuilderProvider, type CreateBuilderStoreProps } from "@fibr/providers";
import {
  type EditorEventBusProps,
  EventManagerProvider,
} from "@fibr/providers";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

export function Workspace({
  children,
  initialEvents,
  ...props
}: PropsWithChildren<CreateBuilderStoreProps & EditorEventBusProps>) {
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
