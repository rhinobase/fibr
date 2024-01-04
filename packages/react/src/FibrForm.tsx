"use client";
import { HTMLAttributes, PropsWithChildren } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Fields } from "./Fields";
import { BlueprintProvider, useFibr } from "./providers";
import { Blueprint } from "./types";

export type FibrForm<
  TFieldValues extends FieldValues,
  TContext,
> = PropsWithChildren<
  {
    onSubmit: SubmitHandler<TFieldValues>;
    onError?: SubmitErrorHandler<TFieldValues>;
  } & Blueprint<TFieldValues, TContext> &
    Pick<HTMLAttributes<HTMLFormElement>, "className" | "style">
>;

export function FibrForm<TFieldValues extends FieldValues, TContext>({
  blueprint,
  onSubmit,
  onError,
  className,
  style,
  children,
  ...props
}: FibrForm<TFieldValues, TContext>) {
  const { onError: defaultErrorHandler } = useFibr();

  // Adding provider for forms
  const methods = useForm(props);

  return (
    <BlueprintProvider blueprint={blueprint}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(
            onSubmit,
            onError ?? defaultErrorHandler,
          )}
          style={style}
          className={className}
        >
          {children ?? <Fields />}
        </form>
      </FormProvider>
    </BlueprintProvider>
  );
}
