import {
  Settings as BuilderSettings,
  useBlocks,
  useCanvas,
  type BlockType,
} from "@fibr/builder";
import { Button, Text, classNames } from "@rafty/ui";
import { Blueprint, DuckField, DuckForm } from "duck-form";
import { useMemo, type ReactNode } from "react";

export type Settings = BuilderSettings;

export function Settings({ className, ...props }: Settings) {
  const { selectedBlocks, updateBlock, removeBlock, duplicateBlock } =
    useCanvas(({ schema, update, remove, duplicate }) => ({
      selectedBlocks: schema.filter((block) => block.selected),
      updateBlock: update,
      removeBlock: remove,
      duplicateBlock: duplicate,
    }));

  const config = useBlocks((state) => state.config);

  const settingBuilders = useMemo(
    () =>
      Object.entries(config).reduce<Record<string, () => ReactNode>>(
        (prev, [name, { settings }]) => {
          if (settings) prev[name] = settings;
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
      <DuckForm
        components={settingBuilders}
        generateId={(_, props) => (props.id ? String(props.id) : undefined)}
      >
        <Blueprint>
          <DuckField
            {...block}
            _update={(values: Partial<BlockType>) =>
              updateBlock({
                blockId: block.id,
                updatedValues: values,
              })
            }
          />
        </Blueprint>
      </DuckForm>
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
            onClick={() => removeBlock({ blockIds: ids })}
            colorScheme="error"
            size="sm"
          >
            Delete
          </Button>
          <Button
            onClick={() => duplicateBlock({ originalBlockIds: ids })}
            size="sm"
          >
            Duplicate
          </Button>
        </div>
      </>
    );

  const selectedBlockId =
    selectedBlocksLength === 1 ? selectedBlocks[0].id : undefined;

  if (isSettingsPanelActive)
    return (
      <BuilderSettings
        {...props}
        className={classNames(
          "border-secondary-200 dark:border-secondary-800 dark:bg-secondary-950 absolute right-0 top-0 flex h-full w-96 flex-col gap-3 border-l bg-white p-3",
          className,
        )}
      >
        <div className="flex w-full items-center justify-between">
          <h4 className="font-medium">Settings</h4>
          <p
            title={selectedBlockId}
            className="max-w-60 truncate text-sm font-medium italic opacity-60"
          >
            {selectedBlockId}
          </p>
        </div>
        <hr className="dark:border-secondary-700 border-secondary-200" />
        <div className="overflow-y-auto pr-2">{component}</div>
      </BuilderSettings>
    );
}
