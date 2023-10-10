import { FormProvider, useForm } from "react-hook-form";
import { BlueprintProvider, BlueprintStoreState } from "./providers";
import { ReactNode } from "react";
import _ from "lodash";
import { DEFAULT_COMPONENTS } from "./DEFAULT_COMPONENTS";

export type Fiber<T> = {
  children: ReactNode;
  components?: BlueprintStoreState<T>["components"];
} & Pick<BlueprintStoreState<T>, "blueprint">;

export function Fiber<T>({ children, blueprint, components = {} }: Fiber<T>) {
  // Adding provider for forms
  const methods = useForm({
    resolver: blueprint.validation,
    defaultValues: blueprint.default_values,
  });

  const _components = _.merge(DEFAULT_COMPONENTS, components);

  return (
    <FormProvider {...methods}>
      <BlueprintProvider blueprint={blueprint} components={_components}>
        {children}
      </BlueprintProvider>
    </FormProvider>
  );
}
