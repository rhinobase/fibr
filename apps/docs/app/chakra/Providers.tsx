"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#D0E6FF",
      100: "#B9DAFF",
      200: "#A2CDFF",
      300: "#7AB8FF",
      400: "#2E90FF",
      500: "#0078FF",
      600: "#0063D1",
      700: "#0052AC",
      800: "#003C7E",
      900: "#002C5C",
    },
  },
});

export function Providers({ children }: PropsWithChildren) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
