import { HTMLAttributes, ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { BlueprintProvider, BlueprintStoreState } from "./providers";
import { classNames } from "@rafty/ui";

export type FiberForm<T> = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  onError?: SubmitErrorHandler<FieldValues>;
} & Pick<BlueprintStoreState<T>, "blueprint"> &
  Pick<HTMLAttributes<HTMLFormElement>, "className" | "style">;

export function FiberForm<T>(props: FiberForm<T>) {
  // Adding provider for forms
  const methods = useForm({
    resolver: props.blueprint.validation,
    defaultValues: props.blueprint.default_values,
  });

  return (
    <BlueprintProvider blueprint={props.blueprint}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(props.onSubmit, props.onError)}
          className={classNames("space-y-3", props.className)}
          style={props.style}
        >
          {props.children}
        </form>
      </FormProvider>
    </BlueprintProvider>
  );
}
