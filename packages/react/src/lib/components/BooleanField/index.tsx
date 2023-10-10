import { FBooleanFieldType } from '@fiber/core';
import { CheckField } from './CheckField';
import { SwitchField } from './SwitchField';
import { FieldsType } from '../../providers';
import { ErrorMessage, classNames } from '@rafty/ui';
import { useFormContext } from 'react-hook-form';
import _ from 'lodash';

const LAYOUTS = {
  switch: SwitchField,
  checkbox: CheckField,
} as const;

export function BooleanFields({ name, field }: FieldsType<FBooleanFieldType>) {
  const {
    formState: { errors },
  } = useFormContext();

  const error = _.get(errors, name);
  let Component = CheckField;

  if (field.options?.layout) Component = LAYOUTS[field.options.layout];

  return (
    <div className={classNames(field.hidden ? 'hidden' : 'block', 'w-full')}>
      <Component name={name} field={field} />
      {error && <ErrorMessage>{error.message?.toString()}</ErrorMessage>}
    </div>
  );
}
