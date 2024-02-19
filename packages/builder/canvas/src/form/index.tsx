import { useCanvas } from "@fibr/providers";
import { Canvas } from "@fibr/shared";
import { FormDisplay } from "./FormDisplay";

export function FormBuilderCanvas() {
  const select = useCanvas(({ select }) => select);

  return (
    <Canvas className="min-h-min py-10" onClick={() => select(null)}>
      <div className="w-[500px] space-y-2 rounded">
        <FormDisplay />
      </div>
    </Canvas>
  );
}
