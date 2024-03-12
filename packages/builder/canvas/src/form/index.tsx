import { useCanvas, useClipboard } from "@fibr/providers";
import { Canvas } from "@fibr/shared";
import { FormDisplay } from "./FormDisplay";

export function FormBuilderCanvas() {
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
        <FormDisplay />
      </div>
    </Canvas>
  );
}
