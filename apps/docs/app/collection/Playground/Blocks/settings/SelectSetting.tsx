import { Button, Label, ListItem, OrderedList, eventHandler } from "@rafty/ui";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FaArrowRotateLeft, FaPlus, FaTrash } from "react-icons/fa6";
import { SettingInput, SettingSwitch, SettingsPanelWrapper } from "./utils";

const ID = "options";

export function SelectSetting() {
  return (
    <SettingsPanelWrapper>
      <Label>Label</Label>
      <SettingInput name="label" />
      <Label>Description</Label>
      <SettingInput name="description" />
      <Label>Required</Label>
      <SettingSwitch name="required" />
      <SelectOptions />
    </SettingsPanelWrapper>
  );
}

function SelectOptions() {
  const { control } = useFormContext();

  const { fields, append, remove, replace } = useFieldArray({
    name: ID,
    control,
  });

  const handleAddItem = eventHandler(() => append({}));
  const onDeleteAll = eventHandler(() => replace([]));

  return (
    <>
      <div className="col-span-3 flex items-center justify-between">
        <Label>Options</Label>
        <div className="flex items-center justify-end gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={onDeleteAll}
            onKeyDown={onDeleteAll}
          >
            <FaArrowRotateLeft size={14} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleAddItem}
            onKeyDown={handleAddItem}
          >
            <FaPlus size={14} />
          </Button>
        </div>
      </div>
      <div className="col-span-3">
        <OrderedList className="border-secondary-300 dark:border-secondary-700 space-y-2.5 rounded-md border p-2">
          {fields.length > 0 ? (
            fields.map((_, index) => {
              const handleDelete = eventHandler(() => remove(index));

              return (
                <ListItem
                  key={`${index}-${ID}`}
                  className="flex items-center justify-between gap-2"
                >
                  {`${index + 1}.`}
                  <Label>Label</Label>
                  <SettingInput name={`${ID}.${index}.label`} />
                  <Label>Value</Label>
                  <SettingInput name={`${ID}.${index}.value`} />
                  <Button
                    variant="ghost"
                    size="icon"
                    colorScheme="error"
                    onClick={handleDelete}
                    onKeyDown={handleDelete}
                  >
                    <FaTrash size={14} />
                  </Button>
                </ListItem>
              );
            })
          ) : (
            <p className="text-secondary-500 dark:text-secondary-400 text-center">
              No Options
            </p>
          )}
        </OrderedList>
      </div>
    </>
  );
}
