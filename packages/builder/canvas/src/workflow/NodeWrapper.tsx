import { useCanvas } from "@fibr/providers";
import { useThread } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import { type PropsWithChildren } from "react";

export function NodeWrapper(props: PropsWithChildren) {
  const { id } = useThread();
  const select = useCanvas(({ select }) => select);

  const onSelect = eventHandler(() => select({ blockId: id }));

  return (
    <div className="rounded bg-white" onClick={onSelect} onKeyDown={onSelect}>
      {props.children}
    </div>
  );
}
