import { useFormContext } from 'react-hook-form';
import { FDateFieldType } from '@fiber/core';
import { FieldWrapper } from '../FieldWrapper';
import { InputField, classNames } from '@rafty/ui';
import { FieldsType } from '../../providers';

export function DateField({ name, field }: FieldsType<FDateFieldType>) {
  const { register } = useFormContext();

  const readOnly = field.readOnly as boolean | undefined;
  const required = field.required as boolean | undefined;

  return (
    <FieldWrapper
      name={name}
      label={field.label}
      description={field.description}
      className={classNames(field.hidden ? 'hidden' : 'flex')}
      required={required}
    >
      <InputField
        {...register(name, { valueAsDate: true })}
        type="date"
        readOnly={readOnly}
      />
    </FieldWrapper>
  );
}
