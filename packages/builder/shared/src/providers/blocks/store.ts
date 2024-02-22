import { create } from "zustand";
import type { Block, Config } from "../../types";

export type BlocksStore = {
  blocks: Record<string, Block[]>;
  config: Record<string, Config>;
};

export const createBlocksStore = (props: BlocksStore) =>
  create<BlocksStore>(() => props);
