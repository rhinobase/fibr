import { Canvas } from "@fibr/shared";
import { FormDisplay } from "./FormDisplay";
import { useFormBuilder } from "@fibr/providers";

export function FormBuilderCanvas() {
  const select = useFormBuilder(({ block }) => block.select);

  return (
    <Canvas onClick={() => select(null)}>
      <div className="flex w-[500px] flex-col items-center justify-center gap-3 rounded">
        <FormDisplay />
      </div>
    </Canvas>
  );
}
