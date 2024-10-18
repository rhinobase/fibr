import { useThread } from "@fibr/react";
import { type PropsWithChildren, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export function SettingsWrapper(props: PropsWithChildren) {
  const { _update, id, ...defaultValues } = useThread<{
    _update: (values: unknown) => void;
  }>();

  const methods = useForm({ defaultValues });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    methods.reset(defaultValues);
    const subscription = methods.watch(_update);

    return () => {
      subscription.unsubscribe();
    };
  }, [id]);

  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
