import { useBlueprint, useDuckForm, useField } from "duck-form";
import { type PropsWithChildren, useEffect, useId, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export function SettingsPanelWrapper(props: PropsWithChildren) {
  const fieldProps = useField<{
    _update: (values: unknown) => void;
  }>();
  const { generateId } = useDuckForm();
  const { schema } = useBlueprint();

  const autoId = useId();
  const customId = useMemo(
    () => generateId?.(schema, fieldProps),
    [generateId, schema, fieldProps],
  );

  const id = customId ?? autoId;

  const { _update, ...defaultValues } = fieldProps;

  const methods = useForm({ defaultValues });

  const { reset, watch } = methods;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    reset(defaultValues);
    const subscription = watch(_update);

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
