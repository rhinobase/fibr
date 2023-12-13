"use client";
import { classNames } from "@rafty/ui";
import React from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";
import { Fields } from "./Fields";
import {
  BlueprintProvider,
  useComponents,
  type BlueprintContext,
} from "./providers";

export type FibrForm<T extends FieldValues> = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
} & Pick<BlueprintContext<T>, "blueprint"> &
  Pick<React.HTMLAttributes<HTMLFormElement>, "className" | "style">;

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
    defaultValues: blueprint.default_values as any,
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
          className={classNames("space-y-3", className)}
        >
          {children ?? <Fields />}
        </form>
      </FormProvider>
    </BlueprintProvider>
  );
}
