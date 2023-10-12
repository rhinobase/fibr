import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { BlueprintProvider, BlueprintStoreState } from "./providers";

export type FiberForm<T> = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  onError?: SubmitErrorHandler<FieldValues>;
} & Pick<BlueprintStoreState<T>, "blueprint">;

export function FiberForm<T>(props: FiberForm<T>) {
  // Adding provider for forms
  const methods = useForm({
    resolver: props.blueprint.validation,
    defaultValues: props.blueprint.default_values,
  });

  return (
    <BlueprintProvider blueprint={props.blueprint}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(props.onSubmit, props.onError)}>
          {props.children}
        </form>
      </FormProvider>
    </BlueprintProvider>
  );
}
