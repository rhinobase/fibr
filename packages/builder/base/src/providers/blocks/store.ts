import { create } from "zustand";
import type { Block, Config } from "../../types";

export type BlocksStoreProps = Omit<BlocksStore, "validateSchema"> & {
  validateSchema?: <T extends { type: string }>(options: {
    schema: T | T[];
    config: Record<string, Config>;
  }) => boolean;
};

export type BlocksStore = {
  blocks: Record<string, Block[]>;
  config: Record<string, Config>;
  validateSchema: <T extends { type: string }>(schema: T | T[]) => boolean;
};

export const createBlocksStore = (props: BlocksStoreProps) =>
  create<BlocksStore>((_, get) => ({
    ...props,
    validateSchema: (schema) => {
      const config = get().config;

      if (props.validateSchema) return props.validateSchema({ schema, config });

      const items = Array.isArray(schema) ? schema : [schema];

      // Checking if all the blocks in the schema are present in the config
      for (const item of items) if (!(item.type in config)) return false;

      return true;
    },
  }));
