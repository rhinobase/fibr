import {
  Divider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  chakra,
} from "@chakra-ui/react";
import {
  type Block,
  SidebarItem,
  SidebarTrigger,
  useBlocks,
} from "@fibr/builder";
import {
  MagnifyingGlassIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { Tooltip, TooltipContent, TooltipTrigger } from "@rafty/ui";
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
      trigger={
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <SidebarTrigger
                value="palette"
                className="hover:text-secondary-700 data-[state=active]:bg-primary-100 data-[state=active]:hover:bg-primary-100 dark:hover:text-secondary-100 text-secondary-600 dark:text-secondary-400 dark:data-[state=active]:text-secondary-100 data-[disabled]:text-secondary-400 dark:data-[disabled]:text-secondary-600 data-[state=active]:border-primary-500 dark:data-[state=active]:border-primary-300 dark:data-[state=active]:bg-secondary-800 -mr-px rounded border-r-2 border-transparent p-2 font-medium transition-colors ease-in-out data-[disabled]:cursor-not-allowed data-[orientation=vertical]:border-r-0 data-[state=active]:text-black"
              >
                <Squares2X2Icon strokeWidth={2} width={20} height={20} />
              </SidebarTrigger>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">Palette</TooltipContent>
        </Tooltip>
      }
      className="h-full w-full flex-col text-black data-[state=active]:flex dark:text-white"
    >
      <chakra.div p={3}>
        <Heading as="h4" mb={3} size="md" fontWeight={500}>
          Palette
        </Heading>
        <Divider />
      </chakra.div>
      <chakra.div h="100%" overflowY="auto">
        <Flex direction="column" h="100%" px={3} pb={3}>
          <chakra.div
            backgroundColor="white"
            position="sticky"
            top={0}
            zIndex={10}
          >
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
        </Flex>
      </chakra.div>
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
