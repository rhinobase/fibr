import { PropsWithChildren } from "react";

export function Canvas({ children }: PropsWithChildren) {
  return (
    <div className="bg-secondary-100 flex h-full flex-1 items-center justify-center py-10">
      {children}
    </div>
  );
}
