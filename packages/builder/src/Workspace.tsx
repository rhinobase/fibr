import { PropsWithChildren } from "react";
import { BuilderProvider } from "./providers";
import { useBuilderManagerProps } from "./providers/builder";

export function Workspace({
  children,
  ...props
}: PropsWithChildren<useBuilderManagerProps>) {
  return (
    <BuilderProvider {...props}>
      <div className="divide-secondary-200 dark:divide-secondary-800 flex h-screen w-full flex-col divide-y">
        {children}
      </div>
    </BuilderProvider>
  );
}
