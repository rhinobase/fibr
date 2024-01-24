import { Canvas as BuilderCanvas, Screen } from "@fibr/builder";
import { AddFieldCard, FormDisplay } from "../components";

export function Canvas() {
  return (
    <BuilderCanvas>
      <Screen className="flex w-[500px] flex-col items-center justify-center gap-3 p-5">
        <FormDisplay />
        <AddFieldCard />
      </Screen>
    </BuilderCanvas>
  );
}
