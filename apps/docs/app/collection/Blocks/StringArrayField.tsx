import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Button,
  FieldWrapper,
  InputField,
  ListItem,
  OrderedList,
  eventHandler,
} from "@rafty/ui";
import { useBlueprint, useDuckForm, useField } from "duck-form";
import { useId, useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export function StringArrayField() {
  const props = useField();
  const { generateId } = useDuckForm();
  const { schema } = useBlueprint();

  const autoId = useId();
  const customId = useMemo(
    () => generateId?.(schema, props),
    [generateId, schema, props],
  );

  const id = customId ?? autoId;

  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: id,
    control,
  });

  const addField = eventHandler(() => append({}));

  return (
    <>
      <OrderedList className="mt-3 space-y-3 empty:hidden">
        {fields.map((field, index) => {
          const handleDelete = eventHandler(() => remove(index));

          return (
            <ListItem key={field.id} className="ml-6 list-outside p-1 md:p-0">
              <div className="flex items-center gap-2 md:ml-2 md:gap-2.5 lg:gap-3">
                <div className="flex w-full flex-col gap-2">
                  <FieldWrapper name={`${id}.${index}.name`}>
                    <InputField {...register(`${id}.${index}.name`)} />
                  </FieldWrapper>
                </div>
                <Button
                  colorScheme="error"
                  variant="ghost"
                  size="icon"
                  className="p-2"
                  onClick={handleDelete}
                  onKeyDown={handleDelete}
                >
                  <TrashIcon className="size-[18px] stroke-2" />
                </Button>
              </div>
            </ListItem>
          );
        })}
      </OrderedList>
      <Button
        onClick={addField}
        onKeyDown={addField}
        leftIcon={<PlusIcon className="size-[18px] stroke-2" />}
        variant="outline"
        className="mt-3 w-max"
      >
        Add
      </Button>
    </>
  );
}
