import { useReducer, useState } from 'react';
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
  Text,
  classNames,
} from '@rafty/ui';
import { HiChevronUpDown, HiXMark } from 'react-icons/hi2';
import { HiCheck } from 'react-icons/hi';
import { useFormContext } from 'react-hook-form';
import { findLabel } from './ComboboxField';
import { FStringFieldType, FStringListType } from '@fiber/core';
import { FieldsType } from '../../providers';

export function MultiSelectField({
  name,
  field,
}: FieldsType<FStringFieldType>) {
  const { setValue, register } = useFormContext();

  register(name);

  const [isOpen, setOpen] = useState(false);

  const [selected, dispatch] = useReducer(
    (
      prev: { label: string; value: string | number }[],
      cur: string | number | undefined
    ) => {
      if (!cur) return [];

      const index = prev.findIndex((item) => item.value == cur);

      if (index === -1)
        prev.push({
          label: findLabel(cur, field?.options?.list ?? []) ?? 'No Label',
          value: field?.type === 'number' ? Number(cur) : cur,
        });
      else prev.splice(index, 1);

      setOpen(false);
      setValue(
        name,
        prev.map(({ value }) => value)
      );

      return [...prev];
    },
    []
  );

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger
        isDisabled={field.readOnly as boolean}
        variant="outline"
        role="combobox"
        aria-expanded={isOpen}
        className="relative w-full justify-between"
        rightIcon={
          <HiChevronUpDown
            className={classNames(
              isOpen
                ? 'text-primary-500 dark:text-primary-400'
                : 'text-secondary-500 dark:text-secondary-400',
              'shrink-0'
            )}
          />
        }
      >
        {selected.length === 0 ? (
          `Select ${name}`
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {selected.map(({ label, value }, i) => (
              <div
                key={i}
                className="bg-secondary-100 dark:bg-secondary-800 flex items-center gap-1 rounded py-0.5 pl-1.5 pr-0.5"
              >
                <Text className="text-xs leading-none">{label}</Text>
                <div
                  className="dark:focus:ring-secondary-100 dark:focus:ring-offset-secondary-900 rounded-sm p-0.5 text-red-500 hover:bg-red-200/40 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-1 dark:text-red-300 dark:hover:bg-red-300/10"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    dispatch(value);
                  }}
                >
                  <HiXMark size={13} />
                </div>
              </div>
            ))}
          </div>
        )}
        <div
          className={classNames(
            selected.length > 1 ? 'visible' : 'invisible',
            'absolute right-8 rounded p-0.5',
            'dark:focus:ring-secondary-100 dark:focus:ring-offset-secondary-900 text-red-500 hover:bg-red-200/40 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-1 dark:text-red-300 dark:hover:bg-red-300/10'
          )}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            dispatch(undefined);
            setOpen(false);
          }}
        >
          <HiXMark />
        </div>
      </PopoverTrigger>
      <PopoverContent className="!w-[380px] !p-0 md:!w-[700px] lg:!w-[770px]">
        <Command>
          <CommandInput placeholder={`Search ${name}`} />
          <CommandList>
            {field?.options && (
              <Options
                items={field?.options.list}
                selected={selected}
                dispatch={dispatch}
              />
            )}
            <CommandEmpty>No data found</CommandEmpty>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function Options({
  items,
  selected,
  dispatch,
}: {
  items: FStringListType<string>[];
  selected: {
    label: string;
    value: string | number;
  }[];
  dispatch: React.Dispatch<string>;
}) {
  const components: JSX.Element[] = [];

  items.forEach(({ label, value }, index) => {
    if (typeof value == 'string' || typeof value == 'number')
      components.push(
        <CommandItem
          key={index}
          value={String(value)}
          onSelect={dispatch}
          className="justify-between"
        >
          {label}
          {selected.find((item) => item.value === value) && <HiCheck />}
        </CommandItem>
      );
    else
      components.push(
        <CommandGroup key={index} heading={label}>
          <Options items={value} selected={selected} dispatch={dispatch} />
        </CommandGroup>
      );
  });

  return <>{components}</>;
}
