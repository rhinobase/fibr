import { Box, Flex, Text } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { type Block, type BlockType, eventHandler } from "@fibr/builder";
import type { RangeTuple } from "fuse.js";
import { highlightMatches } from "./utils";

export type PaletteCard = Block & {
  isOverlay?: boolean;
  enableDragging?: boolean;
  onSelect?: (props: Omit<BlockType, "id">) => void;
  matches?: RangeTuple[];
};

export function PaletteCard({
  onSelect,
  matches,
  enableDragging = false,
  isOverlay = false,
  ...block
}: PaletteCard) {
  const { type, label, icon: Icon, presets } = block;

  const { attributes, listeners, isDragging, setNodeRef } = useDraggable({
    id: `${type}-${label}`,
    data: block,
  });

  const draggableProps = enableDragging
    ? {
        ref: setNodeRef,
        ...attributes,
        ...listeners,
      }
    : { role: "button", tabIndex: 0 };

  const handleSelect = eventHandler(() => onSelect?.({ type, ...presets }));

  return (
    <Box
      w="72px"
      onClick={handleSelect}
      onKeyDown={handleSelect}
      {...draggableProps}
    >
      <Flex
        cursor={
          isOverlay || isDragging
            ? "grabbing"
            : enableDragging
              ? "grab"
              : "pointer"
        }
        h="69px"
        alignItems="center"
        justifyContent="center"
        rounded={4}
        bgColor="white"
        borderWidth={1}
        borderColor="gray.300"
        _hover={{ borderColor: "gray.500" }}
        transition="all"
        transitionDuration="150ms"
      >
        <Icon height={25} width={25} opacity={0.6} />
      </Flex>
      {!isOverlay && (
        <Text
          mt={1}
          userSelect={enableDragging ? "none" : "auto"}
          textColor="GrayText"
          textAlign="center"
          fontSize="0.75rem"
          textTransform="capitalize"
        >
          {matches ? highlightMatches(label, matches) : label}
        </Text>
      )}
    </Box>
  );
}
