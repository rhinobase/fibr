import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  chakra,
} from "@chakra-ui/react";
import { type Block, SidebarItem, useBlocks } from "@fibr/builder";
import {
  MagnifyingGlassIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Fuse, { type RangeTuple } from "fuse.js";
import { useMemo, useState } from "react";
import { PaletteCard } from "./PaletteCard";
import { PaletteCardOverlay } from "./PaletteCardOverlay";

export type Palette = {
  onSelect: PaletteCard["onSelect"];
} & Pick<PaletteCard, "enableDragging">;

export function Palette({ enableDragging = false, onSelect }: Palette) {
  const blocks = useBlocks((state) => state.blocks);
  const [search, setSearch] = useState("");

  const fuse = useMemo(() => {
    const data = Object.entries(blocks).flatMap(([category, blocks]) =>
      blocks.map((block) => ({ category, ...block })),
    );

    return new Fuse(data, {
      keys: ["type", "label"],
      includeMatches: true,
    });
  }, [blocks]);

  let blockResults = blocks;
  let isEmpty = false;

  if (search) {
    const init = Object.keys(blocks).reduce<Record<string, Block[]>>(
      (prev, cur) => {
        prev[cur] = [];
        return prev;
      },
      {},
    );

    const results = fuse.search(search);

    if (results.length === 0) isEmpty = true;

    blockResults = results.reduce<
      Record<string, (Block & { matches?: RangeTuple[] })[]>
    >((prev, cur) => {
      const { item, matches } = cur;

      prev[item.category].push({
        icon: item.icon,
        label: item.label,
        type: item.type,
        private: item.private,
        presets: item.presets,
        matches: matches
          ?.filter((match) => match.key === "label")
          .flatMap((match) => match.indices),
      });
      return prev;
    }, init);
  }

  return (
    <SidebarItem
      name="palette"
      label="Palette"
      icon={<Squares2X2Icon strokeWidth={2} width={20} height={20} />}
    >
      <chakra.div backgroundColor="white" position="sticky" top={0} zIndex={10}>
        <InputGroup size="sm">
          <InputLeftElement pointerEvents="none" p={2}>
            <MagnifyingGlassIcon
              height="100%"
              width="100%"
              strokeWidth={2}
              strokeOpacity={0.6}
            />
          </InputLeftElement>
          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            autoComplete="off"
            rounded={6}
          />
        </InputGroup>
      </chakra.div>
      {isEmpty ? (
        <Flex direction="column" flex={1} justifyContent="center">
          <Empty
            title="Component Not Found"
            description="Please check your spelling and try again, or explore our other available components."
          />
        </Flex>
      ) : (
        Object.entries(blockResults).map(
          ([category, components]) =>
            components.length > 0 && (
              <chakra.div key={category} pb={3}>
                <Heading as="h3" fontSize="sm" fontWeight={600}>
                  {category}
                </Heading>
                <Flex mt={2.5} flexWrap="wrap" gap={2.5}>
                  {components.map((block, index) => (
                    <PaletteCard
                      key={`${index}-${block.type}`}
                      {...block}
                      enableDragging={enableDragging}
                      onSelect={onSelect}
                    />
                  ))}
                </Flex>
              </chakra.div>
            ),
        )
      )}
      {enableDragging && <PaletteCardOverlay />}
    </SidebarItem>
  );
}

type Empty = {
  title: string;
  description: string;
};

function Empty({ title, description }: Empty) {
  return (
    <Flex
      width="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={1}
      userSelect="none"
      p={3}
      textAlign="center"
      fontWeight={500}
      textColor="GrayText"
    >
      <Text fontSize="lg">{title}</Text>
      <Text fontSize="sm" lineHeight={1.25}>
        {description}
      </Text>
    </Flex>
  );
}
