import { Settings as BuilderSettings } from "@fibr/builder";
import { useCanvas, type BlockType } from "@fibr/providers";
import { FibrProvider, Thread } from "@fibr/react";
import { Button, Text } from "@rafty/ui";
import { ReactNode, useMemo } from "react";
import { useBlocks } from "../providers";

export function Settings() {
  const { active, get, update } = useCanvas(({ active, get, update }) => ({
    active,
    get,
    update,
  }));

  const blockId = active[0];
  const block = get({ blockId });

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

  const activeBlocks = active.length;

  if (block)
    return (
      <BuilderSettings className="flex flex-col gap-3">
        {activeBlocks > 1 ? (
          <>
            <Text
              isMuted
              className="text-right italic"
            >{`${activeBlocks} components selected`}</Text>
            <div className="bg-secondary-50 divide-y rounded border px-2">
              {active.map((id) => (
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
              id={blockId}
              {...block}
              _update={(values: Partial<BlockType>) =>
                update({ blockId, values })
              }
            />
          </FibrProvider>
        )}
      </BuilderSettings>
    );
}
