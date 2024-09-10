import { Box } from "@chakra-ui/react";
import { useBlocks } from "@fibr/builder";
import { useThread } from "@fibr/react";
import type { PropsWithChildren } from "react";
import type { Node } from "reactflow";

export function NodeWrapper(props: PropsWithChildren) {
  const { selected, type } = useThread<Node>();
  const allowedEdgesType = useBlocks(({ config }) =>
    Object.entries(config).reduce<string[]>((prev, [name, block]) => {
      if (block.metadata?.node_type === "edge") prev.push(name);

      return prev;
    }, []),
  );

  if (allowedEdgesType.includes(type)) return props.children;

  return (
    <Box
      p={2}
      borderWidth="1px"
      h="100%"
      w="100%"
      bg="white"
      borderColor={selected ? "primary.500" : "transparent"}
    >
      {props.children}
    </Box>
  );
}
