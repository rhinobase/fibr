import type { ThreadWithIdType } from "@fibr/react";

export type ShouldEmitEvent<T> = {
  shouldEmit?: boolean;
} & T;

export type BlockType<T = undefined> = ThreadWithIdType<{
  data?: T;
  hidden?: boolean;
  selected?: boolean;
  dragging?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  deletable?: boolean;
  parentNode?: string;
  resizing?: boolean;
}>;

export type AddBlockProps<T = undefined> = ShouldEmitEvent<{
  block: Omit<BlockType<T>, "id">;
  id?: string;
  index?: number;
}>;

export type UpdateBlockProps<T = undefined> = ShouldEmitEvent<{
  blockId: string;
  values: Partial<BlockType<T>>;
}>;

export type UpdateIdBlockProps = ShouldEmitEvent<{
  blockId: string;
  newId: string;
}>;

export type RemoveBlockProps = ShouldEmitEvent<{ blockId: string }>;

export type MoveBlockProps = ShouldEmitEvent<{ from: string; to: string }>;

export type SelectBlockProps = ShouldEmitEvent<{ blockId: string | string[] }>;

export type DuplicateBlockProps = ShouldEmitEvent<{ blockId: string }>;
