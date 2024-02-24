import { Settings as BuilderSettings } from "@fibr/builder";
import { type BlockType, useCanvas } from "@fibr/providers";
import { FibrProvider, Thread } from "@fibr/react";
import { Button, Text } from "@rafty/ui";
import { ReactNode, useMemo } from "react";
import { useBlocks } from "../providers";

export function Settings() {
  const { selectedBlocks, updateBlock, remove, duplicate } = useCanvas(
    ({ schema, update, remove, duplicate }) => ({
      selectedBlocks: schema.filter((block) => block.selected),
      updateBlock: update,
      remove,
      duplicate,
    }),
  );

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

  const selectedBlocksLength = selectedBlocks.length;
  const isSettingsPanelActive = selectedBlocksLength > 0;

  const ids = selectedBlocks.map(({ id }) => id);

  let component: JSX.Element;

  if (selectedBlocksLength === 1) {
    const block = selectedBlocks[0];
    component = (
      <FibrProvider plugins={settingBuilders}>
        <Thread
          {...block}
          _update={(values: Partial<BlockType>) =>
            updateBlock({
              blockId: block.id,
              updatedValues: values,
            })
          }
        />
      </FibrProvider>
    );
  } else
    component = (
      <>
        <Text
          isMuted
          className="text-right text-sm italic"
        >{`${selectedBlocksLength} components selected`}</Text>
        <div className="bg-secondary-50 dark:bg-secondary-900 dark:border-secondary-800 dark:divide-secondary-800 divide-y rounded border px-2">
          {selectedBlocks.map(({ id }) => (
            <Text
              key={id}
              className="text-secondary-600 dark:text-secondary-400 py-0.5 text-sm"
            >
              {id}
            </Text>
          ))}
        </div>
        <div className="flex justify-between">
          <Button
            onClick={() => remove({ blockIds: ids })}
            colorScheme="error"
            size="sm"
          >
            Delete
          </Button>
          <Button
            onClick={() => duplicate({ originalBlockIds: ids })}
            size="sm"
          >
            Duplicate
          </Button>
        </div>
      </>
    );

  if (isSettingsPanelActive)
    return (
      <BuilderSettings className="flex flex-col gap-3">
        {component}
      </BuilderSettings>
    );
}
