import { Env, useBuilder } from "@fibr/builder";
import { FormBuilderCanvas } from "@fibr/canvas";
import type { PropsWithChildren, ReactNode } from "react";
import { FieldWrapper } from "@fibr/shared";
import { FieldPadding } from "./FieldPadding";

const BLOCK_WRAPPERS: Record<Env, (props: PropsWithChildren) => ReactNode> = {
  [Env.DEVELOPMENT]: FieldWrapper,
  [Env.PRODUCTION]: FieldPadding,
};

export function Canvas() {
  const currentEnv = useBuilder((state) => state.env.current);

  return <FormBuilderCanvas fieldWrapper={BLOCK_WRAPPERS[currentEnv]} />;
}
