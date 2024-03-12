import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Providers } from "./Providers";

export const metadata: Metadata = {
  title: "Playground",
};

export default function PlaygroundLayout(props: PropsWithChildren) {
  return <Providers>{props.children}</Providers>;
}
