import type { ReactNode } from "react";

export type Config = {
  builder: () => ReactNode;
  settings: () => ReactNode;
};
