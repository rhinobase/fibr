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
  parentNode?: string;
  updatedValues: Partial<BlockType<T>>;
}>;

export type UpdateIdBlockProps = ShouldEmitEvent<{
  currentBlockId: string;
  parentNode?: string;
  newBlockId: string;
}>;

export type RemoveBlockProps = ShouldEmitEvent<{
  blockId: string;
  parentNode?: string;
}>;

export type MoveBlockProps = ShouldEmitEvent<{
  sourceBlockId: string;
  sourceParentNode?: string;
  targetBlockId: string;
  targetParentNode?: string;
}>;

export type SelectBlockProps = ShouldEmitEvent<{
  selectedBlockIds:
    | { id: string; parentNode?: string }
    | { id: string; parentNode?: string }[];
}>;

export type UnselectBlockProps = ShouldEmitEvent<{
  unselectBlockIds:
    | { id: string; parentNode?: string }
    | { id: string; parentNode?: string }[];
}>;

export type DuplicateBlockProps = ShouldEmitEvent<{ originalBlockId: string }>;
