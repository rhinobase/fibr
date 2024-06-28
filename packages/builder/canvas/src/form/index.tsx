import { useCanvas, useClipboard } from "@fibr/builder";
import { Canvas } from "@fibr/shared";
import { FormDisplay } from "./FormDisplay";

export type FormBuilderCanvas = {
  fieldWrapper?: FormDisplay["fieldWrapper"];
};

export function FormBuilderCanvas({ fieldWrapper }: FormBuilderCanvas) {
  const select = useCanvas(({ select }) => select);
  const { ref } = useClipboard();

  const handleSelect = () => select({ selectedBlockIds: null });

  return (
    <Canvas
      ref={ref}
      className="min-h-min py-10"
      onClick={handleSelect}
      onKeyDown={handleSelect}
    >
      <div className="w-[500px] space-y-2 rounded">
        <FormDisplay fieldWrapper={fieldWrapper} />
      </div>
    </Canvas>
  );
}
