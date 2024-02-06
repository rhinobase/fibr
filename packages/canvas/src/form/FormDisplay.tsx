import { Loom, WeaverProvider } from "@fibr/react";
import { useFormBuilder } from "@fibr/providers";
import { FieldWrapper } from "./FieldWrapper";
import { Env, useBuilder } from "@fibr/builder";
import type { PropsWithChildren } from "react";
import { DndWrapper } from "@fibr/shared";
import { Text } from "@rafty/ui";

const BLOCK_WRAPPERS: Record<Env, (props: PropsWithChildren) => JSX.Element> = {
  [Env.DEVELOPMENT]: FieldWrapper,
  [Env.PRODUCTION]: (props) => <>{props.children}</>,
};

export function FormDisplay() {
  const { getAllBlocks, getForm, activeForm, selectBlock, moveBlock } =
    useFormBuilder(({ blocks, active, forms }) => ({
      getAllBlocks: blocks.all,
      activeForm: active.form,
      getForm: forms.get,
      selectBlock: blocks.select,
      moveBlock: blocks.move,
    }));

  const current = useBuilder((state) => state.env.current);

  if (!activeForm)
    return (
      <div className="w-full p-2">
        <div className="w-full rounded-lg border-2 border-dashed p-6 text-center">
          <Text isMuted className="select-none font-medium">
            No Active Form
          </Text>
        </div>
      </div>
    );

  const form = getForm(activeForm);

  if (!form) throw new Error(`Unable to get the form with Id ${activeForm}`);

  const allBlocks = getAllBlocks(activeForm);

  return (
    <WeaverProvider wrapper={BLOCK_WRAPPERS[current]}>
      <DndWrapper
        items={allBlocks.map(({ id }) => id)}
        onDragStart={({ active }) => selectBlock(String(active.id))}
        onDragEnd={({ active, over }) => {
          if (over && active.id !== over.id && activeForm)
            moveBlock(activeForm, String(active.id), String(over.id));
        }}
      >
        <Loom id={activeForm} blueprint={form} />
      </DndWrapper>
    </WeaverProvider>
  );
}
