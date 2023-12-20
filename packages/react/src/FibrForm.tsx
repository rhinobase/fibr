"use client";
import { HTMLAttributes, PropsWithChildren } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Fields } from "./Fields";
import {
  BlueprintContextType,
  BlueprintProvider,
  useComponents,
} from "./providers";

export type FibrForm<T extends FieldValues> = PropsWithChildren<{
  onSubmit: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
}> &
  Pick<BlueprintContextType<T>, "blueprint"> &
  Pick<HTMLAttributes<HTMLFormElement>, "className" | "style">;

export function FibrForm<T extends FieldValues>({
  blueprint,
  onSubmit,
  onError,
  className,
  children,
  ...props
}: FibrForm<T>) {
  const { onError: defaultErrorHandler } = useComponents();
  // Adding provider for formsz
  const methods = useForm({
    resolver: blueprint.validation,
    defaultValues: blueprint.default_values as DefaultValues<T>,
  });

  return (
    <BlueprintProvider blueprint={blueprint}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(
            onSubmit,
            onError ?? defaultErrorHandler,
          )}
          {...props}
          className={`space-y-3 ${className ?? ""}`.trim()}
        >
          {children ?? <Fields />}
        </form>
      </FormProvider>
    </BlueprintProvider>
  );
}
