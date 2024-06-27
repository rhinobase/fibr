import { create } from "zustand";
import type { Block, Config } from "../../types";

export type BlocksStoreProps = {
  blocks: Record<string, Block[]>;
  config: Record<string, Config>;
};

export type BlocksStore = BlocksStoreProps & {
  validateSchema: <T extends { type: string }>(schema: T | T[]) => boolean;
};

export const createBlocksStore = (props: BlocksStoreProps) =>
  create<BlocksStore>((_, get) => ({
    ...props,
    validateSchema: (schema) => {
      const blocks = get().config;

      const items = Array.isArray(schema) ? schema : [schema];

      // Checking if all the blocks in the schema are present
      for (const item of items) if (!(item.type in blocks)) return false;

      return true;
    },
  }));
