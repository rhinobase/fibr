import { Form } from "@fibr/blocks";
import { ThreadType } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import { Button, classNames } from "@rafty/ui";
import { MdDelete } from "react-icons/md";
import { useBlueprint } from "../providers";

export type FormCard = {
  id: string;
  form: ThreadType<Form>;
};

export function FormCard({ id, form: { title } }: FormCard) {
  const { schema, select, activeForm } = useBlueprint(
    ({ schema, forms, active }) => ({
      schema,
      activeForm: active.form,
      select: forms.select,
    }),
  );
  const selectForm = eventHandler(() => select(id));

  return (
    <div
      className={classNames(
        "dark:bg-secondary-900 flex cursor-pointer select-none items-center gap-1 rounded border bg-white p-2 drop-shadow transition-all ease-in-out hover:drop-shadow-md",
        activeForm === id
          ? "border-primary-500"
          : "border-secondary-300 dark:border-secondary-700",
      )}
      onClick={selectForm}
      onKeyDown={selectForm}
    >
      <p className="text-2xs truncate font-medium">
        {title} ({id})
      </p>
      <div className="flex-1" />
      {schema.size > 1 && <DeleteButton id={id} />}
    </div>
  );
}

function DeleteButton({ id }: { id: string }) {
  const { remove } = useBlueprint(({ forms }) => ({
    remove: forms.remove,
  }));

  const deleteForm = eventHandler(() => remove(id));

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      className="rounded p-0.5"
      onClick={deleteForm}
      onKeyDown={deleteForm}
    >
      <MdDelete />
    </Button>
  );
}
