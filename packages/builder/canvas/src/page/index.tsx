import { useCanvas } from "@fibr/providers";
import { Canvas } from "@fibr/shared";
import { Diagram } from "./Diagram";
import { useDroppable } from "@dnd-kit/core";
import { FormProvider, useForm } from "react-hook-form";
import { Controls } from "reactflow";
import { WeaverProvider } from "@fibr/react";
import { NodeWrapper } from "./NodeWrapper";

export function PageCanvas() {
  const methods = useForm();
  const select = useCanvas(({ block }) => block.select);
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <FormProvider {...methods}>
      <Canvas
        ref={setNodeRef}
        className="relative py-10"
        onClick={() => select(null)}
      >
        <div className="flex h-full w-[1080px] flex-col gap-3 rounded bg-white">
          <WeaverProvider wrapper={NodeWrapper}>
            <Diagram />
          </WeaverProvider>
        </div>
        <Controls />
      </Canvas>
    </FormProvider>
  );
}
