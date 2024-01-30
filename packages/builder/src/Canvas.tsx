import { PropsWithChildren } from "react";
import { Panel } from "react-resizable-panels";

export function Canvas({ children }: PropsWithChildren) {
  return (
    <Panel
      order={1}
      minSize={50}
      defaultSize={80}
      id="canvas"
      className="bg-secondary-100 flex items-start justify-center overflow-y-auto py-10"
    >
      {children}
    </Panel>
  );
}
