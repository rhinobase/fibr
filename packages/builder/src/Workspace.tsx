import { PropsWithChildren } from "react";
import { BuilderProvider } from "./providers";

export function Workspace({ children }: PropsWithChildren) {
  return (
    <BuilderProvider>
      <div className="divide-secondary-200 dark:divide-secondary-800 flex h-screen w-full flex-col divide-y">
        {children}
      </div>
    </BuilderProvider>
  );
}
