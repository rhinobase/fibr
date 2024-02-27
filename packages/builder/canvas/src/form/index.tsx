import { useCanvas, useClipboard } from "@fibr/providers";
import { Canvas } from "@fibr/shared";
import { FormDisplay } from "./FormDisplay";

export function FormBuilderCanvas() {
  const select = useCanvas(({ select }) => select);
  const { pasteRef } = useClipboard();

  return (
    <Canvas
      ref={pasteRef}
      className="min-h-min py-10"
      onClick={() => select({ selectedBlockIds: null })}
    >
      <div className="w-[500px] space-y-2 rounded">
        <FormDisplay />
      </div>
    </Canvas>
  );
}
