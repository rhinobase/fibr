import { useThread } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import { classNames } from "@rafty/ui";
import { PropsWithChildren } from "react";
import { useBlueprint } from "../../providers";
import { QuickActions } from "./QuickActions";

export function FieldWrapper({ children }: PropsWithChildren) {
  const { id } = useThread();
  const {
    fields: { select, selected },
  } = useBlueprint();

  const selectField = eventHandler(() => select(id));

  return (
    <QuickActions>
      <div
        className={classNames(
          "w-full cursor-pointer select-none rounded-md border p-5 text-center transition-all ease-in-out hover:shadow-md",
          selected === id ? "border-primary-500" : "border-secondary-200",
        )}
        onClick={selectField}
        onKeyDown={selectField}
      >
        {children}
      </div>
    </QuickActions>
  );
}
