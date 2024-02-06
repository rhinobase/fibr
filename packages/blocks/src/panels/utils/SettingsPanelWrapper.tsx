import { useThread } from "@fibr/react";
import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

export function SettingsPanelWrapper({ children }: PropsWithChildren) {
  const defaultValues = useThread();
  const methods = useForm({ defaultValues });

  return (
    <FormProvider {...methods}>
      <div className="grid grid-cols-3 items-center gap-2">{children}</div>
    </FormProvider>
  );
}
