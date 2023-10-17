import { HTMLAttributes, ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  BlueprintProvider,
  BlueprintContext,
  useComponents,
} from "./providers";
import { classNames } from "@rafty/ui";

export type FibrForm<T extends FieldValues> = {
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
} & Pick<BlueprintContext<T>, "blueprint"> &
  Pick<HTMLAttributes<HTMLFormElement>, "className" | "style">;

export function FibrForm<T extends FieldValues>({
  blueprint,
  onSubmit,
  onError,
  ...props
}: FibrForm<T>) {
  const { onError: defaultErrorHandler } = useComponents();
  // Adding provider for formsz
  const methods = useForm({
    resolver: blueprint.validation,
    defaultValues: blueprint.default_values as any,
  });

  return (
    <BlueprintProvider blueprint={blueprint}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(
            onSubmit,
            onError ?? defaultErrorHandler
          )}
          {...props}
          className={classNames("space-y-3", props.className)}
        >
          {props.children}
        </form>
      </FormProvider>
    </BlueprintProvider>
  );
}
