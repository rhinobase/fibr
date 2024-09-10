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
  blockData: Omit<BlockType<T>, "id">;
  blockId?: string;
  insertionIndex?: number;
}>;

export type UpdateBlockProps<T = undefined> = ShouldEmitEvent<{
  blockId: string;
  updatedValues: Partial<BlockType<T>>;
}>;

export type UpdateIdBlockProps = ShouldEmitEvent<{
  currentBlockId: string;
  newBlockId: string;
}>;

export type RemoveBlockProps = ShouldEmitEvent<{
  blockIds: string | string[];
}>;

export type MoveBlockProps = ShouldEmitEvent<{
  sourceBlockId: string;
  targetBlockId: string;
}>;

export type DuplicateBlockProps = ShouldEmitEvent<{
  originalBlockIds: string | string[];
}>;
