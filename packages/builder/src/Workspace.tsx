import { PropsWithChildren } from "react";

export function Workspace({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="divide-secondary-200 dark:divide-secondary-800 flex h-full w-full flex-col divide-y">
        {children}
      </div>
    </div>
  );
}
