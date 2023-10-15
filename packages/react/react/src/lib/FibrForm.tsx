import { HTMLAttributes, ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { BlueprintProvider, BlueprintContext } from "./providers";
import { classNames } from "@rafty/ui";

export type FibrForm<T> = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  onError?: SubmitErrorHandler<FieldValues>;
} & Pick<BlueprintContext<T>, "blueprint"> &
  Pick<HTMLAttributes<HTMLFormElement>, "className" | "style">;

export function FibrForm<T>({
  blueprint,
  onSubmit,
  onError,
  ...props
}: FibrForm<T>) {
  // Adding provider for forms
  const methods = useForm({
    resolver: blueprint.validation,
    defaultValues: blueprint.default_values,
  });

  return (
    <BlueprintProvider blueprint={blueprint}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit, onError)}
          {...props}
          className={classNames("space-y-3", props.className)}
        >
          {props.children}
        </form>
      </FormProvider>
    </BlueprintProvider>
  );
}
