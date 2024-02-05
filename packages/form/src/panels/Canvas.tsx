import { Canvas as SharedCanvas } from "@fibr/shared";
import { Screen } from "@fibr/builder";
import { FormDisplay } from "../components";
import { useBlueprint } from "../providers";

export function Canvas() {
  const select = useBlueprint(({ blocks }) => blocks.select);

  return (
    <SharedCanvas onClick={() => select(null)}>
      <Screen className="flex w-[500px] flex-col items-center justify-center gap-3 rounded">
        <FormDisplay />
      </Screen>
    </SharedCanvas>
  );
}
