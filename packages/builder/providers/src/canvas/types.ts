import type { ThreadType, ThreadWithIdType } from "@fibr/react";

export type ShouldEmitEvent<T> = {
  shouldEmit?: boolean;
} & T;

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

export type AllBlocksProps = ShouldEmitEvent<{
  filters?: {
    parentNode?: string;
    selected?: boolean;
  };
}>;

export type GetBlockProps = ShouldEmitEvent<{ blockId: string }>;

export type AddBlockProps<
  T = undefined,
  U extends Record<string, unknown> = Record<string, unknown>,
> = ShouldEmitEvent<{
  block: BlockType<T, U>;
  id?: string;
}>;

export type UpdateBlockProps<
  T = undefined,
  U extends Record<string, unknown> = Record<string, unknown>,
> = ShouldEmitEvent<{
  blockId: string;
  values: Partial<BlockType<T, U>>;
}>;

export type UpdateIdBlockProps = ShouldEmitEvent<{
  blockId: string;
  newId: string;
}>;

export type RemoveBlockProps = ShouldEmitEvent<{ blockId: string }>;

export type MoveBlockProps = ShouldEmitEvent<{ from: string; to: string }>;

export type SelectBlockProps = ShouldEmitEvent<{ blockId: string | null }>;

export type DuplicateBlockProps = ShouldEmitEvent<{ blockId: string }>;
