import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Playground",
};

export default function PlaygroundLayout({ children }: PropsWithChildren) {
  return children;
}
