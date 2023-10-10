import { FArrayFieldType } from '@fiber/core';
import { FieldsType } from '../../providers';
import { ArrayFieldWrapper } from './ArrayFieldWrapper';
import { RenderField } from '../../RenderField';

export function ListField({ name, field }: FieldsType<FArrayFieldType>) {
  return (
    <ArrayFieldWrapper name={name}>
      {({ index }) => (
        <RenderField name={`${name}.${index}`} field={field.of} />
      )}
    </ArrayFieldWrapper>
  );
}
