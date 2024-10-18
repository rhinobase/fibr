import { DragOverlay, useDndContext } from "@dnd-kit/core";
import { Portal } from "@fibr/shared";
import { DuckField } from "duck-form";
import { FormProvider, useForm } from "react-hook-form";

export function FieldOverlay() {
  const methods = useForm();
  const { active } = useDndContext();

  return (
    <Portal>
      <FormProvider {...methods}>
        <DragOverlay dropAnimation={null}>
          {active?.data && (
            <DuckField
              id={String(active.id)}
              isOverlay
              {...active.data.current}
            />
          )}
        </DragOverlay>
      </FormProvider>
    </Portal>
  );
}
