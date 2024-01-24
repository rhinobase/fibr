import { PropsWithChildren } from "react";

export function Canvas({ children }: PropsWithChildren) {
  return (
    <div className="bg-secondary-100 flex flex-1 items-start justify-center overflow-y-auto py-10">
      {children}
    </div>
  );
}
