import { Env, useBuilder, useCanvas, useClipboard } from "@fibr/builder";
import { Canvas as FormBuilderCanvas } from "@fibr/shared";

import type { PropsWithChildren, ReactNode } from "react";
import { FieldPadding } from "./FieldPadding";
import { FieldWrapper } from "./FieldWrapper";
import { FormDisplay } from "./FormDisplay";

const BLOCK_WRAPPERS: Record<Env, (props: PropsWithChildren) => ReactNode> = {
  [Env.DEVELOPMENT]: FieldWrapper,
  [Env.PRODUCTION]: FieldPadding,
};

export function Canvas() {
  const currentEnv = useBuilder((state) => state.env.current);
  const select = useCanvas(({ select }) => select);
  const { ref } = useClipboard();

  const handleSelect = () => select({ selectedBlockIds: null });

  return (
    <FormBuilderCanvas
      ref={ref}
      className="min-h-min py-10"
      onClick={handleSelect}
      onKeyDown={handleSelect}
    >
      <div className="w-[500px] space-y-2 rounded">
        <FormDisplay fieldWrapper={BLOCK_WRAPPERS[currentEnv]} />
      </div>
    </FormBuilderCanvas>
  );
}
