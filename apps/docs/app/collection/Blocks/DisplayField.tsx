import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  FieldWrapper,
  InputField,
  Select,
  SelectItem,
  Switch,
  eventHandler,
} from "@rafty/ui";
import { useBlueprint, useDuckForm, useField } from "duck-form";
import { useId, useMemo } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

export enum Order {
  ASC = "-1",
  DESC = "1",
}

export function DisplayField() {
  const props = useField();
  const { generateId } = useDuckForm();
  const { schema } = useBlueprint();

  const autoId = useId();
  const customId = useMemo(
    () => generateId?.(schema, props),
    [generateId, schema, props],
  );

  const id = customId ?? autoId;

  const { control, register, watch } = useFormContext();

  const { fields, append, remove, swap, insert } = useFieldArray({
    name: id,
    control,
  });

  const addField = eventHandler(() => append({}));

  return (
    <>
      {fields.map((field, index) => {
        const handleGoUp = eventHandler(() => swap(index, index - 1));
        const handleGoDown = eventHandler(() => swap(index, index + 1));
        const handleInsertNew = eventHandler(() => insert(index + 1, {}));
        const handleDelete = eventHandler(() => remove(index));

        const toggleValue = watch(`${id}.${index}.toggle`);

        return (
          <div
            key={field.id}
            className="border-secondary-300 dark:border-secondary-700 mt-3 rounded-md border"
          >
            <div className="flex w-full items-center">
              <div className="space-y-3 px-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleGoUp}
                  onKeyDown={handleGoUp}
                  isDisabled={index === 0}
                >
                  <ArrowUpIcon className="size-[18px] stroke-2" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleGoDown}
                  onKeyDown={handleGoDown}
                  isDisabled={index === fields.length - 1}
                >
                  <ArrowDownIcon className="size-[18px] stroke-2" />
                </Button>
              </div>
              <div className="border-secondary-300 dark:border-secondary-700 flex-1 border-l border-r">
                {toggleValue ? (
                  <div className="grid w-full grid-cols-2 gap-3 p-3">
                    <FieldWrapper
                      name={`${id}.${index}.name`}
                      label="Field Name"
                    >
                      <InputField {...register(`${id}.${index}.name`)} />
                    </FieldWrapper>
                    <FieldWrapper name={`${id}.${index}.value`} label="Value">
                      <InputField {...register(`${id}.${index}.value`)} />
                    </FieldWrapper>
                    <FieldWrapper name={`${id}.${index}.title`} label="Label">
                      <InputField {...register(`${id}.${index}.title`)} />
                    </FieldWrapper>
                    <FieldWrapper
                      name={`${id}.${index}.order`}
                      label="Order"
                      className="[&>div>div]:w-full"
                    >
                      <Select
                        {...register(`${id}.${index}.order`)}
                        placeholder="Select Order"
                        className="dark:[&>select]:bg-secondary-950"
                        onPointerDownCapture={(event) => {
                          event.stopPropagation();
                        }}
                        onKeyDownCapture={(event) => {
                          event.stopPropagation();
                        }}
                        onClickCapture={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        <SelectItem value={Order.ASC}>ASC</SelectItem>
                        <SelectItem value={Order.DESC}>DESC</SelectItem>
                      </Select>
                    </FieldWrapper>
                  </div>
                ) : (
                  <FieldWrapper
                    name={`${id}.${index}.name`}
                    label="Field Name"
                    className="p-3"
                  >
                    <InputField {...register(`${id}.${index}.name`)} />
                  </FieldWrapper>
                )}
                <FieldWrapper
                  name={`${id}.${index}.toggle`}
                  label="Advance Field"
                  orientation="row-reverse"
                  className="border-secondary-300 dark:border-secondary-700 relative border-t p-4"
                >
                  <Controller
                    name={`${id}.${index}.toggle`}
                    render={({
                      field: { name, onChange, value, ...props },
                    }) => (
                      <Switch
                        {...props}
                        name={name}
                        id={name}
                        checked={value}
                        onCheckedChange={onChange}
                        size="sm"
                      />
                    )}
                  />
                </FieldWrapper>
              </div>
              <div className="space-y-3 px-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleInsertNew}
                  onKeyDown={handleInsertNew}
                >
                  <PlusIcon className="size-[18px] stroke-2" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  colorScheme="error"
                  onClick={handleDelete}
                  onKeyDown={handleDelete}
                >
                  <TrashIcon className="size-[18px] stroke-2" />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
      <Button
        leftIcon={<PlusIcon className="size-[18px] stroke-2" />}
        variant="outline"
        className="mt-3 w-max"
        onClick={addField}
        onKeyDown={addField}
      >
        Add
      </Button>
    </>
  );
}
