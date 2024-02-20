import type { ThreadType, ThreadWithIdType } from "@fibr/react";

export type BlockType<
  T = undefined,
  U extends Record<string, unknown> = Record<string, unknown>,
> = ThreadType<
  {
    data?: T;
    hidden?: boolean;
    selected?: boolean;
    selectable?: boolean;
    parentNode?: string;
  } & U
>;

export type BlockWithIdType<
  T = undefined,
  U extends Record<string, unknown> = Record<string, unknown>,
> = ThreadWithIdType<BlockType<T, U>>;

export type BlockFilters = {
  parentNode?: string;
  selected?: boolean;
};

export type UniqueIdProps = { type: string };

export type AllBlocksProps = {
  filters?: BlockFilters;
};

export type GetBlockProps = { blockId: string };

export type AddBlockProps<
  T = undefined,
  U extends Record<string, unknown> = Record<string, unknown>,
> = {
  block: BlockType<T, U>;
};

export type UpdateBlockProps<
  T = undefined,
  U extends Record<string, unknown> = Record<string, unknown>,
> = {
  blockId: string;
  values: Partial<BlockType<T, U>>;
};

export type UpdateIdBlockProps = { blockId: string; newId: string };

export type RemoveBlockProps = { blockId: string };

export type MoveBlockProps = { from: string; to: string };

export type SelectBlockProps = { blockId: string | null };

export type DuplicateBlockProps = { blockId: string };
