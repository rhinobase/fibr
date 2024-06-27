import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Logo } from "../../components/Logo";
import ChakraLogo from "./ChakraLogo";

export function LoadingScreen() {
  return (
    <Center h="100vh" w="100%">
      <Flex align="center" gap={4}>
        <Flex align="baseline" gap={1}>
          <Logo style={{ height: 32, width: "auto" }} />
          <Box as="span" fontSize={40} fontWeight={700} fontStyle="italic">
            Fibr
          </Box>
        </Flex>
        <XMarkIcon height={22} width={22} strokeWidth={3} opacity={0.7} />
        <Flex align="center" gap={1}>
          <ChakraLogo />
          <Box as="span" fontSize={40} fontWeight={700}>
            chakra
          </Box>
        </Flex>
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
