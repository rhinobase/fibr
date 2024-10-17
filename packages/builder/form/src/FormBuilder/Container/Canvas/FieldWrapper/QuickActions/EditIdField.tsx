import { eventHandler, useCanvas } from "@fibr/builder";
import { InputField, classNames, useBoolean } from "@rafty/ui";
import { useField } from "duck-form";
import { useEffect, useRef, type FocusEvent, type KeyboardEvent } from "react";
import { HiPencil } from "react-icons/hi";
import type { Node } from "reactflow";

export function EditIdField() {
  const { id } = useField<Node>();
  const [isEditable, toggleEditable] = useBoolean(false);
  const ref = useRef<HTMLInputElement>(null);
  const { select, updateId } = useCanvas(({ select, updateId }) => ({
    select,
    updateId,
  }));

  useEffect(() => {
    if (isEditable && ref.current) ref.current.focus();
  }, [isEditable]);

  const setFieldEditable = eventHandler(() => {
    toggleEditable(true);
    select({ selectedBlockIds: id });
  });

  const onSubmit = (
    e: FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Updating the value
    if (ref.current)
      updateId({
        currentBlockId: id,
        newBlockId: ref.current.value,
      });

    toggleEditable(false);
  };

  return (
    <div
      className={classNames(
        "bg-secondary-200/70 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 w-max rounded-md",
        !isEditable && "px-2 py-1.5",
      )}
      onClick={setFieldEditable}
      onKeyDown={setFieldEditable}
    >
      {isEditable ? (
        <InputField
          size="sm"
          ref={ref}
          defaultValue={id}
          className="dark:bg-secondary-950 w-[100px] bg-white font-mono"
          onBlur={onSubmit}
          onKeyDown={(event) => {
            const { key } = event;
            if (key === "Escape" || key === "Enter") onSubmit(event);
          }}
        />
      ) : (
        <div className="flex items-center gap-1.5">
          <code className="text-sm">{id}</code>
          <HiPencil />
        </div>
      )}
    </div>
  );
}
