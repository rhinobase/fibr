import { useFormContext } from 'react-hook-form';
import { Checkbox, ErrorMessage, Text } from '@rafty/ui';
import { FStringFieldType, FStringListType } from '@fiber/core';
import { FieldsType } from '../../providers';
import { useCallback } from 'react';

export function CheckboxField({ name, field }: FieldsType<FStringFieldType>) {
  const { register, setValue, getValues } = useFormContext();
  register(name);

  const dispatch = useCallback(
    (value: string | number) => {
      const prev = (getValues(name) ?? []) as (string | number)[];

      // Checking if value exist
      const index = prev.findIndex((item) => item === value);

      // Adding the new value
      if (index === -1)
        prev.push(field?.type === 'number' ? Number(value) : value);
      // Removing the value
      else prev.splice(index, 1);

      setValue(name, prev);
    },
    [name, field?.type, setValue, getValues]
  );

  if (field.options)
    return (
      <Options
        items={field.options.list}
        name={name}
        dispatch={dispatch}
        visible={field.readOnly}
      />
    );
  return <ErrorMessage>Error!</ErrorMessage>;
}

function Options({
  items,
  name,
  visible,
  dispatch,
}: {
  items: FStringListType<string>[];
  name: string;
  visible: boolean | (() => boolean) | undefined;
  dispatch: React.Dispatch<string>;
}) {
  const components: JSX.Element[] = [];

  items.forEach(({ label, value }, index) => {
    if (typeof value == 'string' || typeof value == 'number')
      components.push(
        <Checkbox
          isReadOnly={visible as boolean}
          key={index}
          onCheckedChange={() => dispatch(value)}
          id={label}
        >
          {label}
        </Checkbox>
      );
    else
      components.push(
        <div key={index} className="space-y-1">
          <Text className="text-sm font-medium opacity-70">{label}</Text>
          <Options
            items={value}
            name={name}
            dispatch={dispatch}
            visible={visible}
          />
        </div>
      );
  });

  return <div className="space-y-2">{components}</div>;
}
