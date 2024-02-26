import { useDroppable } from "@dnd-kit/core";
import { WeaverProvider } from "@fibr/react";
import { Canvas, CustomControls } from "@fibr/shared";
import { FormProvider, useForm } from "react-hook-form";
import { Diagram } from "./Diagram";
import { NodeWrapper } from "./NodeWrapper";

export function PageCanvas() {
  const methods = useForm();
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <FormProvider {...methods}>
      <Canvas ref={setNodeRef}>
        <div className="dark:bg-secondary-950 flex h-full w-full bg-white">
          <WeaverProvider wrapper={NodeWrapper}>
            <Diagram />
          </WeaverProvider>
        </div>
        <CustomControls />
      </Canvas>
    </FormProvider>
  );
}
