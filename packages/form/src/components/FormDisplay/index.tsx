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
  const { all, get, activeForm } = useBlueprint(
    ({ blocks, active, forms }) => ({
      all: blocks.all,
      activeForm: active.form,
      get: forms.get,
    }),
  );

  const current = useBuilder((state) => state.env.current);

  if (!activeForm) return <>No Active Form</>;

  const form = get(activeForm);

  if (!form) throw new Error(`Unable to get the form with Id ${activeForm}`);

  const allBlocks = all(activeForm);

  return (
    <WeaverProvider wrapper={BLOCK_WRAPERS[current]}>
      <DndWrapper items={allBlocks.map(({ id }) => id)}>
        <Loom id={activeForm} blueprint={form} />
      </DndWrapper>
    </WeaverProvider>
  );
}
