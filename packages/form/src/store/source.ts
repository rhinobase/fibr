import { create } from "zustand";
import type { Category, Block } from "@fibr/shared";

export type SourceStore = {
  blocks: Record<Category, Block[]>;
};

export const createSourceStore = ({ blocks }: SourceStore) => {
  return create<SourceStore>(() => ({
    blocks,
  }));
};
