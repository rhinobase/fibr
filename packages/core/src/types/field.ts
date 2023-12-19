export type FFieldType<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  type: string;
  label?: string;
  description?: string;
  hidden?: boolean | (() => boolean);
  readOnly?: boolean | (() => boolean);
  required?: boolean | (() => boolean);
  // For Object
  fieldset?: string;
  group?: string;
  // For storing data
  options?: T;
};
