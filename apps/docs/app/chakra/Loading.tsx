import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { Logo } from "../../components/Logo";

export function LoadingScreen() {
  return (
    <Center h="100vh" w="100%">
      <Flex align="baseline" gap={1}>
        <Logo style={{ height: 32, width: "auto" }} />
        <Box as="span" fontSize={40} fontWeight={700} fontStyle="italic">
          Fibr
        </Box>
      </Flex>
      <Flex position="fixed" bottom={10} left={10} align="center" gap={2}>
        <Spinner size="sm" thickness="1px" />
        <Text fontWeight={500} opacity={0.6}>
          Initializing Editor
        </Text>
      </Flex>
    </Center>
  );
}
