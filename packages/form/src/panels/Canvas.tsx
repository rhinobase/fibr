import { Canvas as SharedCanvas } from "@fibr/shared";
import { Screen } from "@fibr/builder";
import { FormDisplay } from "../components";
import { useFormBuilder } from "@fibr/providers";

export function Canvas() {
  const select = useFormBuilder(({ blocks }) => blocks.select);

  return (
    <SharedCanvas onClick={() => select(null)}>
      <Screen className="flex w-[500px] flex-col items-center justify-center gap-3 rounded">
        <FormDisplay />
      </Screen>
    </SharedCanvas>
  );
}
