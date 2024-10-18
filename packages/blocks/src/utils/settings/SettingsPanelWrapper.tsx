import { useField } from "duck-form";
import { useEffect, type PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

export function SettingsPanelWrapper(props: PropsWithChildren) {
  const { _update, id, ...defaultValues } = useField<{
    _update: (values: unknown) => void;
    id: string;
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

  return (
    <FormProvider {...methods}>
      <div className="grid grid-cols-3 items-center gap-2">
        {props.children}
      </div>
    </FormProvider>
  );
}
