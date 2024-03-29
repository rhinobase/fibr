import { useThread } from "@fibr/react";
import { useEffect, type PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

export function SettingsPanelWrapper(props: PropsWithChildren) {
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

  return (
    <FormProvider {...methods}>
      <div className="grid grid-cols-3 items-center gap-2">
        {props.children}
      </div>
    </FormProvider>
  );
}
