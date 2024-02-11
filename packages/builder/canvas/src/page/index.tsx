import { useFormBuilder } from "@fibr/providers";
import { Canvas } from "@fibr/shared";
import { Diagram } from "./Diagram";
import { useDroppable } from "@dnd-kit/core";
import { FormProvider, useForm } from "react-hook-form";
import { Controls } from "reactflow";

export function PageCanvas() {
  const methods = useForm();
  const select = useFormBuilder(({ block }) => block.select);
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
          <Diagram />
        </div>
        <Controls />
      </Canvas>
    </FormProvider>
  );
}
