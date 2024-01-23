import { PropsWithChildren } from "react";

export function Canvas({ children }: PropsWithChildren) {
  return (
    <div className="bg-secondary-100 flex flex-1 items-center justify-center">
      {children}
    </div>
  );
}
