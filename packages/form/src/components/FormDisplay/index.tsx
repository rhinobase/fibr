import { Loom, WeaverProvider } from "@fibr/react";
import { useBlueprint } from "../../providers";
import { FieldWrapper } from "./FieldWrapper";
import { Env, useBuilder } from "@fibr/builder";
import type { PropsWithChildren } from "react";
import { DndWrapper } from "../../utils";

const FIELD_WRAPERS: Record<Env, (props: PropsWithChildren) => JSX.Element> = {
  [Env.DEVELOPMENT]: FieldWrapper,
  [Env.PRODUCTION]: (props) => <>{props.children}</>,
};

export function FormDisplay() {
  const { fields, active, forms } = useBlueprint();

  const {
    env: { current },
  } = useBuilder();

  if (!active.form) return <>No Active Form</>;

  const form = forms.get(active.form);

  if (!form) throw new Error(`Unable to get the form with Id ${active.form}`);

  const allFields = fields.all(active.form);

  return (
    <WeaverProvider wrapper={FIELD_WRAPERS[current]}>
      <DndWrapper items={allFields.map(({ id }) => id)}>
        <Loom id={active.form} blueprint={form} />
      </DndWrapper>
    </WeaverProvider>
  );
}
