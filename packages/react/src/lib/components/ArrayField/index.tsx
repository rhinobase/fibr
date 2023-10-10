import { FArrayFieldType } from '@fiber/core';
import { FieldWrapper } from '../FieldWrapper';
import { ListField } from './ListField';
import { FieldsType } from '../../providers';
import { classNames } from '@rafty/ui';

export function ArrayFields({ name, field }: FieldsType<FArrayFieldType>) {
  const required = field.required as boolean | undefined;

  return (
    <FieldWrapper
      required={required}
      name={name}
      label={field.label}
      description={field.description}
      className={classNames(field.hidden ? 'hidden' : 'flex')}
    >
      <ListField name={name} field={field} />
    </FieldWrapper>
  );
}
