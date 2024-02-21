import { Settings as BuilderSettings } from "@fibr/builder";
import { useCanvas, type BlockType } from "@fibr/providers";
import { FibrProvider, Thread } from "@fibr/react";
import { Button, Text } from "@rafty/ui";
import { ReactNode, useMemo } from "react";
import { useBlocks } from "../providers";

export function Settings() {
  const { blocks, update } = useCanvas(({ schema, get, update }) => ({
    blocks: schema.filter((block) => block.selected),
    get,
    update,
  }));

  const config = useBlocks((state) => state.config);

  const settingBuilders = useMemo(
    () =>
      Object.entries(config).reduce<Record<string, () => ReactNode>>(
        (prev, [name, { settings }]) => {
          prev[name] = settings;
          return prev;
        },
        {},
      ),
    [config],
  );

  const activeBlocksLength = blocks.length;
  const block = blocks[0];

  if (block)
    return (
      <BuilderSettings className="flex flex-col gap-3">
        {activeBlocksLength > 1 ? (
          <>
            <Text
              isMuted
              className="text-right italic"
            >{`${activeBlocksLength} components selected`}</Text>
            <div className="bg-secondary-50 divide-y rounded border px-2">
              {blocks.map(({ id }) => (
                <Text key={id} className="text-secondary-600 py-0.5 text-sm">
                  {id}
                </Text>
              ))}
            </div>
            <div className="flex justify-between">
              <Button colorScheme="error" size="sm">
                Delete
              </Button>
              <Button size="sm">Duplicate</Button>
            </div>
          </>
        ) : (
          <FibrProvider plugins={settingBuilders}>
            <Thread
              {...block}
              _update={(values: Partial<BlockType>) =>
                update({ blockId: block.id, values })
              }
            />
          </FibrProvider>
        )}
      </BuilderSettings>
    );
}
