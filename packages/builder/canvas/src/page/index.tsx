import { useFormBuilder } from "@fibr/providers";
import { Canvas } from "@fibr/shared";

export function PageCanvas() {
  const select = useFormBuilder(({ block }) => block.select);

  return (
    <Canvas className="py-10" onClick={() => select(null)}>
      <div className="flex w-[500px] flex-col items-center justify-center gap-3 rounded">
        Page Builder
      </div>
    </Canvas>
  );
}
