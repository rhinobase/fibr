import { Loom, WeaverProvider } from "@fibr/react";
import { useBlueprint } from "../../providers";
import { FieldWrapper } from "./FieldWrapper";
import { Env, useBuilder } from "@fibr/builder";
import type { PropsWithChildren } from "react";
import { DndWrapper } from "../../utils";

const BLOCK_WRAPERS: Record<Env, (props: PropsWithChildren) => JSX.Element> = {
  [Env.DEVELOPMENT]: FieldWrapper,
  [Env.PRODUCTION]: (props) => <>{props.children}</>,
};

export function FormDisplay() {
  const {
    blocks: { all },
    active,
    forms,
  } = useBlueprint();

  const getEnv = useBuilder((state) => state.env.current);

  const current = getEnv();

  if (!active.form) return <>No Active Form</>;

  const form = forms.get(active.form);

  if (!form) throw new Error(`Unable to get the form with Id ${active.form}`);

  const allBlocks = all(active.form);

  return (
    <WeaverProvider wrapper={BLOCK_WRAPERS[current]}>
      <DndWrapper items={allBlocks.map(({ id }) => id)}>
        <Loom id={active.form} blueprint={form} />
      </DndWrapper>
    </WeaverProvider>
  );
}
