import {
  DEFAULT_GROUP,
  Env,
  groupByParentNode,
  useBuilder,
  useCanvas,
  type BlockType,
} from "@fibr/builder";
import { Loom, WeaverProvider } from "@fibr/react";
import { DndWrapper } from "@fibr/shared";
import type { PropsWithChildren, ReactNode } from "react";
import { FieldOverlay } from "./FieldOverlay";
import { FieldPadding } from "./FieldPadding";
import { FieldWrapper } from "./FieldWrapper";

const BLOCK_WRAPPERS: Record<Env, (props: PropsWithChildren) => ReactNode> = {
  [Env.DEVELOPMENT]: FieldWrapper,
  [Env.PRODUCTION]: FieldPadding,
};

export type FormDisplay = {
  fieldWrapper?: WeaverProvider["wrapper"];
};

export function FormDisplay({ fieldWrapper }: FormDisplay) {
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
        <p className="select-none font-medium opacity-60">No Active Canvas</p>
      </div>
    );

  return (
    <WeaverProvider wrapper={fieldWrapper ?? BLOCK_WRAPPERS[currentEnv]}>
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
          <Loom key={id} blueprint={canvas} />
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
