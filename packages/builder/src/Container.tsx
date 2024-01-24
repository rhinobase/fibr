import { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
  return (
    <main className="divide-secondary-200 dark:divide-secondary-800 flex flex-1 divide-x overflow-hidden">
      {children}
    </main>
  );
}
