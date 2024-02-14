import { Thread, ThreadType, useThread } from "@fibr/react";
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

export type Form = {
  onSubmit?: SubmitHandler<FieldValues>;
  onError?: SubmitErrorHandler<FieldValues>;
} & {
  title: string;
  blocks: Map<string, ThreadType>;
}; // & UseFormProps<FieldValues, unknown>;

export function Form() {
  // Getting component config
  const config = useThread<Form>();
  const { blocks, onSubmit, onError, id, type, title, ...props } = config;

  // Adding provider for forms
  const methods = useForm(props);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit ?? console.log, onError)}
        className="space-y-3"
      >
        {Array.from(blocks.entries()).map(([id, field]) => (
          <Thread key={id} id={id} {...field} />
        ))}
      </form>
    </FormProvider>
  );
}
