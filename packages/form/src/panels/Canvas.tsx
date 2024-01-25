import {
  Canvas as BuilderCanvas,
  ENV,
  Screen,
  useBuilder,
} from "@fibr/builder";
import { AddFieldCard, FormDisplay } from "../components";

export function Canvas() {
  const { env } = useBuilder();

  return (
    <BuilderCanvas>
      <Screen className="flex w-[500px] flex-col items-center justify-center gap-3 p-5">
        <FormDisplay />
        {env.current === ENV.DEVELOPMENT && <AddFieldCard />}
      </Screen>
    </BuilderCanvas>
  );
}
