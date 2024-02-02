import { Canvas as BuilderCanvas, Screen } from "@fibr/builder";
import { FormDisplay } from "../components";
import { useBlueprint } from "../providers";

export function Canvas() {
  const {
    blocks: { select },
  } = useBlueprint();
  return (
    <BuilderCanvas onClick={() => select(null)}>
      <Screen className="flex w-[500px] flex-col items-center justify-center gap-3">
        <FormDisplay />
      </Screen>
    </BuilderCanvas>
  );
}
