import { Canvas as BuilderCanvas, Screen } from "@fibr/builder";
import { FormDisplay } from "../components";

export function Canvas() {
  return (
    <BuilderCanvas>
      <Screen className="flex w-[500px] flex-col items-center justify-center gap-3">
        <FormDisplay />
      </Screen>
    </BuilderCanvas>
  );
}
