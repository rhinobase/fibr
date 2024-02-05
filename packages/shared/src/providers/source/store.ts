import { create } from "zustand";
import type { Block, Config } from "../../types";

export type SourceStore = {
  blocks: Record<string, Block[]>;
  config: Record<string, Config>;
};

export const createSourceStore = (props: SourceStore) =>
  create<SourceStore>(() => props);
