import { Canvas } from "@fibr/shared";
import { Screen } from "@fibr/builder";
import { FormDisplay } from "./FormDisplay";
import { useFormBuilder } from "@fibr/providers";

export function FormBuilderCanvas() {
  const select = useFormBuilder(({ blocks }) => blocks.select);

  return (
    <Canvas onClick={() => select(null)}>
      <Screen className="flex w-[500px] flex-col items-center justify-center gap-3 rounded">
        <FormDisplay />
      </Screen>
    </Canvas>
  );
}
