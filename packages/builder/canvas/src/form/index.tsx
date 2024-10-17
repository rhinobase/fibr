import { useCanvas, useClipboard } from "@fibr/builder";
import { Canvas } from "@fibr/shared";
import { FormDisplay } from "./FormDisplay";

export type FormBuilderCanvas = FormDisplay;

export function FormBuilderCanvas(props: FormBuilderCanvas) {
  const select = useCanvas(({ select }) => select);
  const { ref } = useClipboard();

  const handleSelect = () => select({ selectedBlockIds: null });

  return (
    <Canvas
      ref={ref}
      className="py-10"
      onClick={handleSelect}
      onKeyDown={handleSelect}
    >
      <div className="w-[500px] space-y-2 rounded">
        <FormDisplay {...props} />
      </div>
    </Canvas>
  );
}
