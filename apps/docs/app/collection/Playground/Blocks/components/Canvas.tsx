import { DuckField, useField } from "duck-form";
import {
  type FieldValues,
  FormProvider,
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from "react-hook-form";

export type Canvas = {
  onSubmit?: SubmitHandler<FieldValues>;
  onError?: SubmitErrorHandler<FieldValues>;
} & {
  fields?: Record<string, Record<string, unknown>>;
};

export function Canvas() {
  // Getting component config
  const config = useField<Canvas>();
  const { fields, onSubmit, onError } = config;

  // Adding provider for forms
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit ?? console.log, onError)}
        className="space-y-3"
        autoComplete="off"
      >
        {fields &&
          Object.entries(fields).map(([id, field]) => (
            <DuckField key={id} id={id} {...field} />
          ))}
      </form>
    </FormProvider>
  );
}
