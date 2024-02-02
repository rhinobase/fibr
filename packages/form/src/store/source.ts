import { create } from "zustand";
import { Category } from "../utils";
import { Block } from "../types";

export type SourceStore = {
  blocks: Record<Category, Block[]>;
};

export const createSourceStore = ({ blocks }: SourceStore) => {
  return create<SourceStore>(() => ({
    blocks,
  }));
};
