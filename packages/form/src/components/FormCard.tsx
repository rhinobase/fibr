import { Form } from "@fibr/blocks";
import type { ThreadType } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import { Button, classNames } from "@rafty/ui";
import { MdDelete } from "react-icons/md";
import { useFormBuilder } from "@fibr/providers";

export type FormCard = {
  id: string;
  form: ThreadType<Form>;
};

export function FormCard({ id, form: { title } }: FormCard) {
  const { selectForm, activeForm } = useFormBuilder(({ forms, active }) => ({
    activeForm: active.form,
    selectForm: forms.select,
  }));
  const handleFormSelect = eventHandler(() => selectForm(id));

  return (
    <div
      className={classNames(
        "dark:bg-secondary-900 flex cursor-pointer select-none items-center gap-1 rounded border bg-white p-2 drop-shadow transition-all ease-in-out hover:drop-shadow-md",
        activeForm === id
          ? "border-primary-500"
          : "border-secondary-300 dark:border-secondary-700",
      )}
      onClick={handleFormSelect}
      onKeyDown={handleFormSelect}
    >
      <p className="text-2xs truncate font-medium">
        {title} ({id})
      </p>
      <div className="flex-1" />
      <DeleteButton id={id} />
    </div>
  );
}

function DeleteButton({ id }: { id: string }) {
  const removeForm = useFormBuilder(({ forms }) => forms.remove);

  const handleFormDelete = eventHandler(() => removeForm(id));

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      className="rounded p-0.5"
      onClick={handleFormDelete}
      onKeyDown={handleFormDelete}
    >
      <MdDelete />
    </Button>
  );
}
