import { useCanvas } from "@fibr/providers";
import { Canvas } from "@fibr/shared";
import { FormDisplay } from "./FormDisplay";

export function FormBuilderCanvas() {
  const select = useCanvas(({ block }) => block.select);

  return (
    <Canvas className="py-10" onClick={() => select(null)}>
      <div className="w-[500px] rounded bg-white">
        <FormDisplay />
      </div>
    </Canvas>
  );
}
