import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Providers } from "./Providers";

export const metadata: Metadata = {
  title: "Playground",
};

export default function PlaygroundLayout({ children }: PropsWithChildren) {
  return <Providers>{children}</Providers>;
}
