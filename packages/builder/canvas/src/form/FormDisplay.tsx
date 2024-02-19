import {
  BaseBlockType,
  BaseBlockWithIdType,
  Env,
  useBuilder,
} from "@fibr/providers";
import { useCanvas } from "@fibr/providers";
import { Loom, WeaverProvider } from "@fibr/react";
import { DEFAULT_GROUP, DndWrapper, groupByParentNode } from "@fibr/shared";
import { type PropsWithChildren, type ReactNode } from "react";
import { FieldPadding } from "./FieldPadding";
import { FieldWrapper } from "./FieldWrapper";
import { FieldOverlay } from "./FieldOverlay";
import { Text } from "@rafty/ui";

const BLOCK_WRAPPERS: Record<Env, (props: PropsWithChildren) => ReactNode> = {
  [Env.DEVELOPMENT]: FieldWrapper,
  [Env.PRODUCTION]: FieldPadding,
};

export function FormDisplay() {
  const { all, select, move } = useCanvas(({ all, select, move }) => ({
    all,
    select,
    move,
  }));

  const currentEnv = useBuilder((state) => state.env.current);

  const allBlocks = all();
  const groups = groupByParentNode(allBlocks);
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
        items={allBlocks.map(({ id }) => id)}
        onDragStart={({ active }) => select(active.id.toString())}
        onDragEnd={({ active, over }) => {
          if (over && active.id !== over.id)
            move(String(active.id), String(over.id));
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
  BaseBlockType<{ label?: string }, { blocks?: Blueprint }>
>;

function createBlueprint(
  key: string,
  context: Record<string, BaseBlockWithIdType[] | undefined>,
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
