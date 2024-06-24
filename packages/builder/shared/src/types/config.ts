import type { ReactNode } from "react";

export type Config = {
  builder: () => ReactNode;
  settings?: () => ReactNode;
  actions?: () => ReactNode;
  metadata?: {
    node_type?: "edge" | "node";
  };
};
