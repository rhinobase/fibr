import {
  type BlockType,
  DEFAULT_GROUP,
  groupByParentNode,
  useCanvas,
} from "@fibr/builder";
import { DndWrapper } from "@fibr/shared";
import { Blueprint, DuckField } from "duck-form";
import { FieldOverlay } from "./FieldOverlay";

export type FormDisplay = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  fieldWrapper?: any;
};

export function FormDisplay({ fieldWrapper }: FormDisplay) {
  const { blocks, select, move } = useCanvas(({ schema, select, move }) => ({
    blocks: schema.filter((block) => !block.hidden),
    select,
    move,
  }));

  const groups = groupByParentNode(blocks);
  const blueprint = createBlueprint(DEFAULT_GROUP, groups);

  if (!groups[DEFAULT_GROUP])
    return (
      <div className="m-2 rounded-lg border-2 border-dashed p-6 text-center">
        <p className="select-none font-medium opacity-60">No Active Canvas</p>
      </div>
    );

  return (
    <Blueprint schema={blueprint} wrapper={fieldWrapper}>
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
        {Object.entries(blueprint).map(([id, canvas]) => {
          // console.log(canvas);

          return <DuckField key={id} id={id} {...canvas} />;
        })}
        <FieldOverlay />
      </DndWrapper>
    </Blueprint>
  );
}

type BlueprintType = Record<
  string,
  Omit<BlockType, "id"> & { fields?: BlueprintType }
>;

function createBlueprint(
  key: string,
  context: Record<string, BlockType[] | undefined>,
) {
  const blueprint: BlueprintType = {};

  const blocks = context[key];

  if (blocks)
    for (const { id, ...block } of blocks) {
      blueprint[id] = block;

      if (id in context) blueprint[id].fields = createBlueprint(id, context);
    }

  return blueprint;
}
