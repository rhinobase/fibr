import { useDroppable } from "@dnd-kit/core";
import { useCanvas } from "@fibr/providers";
import { WeaverProvider } from "@fibr/react";
import { Canvas, CustomControls } from "@fibr/shared";
import { FormProvider, useForm } from "react-hook-form";
import { Diagram } from "./Diagram";
import { NodeWrapper } from "./NodeWrapper";

export function PageCanvas() {
  const methods = useForm();
  const select = useCanvas(({ select }) => select);
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <FormProvider {...methods}>
      <Canvas ref={setNodeRef} onClick={() => select({ selectedBlockIds: [] })}>
        <div className="flex h-full w-full bg-white">
          <WeaverProvider wrapper={NodeWrapper}>
            <Diagram />
          </WeaverProvider>
        </div>
        <CustomControls />
      </Canvas>
    </FormProvider>
  );
}
