import { useReducer, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  classNames,
} from "@rafty/ui";
import { HiChevronUpDown } from "react-icons/hi2";
import { Controller, useFormContext } from "react-hook-form";
import { FStringFieldType, FStringListType } from "@fiber/core";
import { HiCheck } from "react-icons/hi";
import { FieldsType } from "../../types";

export function findLabel(
  value: string | number,
  items: FStringListType<string>[]
) {
  let label: string | undefined;
  for (const item of items) {
    if (typeof item.value == "string" || typeof item.value == "number") {
      if (value == item.value) label = item.label;
    } else label = findLabel(value, item.value);

    if (label) return label;
  }
}

export function ComboboxField({ name, field }: FieldsType<FStringFieldType>) {
  const [isOpen, setOpen] = useState(false);

  const [selected, dispatch] = useReducer(
    (
      prev: { label: string; value: string | number } | undefined,
      cur: string
    ) => {
      const _value = prev?.value === cur ? undefined : cur;

      const value = field?.type === "number" ? Number(_value) : _value;

      setOpen(false);
      // setValue(name, value);

      if (value)
        return {
          label: findLabel(value, field?.options?.list ?? []) ?? "No Label",
          value,
        };

      return undefined;
    },
    undefined
  );

  return (
    <Controller
      name={name}
      render={() => (
        <Popover open={isOpen} onOpenChange={setOpen}>
          <PopoverTrigger
            isDisabled={field.readOnly as boolean}
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="w-full justify-between"
            rightIcon={
              <HiChevronUpDown
                className={classNames(
                  isOpen
                    ? "text-primary-500 dark:text-primary-400"
                    : "text-secondary-500 dark:text-secondary-400",
                  "shrink-0"
                )}
              />
            }
          >
            {selected?.label ?? `Select ${name}`}
          </PopoverTrigger>
          <PopoverContent className="!w-[380px] !p-0 md:!w-[700px] lg:!w-[770px]">
            <Command>
              <CommandInput placeholder={`Search ${name}`} />
              <CommandList>
                {field.options && (
                  <Options
                    items={field.options.list}
                    selected={selected}
                    dispatch={dispatch}
                  />
                )}
                <CommandEmpty>No data found</CommandEmpty>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  );
}

function Options({
  items,
  selected,
  dispatch,
}: {
  items: FStringListType<string>[];
  selected?: {
    label: string;
    value: string | number;
  };
  dispatch: React.Dispatch<string>;
}) {
  const components: JSX.Element[] = [];

  items.forEach(({ label, value }, index) => {
    if (typeof value == "string" || typeof value == "number")
      components.push(
        <CommandItem
          key={index}
          value={String(value)}
          onSelect={dispatch}
          className="justify-between"
        >
          {label} {selected?.value === value && <HiCheck />}
        </CommandItem>
      );
    else
      components.push(
        <CommandGroup key={index} heading={label}>
          <Options items={value} selected={selected} dispatch={dispatch} />
        </CommandGroup>
      );
  });

  return components;
}
