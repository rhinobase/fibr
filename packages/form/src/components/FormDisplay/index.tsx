import { Thread, WeaverProvider } from "@fibr/react";
import { useBlueprint } from "../../providers";
import { FieldWrapper } from "./FieldWrapper";
import { ENV, useBuilder } from "@fibr/builder";
import type { PropsWithChildren } from "react";
import { DndWrapper } from "../../utils";

const FIELD_WRAPERS: Record<ENV, (props: PropsWithChildren) => JSX.Element> = {
  [ENV.DEVELOPMENT]: FieldWrapper,
  [ENV.PRODUCTION]: () => <></>,
};

export function FormDisplay() {
  const {
    fields: { all, fields },
  } = useBlueprint();
  const {
    env: { current },
  } = useBuilder();

  const all_fields = all();

  return (
    <WeaverProvider wrapper={FIELD_WRAPERS[current]}>
      <DndWrapper items={Array.from(fields.keys())}>
        {all_fields.map((field) => (
          <Thread key={field.id} {...field} />
        ))}
      </DndWrapper>
    </WeaverProvider>
  );
}
