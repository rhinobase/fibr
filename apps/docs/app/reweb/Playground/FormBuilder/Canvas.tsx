import {
  type BlockType,
  DEFAULT_GROUP,
  groupByParentNode,
  useCanvas,
  useClipboard,
} from "@fibr/builder";
import { Loom, useThread } from "@fibr/react";
import { Canvas } from "@fibr/shared";

export function FormBuilderCanvas() {
  const { select, blocks } = useCanvas(({ select, schema }) => ({
    select: select,
    blocks: schema.filter((block) => !block.hidden),
  }));
  const { ref } = useClipboard();

  const groups = groupByParentNode(blocks);
  const blueprint = createBlueprint(DEFAULT_GROUP, groups);

  if (!groups[DEFAULT_GROUP])
    return (
      <div className="m-2 rounded-lg border-2 border-dashed p-6 text-center">
        <p className="select-none font-medium opacity-60">No Active Canvas</p>
      </div>
    );
  const handleSelect = () => select({ selectedBlockIds: null });

  return (
    <Canvas
      ref={ref}
      className="min-h-min py-10"
      onClick={handleSelect}
      onKeyDown={handleSelect}
    >
      <div className="dark:bg-secondary-950 h-full w-[1000px] cursor-pointer space-y-2 rounded bg-white">
        {Object.entries(blueprint).map(([id, canvas]) => (
          <Loom key={id} blueprint={canvas} />
        ))}
      </div>
    </Canvas>
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
