import { PropsWithChildren } from "react";
import { BuilderProvider, type CreateBuilderStoreProps } from "./providers";

export function Workspace({
  children,
  ...props
}: PropsWithChildren<CreateBuilderStoreProps>) {
  return (
    <BuilderProvider {...props}>
      <div className="divide-secondary-200 dark:divide-secondary-800 flex h-screen w-full flex-col divide-y">
        {children}
      </div>
    </BuilderProvider>
  );
}
