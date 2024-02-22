import { Thread, ThreadType, useThread } from "@fibr/react";
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

export type Canvas = {
  onSubmit?: SubmitHandler<FieldValues>;
  onError?: SubmitErrorHandler<FieldValues>;
} & {
  blocks?: Record<string, ThreadType>;
};

export function Canvas() {
  // Getting component config
  const config = useThread<Canvas>();
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
            <Thread key={id} id={id} {...field} />
          ))}
      </form>
    </FormProvider>
  );
}
