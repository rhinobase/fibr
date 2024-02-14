import { Env, useBuilder } from "@fibr/builder";
import { useCanvas } from "@fibr/providers";
import { Loom, WeaverProvider } from "@fibr/react";
import { DndWrapper } from "@fibr/shared";
import { Text } from "@rafty/ui";
import { type PropsWithChildren, type ReactNode } from "react";
import { FieldPadding } from "./FieldPadding";
import { FieldWrapper } from "./FieldWrapper";
import { FieldOverlay } from "./FieldOverlay";

const BLOCK_WRAPPERS: Record<Env, (props: PropsWithChildren) => ReactNode> = {
  [Env.DEVELOPMENT]: FieldWrapper,
  [Env.PRODUCTION]: FieldPadding,
};

export function FormDisplay() {
  const { getAllBlocks, getCanvas, activeCanvas, selectBlock, moveBlock } =
    useCanvas(({ block, active, canvas }) => ({
      getAllBlocks: block.all,
      activeCanvas: active.canvas,
      getCanvas: canvas.get,
      selectBlock: block.select,
      moveBlock: block.move,
    }));

  const currentEnv = useBuilder((state) => state.env.current);

  if (!activeCanvas)
    return (
      <div className="m-2 rounded-lg border-2 border-dashed p-6 text-center">
        <Text isMuted className="select-none font-medium">
          No Active Canvas
        </Text>
      </div>
    );

  const canvas = getCanvas(activeCanvas);

  if (!canvas)
    throw new Error(`Unable to get the canvas with Id ${activeCanvas}`);

  const allBlocks = getAllBlocks(activeCanvas);

  return (
    <WeaverProvider wrapper={BLOCK_WRAPPERS[currentEnv]}>
      <DndWrapper
        items={allBlocks.map(({ id }) => id)}
        onDragStart={({ active }) => selectBlock(String(active.id))}
        onDragEnd={({ active, over }) => {
          if (over && active.id !== over.id && activeCanvas)
            moveBlock(activeCanvas, String(active.id), String(over.id));
        }}
      >
        <Loom id={activeCanvas} blueprint={canvas} />
        <FieldOverlay />
      </DndWrapper>
    </WeaverProvider>
  );
}
