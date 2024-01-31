import { Loom, WeaverProvider } from "@fibr/react";
import { useBlueprint } from "../../providers";
import { FieldWrapper } from "./FieldWrapper";
import { Env, useBuilder } from "@fibr/builder";
import type { PropsWithChildren } from "react";
import { DndWrapper } from "../../utils";
import { f } from "@fibr/blocks";

const FIELD_WRAPERS: Record<Env, (props: PropsWithChildren) => JSX.Element> = {
  [Env.DEVELOPMENT]: FieldWrapper,
  [Env.PRODUCTION]: (props) => <>{props.children}</>,
};

export function FormDisplay() {
  const {
    fields: { fields },
  } = useBlueprint();
  const {
    env: { current },
  } = useBuilder();

  return (
    <WeaverProvider wrapper={FIELD_WRAPERS[current]}>
      <DndWrapper items={Array.from(fields.keys())}>
        <Loom
          blueprint={f.form({
            onSubmit: console.log,
            blocks: Object.fromEntries(fields),
          })}
        />
      </DndWrapper>
    </WeaverProvider>
  );
}
