import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import {
  type BlockType,
  Settings as BuilderSettings,
  useBlocks,
  useCanvas,
} from "@fibr/builder";
import { FibrProvider, Thread } from "@fibr/react";
import { classNames } from "@rafty/ui";
import { type ReactNode, useMemo } from "react";

export type Settings = BuilderSettings;

export function Settings({ style, className, ...props }: Settings) {
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
          opacity={0.6}
          textAlign="right"
          fontSize="sm"
          fontStyle="italic"
        >{`${selectedBlocksLength} components selected`}</Text>
        <Box borderRadius="4px" borderWidth="1px" px="2" background="white">
          {selectedBlocks.map(({ id }, index) => (
            <Text
              key={id}
              py="0.5"
              fontSize="sm"
              color="GrayText"
              borderTop={
                index !== 0 ? "1px solid rgba(128,128,128,0.2)" : "none"
              }
            >
              {id}
            </Text>
          ))}
        </Box>
        <Flex justify="space-between">
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
        </Flex>
      </>
    );

  const selectedBlockId =
    selectedBlocksLength === 1 ? selectedBlocks[0].id : undefined;

  if (isSettingsPanelActive)
    return (
      <BuilderSettings
        {...props}
        className={classNames("absolute w-96 p-3", className)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          borderLeft: 1,
          background: "white",
          ...style,
        }}
      >
        <Flex w="100%" align="center" justify="space-between">
          <Heading as="h4">Settings</Heading>
          <Text
            title={selectedBlockId}
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            fontSize="sm"
            fontWeight={500}
            opacity={0.6}
            fontStyle="italic"
            maxW="240px"
          >
            {selectedBlockId}
          </Text>
        </Flex>
        <Divider />
        {component}
      </BuilderSettings>
    );
}
