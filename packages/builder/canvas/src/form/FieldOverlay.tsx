import { DragOverlay, useDndContext } from "@dnd-kit/core";
import { Thread, type ThreadType } from "@fibr/react";
import { FormProvider, useForm } from "react-hook-form";

export function FieldOverlay() {
  const dummyForm = useForm();
  const { active } = useDndContext();

  return (
    <FormProvider {...dummyForm}>
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
  );
}
