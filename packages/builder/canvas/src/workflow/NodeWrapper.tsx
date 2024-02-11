import { useFormBuilder } from "@fibr/providers";
import { useThread } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import { type PropsWithChildren } from "react";

export function NodeWrapper(props: PropsWithChildren) {
  const { id } = useThread();
  const select = useFormBuilder(({ block }) => block.select);

  const onSelect = eventHandler(() => select(id));

  return (
    <div className="rounded bg-white" onClick={onSelect} onKeyDown={onSelect}>
      {props.children}
    </div>
  );
}
