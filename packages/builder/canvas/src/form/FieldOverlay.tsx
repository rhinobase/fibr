import { DragOverlay, useDndContext } from "@dnd-kit/core";
import { Thread, type ThreadType } from "@fibr/react";
import { Portal } from "@fibr/shared";
import { FormProvider, useForm } from "react-hook-form";

export function FieldOverlay() {
  const methods = useForm();
  const { active } = useDndContext();

  return (
    <Portal>
      <FormProvider {...methods}>
        <DragOverlay dropAnimation={null}>
          {active?.data && (
            <Thread
              id={String(active.id)}
              isOverlay
              {...(active.data.current as ThreadType)}
            />
          )}
        </DragOverlay>
      </FormProvider>
    </Portal>
  );
}
