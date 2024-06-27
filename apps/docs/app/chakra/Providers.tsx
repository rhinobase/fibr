"use client";
import { ChakraProvider } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
