import type { PropsWithChildren } from "react";
import { Providers } from "./Providers";

export default function Layout({ children }: PropsWithChildren) {
  return <Providers>{children}</Providers>;
}
