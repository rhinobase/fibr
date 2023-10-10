export type FFieldType = {
  type: string;
  label?: string;
  description?: string;
  hidden?: boolean | (() => boolean);
  readOnly?: boolean | (() => boolean);
  required?: boolean | (() => boolean);
  // For Nested Fields
  parent?: FFieldType;
  // // For Object
  fieldset?: string;
  group?: string;
};
