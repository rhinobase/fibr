import { useThread } from "@fibr/react";
import { PropsWithChildren, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export function SettingsPanelWrapper({ children }: PropsWithChildren) {
  const { _update, ...defaultValues } = useThread<{
    _update: (values: unknown) => void;
  }>();

  const methods = useForm({ defaultValues });

  const subscription = methods.watch(_update);

  useEffect(() => {
    const id = methods.getValues("id");
    if (id !== defaultValues.id) methods.reset(defaultValues);

    return () => {
      subscription.unsubscribe();
    };
  }, [defaultValues, methods]);

  return (
    <FormProvider {...methods}>
      <div className="grid grid-cols-3 items-center gap-2">{children}</div>
    </FormProvider>
  );
}
