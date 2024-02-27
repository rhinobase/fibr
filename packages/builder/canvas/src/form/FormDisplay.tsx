import { type BlockType, Env, useBuilder } from "@fibr/providers";
import { useCanvas, DEFAULT_GROUP, groupByParentNode } from "@fibr/providers";
import { Loom, WeaverProvider } from "@fibr/react";
import { DndWrapper } from "@fibr/shared";
import { Text } from "@rafty/ui";
import type { PropsWithChildren, ReactNode } from "react";
import { FieldOverlay } from "./FieldOverlay";
import { FieldPadding } from "./FieldPadding";
import { FieldWrapper } from "./FieldWrapper";

const BLOCK_WRAPPERS: Record<Env, (props: PropsWithChildren) => ReactNode> = {
  [Env.DEVELOPMENT]: FieldWrapper,
  [Env.PRODUCTION]: FieldPadding,
};

export function FormDisplay() {
  const { blocks, select, move } = useCanvas(({ schema, select, move }) => ({
    blocks: schema.filter((block) => !block.hidden),
    select,
    move,
  }));

  const currentEnv = useBuilder((state) => state.env.current);

  const groups = groupByParentNode(blocks);
  const blueprint = createBlueprint(DEFAULT_GROUP, groups);

  if (!groups[DEFAULT_GROUP])
    return (
      <div className="m-2 rounded-lg border-2 border-dashed p-6 text-center">
        <Text isMuted className="select-none font-medium">
          No Active Canvas
        </Text>
      </div>
    );

  return (
    <WeaverProvider wrapper={BLOCK_WRAPPERS[currentEnv]}>
      <DndWrapper
        items={blocks.map(({ id }) => id)}
        onDragStart={({ active }) => {
          select({
            selectedBlockIds: active.data.current?.id,
          });
        }}
        onDragEnd={({ active, over }) => {
          if (over && active.id !== over.id)
            move({
              sourceBlockId: active.data.current?.id,
              targetBlockId: over.data.current?.id,
            });
        }}
      >
        {Object.entries(blueprint).map(([id, canvas]) => (
          <Loom key={id} id={id} blueprint={canvas} />
        ))}
        <FieldOverlay />
      </DndWrapper>
    </WeaverProvider>
  );
}

type Blueprint = Record<
  string,
  Omit<BlockType<{ label?: string }>, "id"> & { blocks?: Blueprint }
>;

function createBlueprint(
  key: string,
  context: Record<string, BlockType[] | undefined>,
) {
  const blueprint: Blueprint = {};

  const blocks = context[key];

  if (blocks)
    for (const { id, ...block } of blocks) {
      blueprint[id] = block;

      if (id in context) blueprint[id].blocks = createBlueprint(id, context);
    }

  return blueprint;
}
