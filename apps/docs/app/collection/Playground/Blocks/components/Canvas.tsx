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
  blocks?: Record<string, Record<string, unknown>>;
};

export function Canvas() {
  // Getting component config
  const config = useField<Canvas>();
  const { blocks, onSubmit, onError } = config;

  // Adding provider for forms
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit ?? console.log, onError)}
        className="space-y-3"
        autoComplete="off"
      >
        {blocks &&
          Object.entries(blocks).map(([id, field]) => (
            <DuckField key={id} id={id} {...field} />
          ))}
      </form>
    </FormProvider>
  );
}
