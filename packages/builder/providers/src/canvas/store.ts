import type { ThreadType, ThreadWithIdType } from "@fibr/react";
import _ from "lodash";
import { StoreApi, UseBoundStore, create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { type Draft } from "immer";
import { EditorEvent } from "../utils";
import { EditorEventBus } from "../events";
import { isHotkeyPressed } from "react-hotkeys-hook";
import { arrayMove } from "@dnd-kit/sortable";

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

export type CanvasStoreProps<
  T = undefined,
  U extends Record<string, unknown> = Record<string, unknown>,
> = {
  initialSchema?: CanvasStore<T, U>["schema"];
  defaultActiveBlocks?: string[];
  emitter?: EditorEventBus["broadcast"];
};

export type BlockFilters = {
  parentNode?: string;
  selected?: boolean;
};

export type CanvasStore<
  T = undefined,
  U extends Record<string, unknown> = Record<string, unknown>,
> = {
  schema: Record<string, BlockType | undefined>;
  active: string[];
  // Generating unique keys for components
  _unique: Record<string, number>;
  uniqueId: (type: string) => string;
  // ---
  all: (filters?: BlockFilters) => BlockWithIdType<T, U>[];
  get: (blockId: string) => BlockType | undefined;
  add: <
    T = undefined,
    U extends Record<string, unknown> = Record<string, unknown>,
  >(
    block: BlockType<T, U>,
  ) => void;
  update: <
    T = undefined,
    U extends Record<string, unknown> = Record<string, unknown>,
  >(
    blockId: string,
    values: Partial<BlockType<T, U>>,
  ) => void;
  set: (
    func: (values: BlockWithIdType<T, U>[]) => BlockWithIdType<T, U>[],
  ) => void;
  updateId: (blockId: string, newId: string) => void;
  remove: (blockIds: string) => void;
  move: (from: string, to: string) => void;
  select: (blockId: string | null) => void;
  duplicate: (blockId: string) => void;
};

export const createCanvasStore = <
  T = undefined,
  U extends Record<string, unknown> = Record<string, unknown>,
>({
  emitter = () => undefined,
  initialSchema = {},
  defaultActiveBlocks = [],
}: CanvasStoreProps<T, U>) => {
  return create(
    immer<CanvasStore<T>>((set, get) => ({
      schema: initialSchema,
      active: defaultActiveBlocks,
      _unique: revalidateCache(initialSchema),
      uniqueId: (type) => {
        let id = 1;

        set((state) => {
          let index = 1;
          while (`${type}${id}` in state.schema) {
            id = (state._unique[type] ?? 0) + index;
            index += 1;
          }
          state._unique[type] = id;
        });

        return `${type}${id}`;
      },
      all: (filters) =>
        Object.entries(get().schema).reduce<BlockWithIdType<T, U>[]>(
          (prev, [id, block]) => {
            if (!block) return prev;

            if (filters?.parentNode && block.parentNode !== filters.parentNode)
              return prev;

            prev.push({
              id,
              ...block,
            } as BlockWithIdType<T, U>);

            return prev;
          },
          [],
        ),
      get: (blockId) => get().schema[blockId],
      add: (block) => {
        const blockId = get().uniqueId(block.type);

        set((state) => {
          state.schema[blockId] = block as Draft<BlockType>;
          state.active = [blockId];
        });

        emitter(EditorEvent.BLOCK_ADDITION, { block });
      },
      update: (blockId, values) =>
        set((state) => {
          // Updating the schema
          state.schema[blockId] = _.merge(state.schema[blockId], values);

          emitter(EditorEvent.BLOCK_UPDATION, {
            blockId,
            values,
          });
        }),
      updateId: (blockId, newId) => {
        set((state) => {
          const block = state.schema[blockId];
          if (block && !(newId in state.schema)) {
            // Deleting the old block
            delete state.schema[blockId];
            // Adding the new block
            state.schema[newId] = block;

            // Updating the active block
            state.active = [newId];

            // Revalidating the cache
            state._unique = revalidateCache(state.schema);

            // Firing the event
            emitter(EditorEvent.BLOCK_ID_UPDATION, {
              blockId,
              newId,
            });
          }
        });
      },
      set: (func) =>
        set((state) => {
          const blocks = func(state.all());

          state.schema = blocks.reduce<Record<string, Draft<BlockType>>>(
            (prev, cur) => {
              const { id, ...data } = cur;

              prev[id] = data as Draft<BlockType>;

              return prev;
            },
            {},
          );

          // Removing the deleted blocks (if any)
          state.active = state.active.filter((value) => value in state.schema);

          emitter(EditorEvent.SCHEMA_RESET, {});
        }),
      remove: (blockId) =>
        set((state) => {
          // Deleting the block
          delete state.schema[blockId];

          // Removing the block from the active blocks list
          if (state.active.includes(blockId))
            state.active.filter((value) => value !== blockId);

          // Firing the event
          emitter(EditorEvent.BLOCK_DELETION, { blockId });
        }),
      move: (from, to) =>
        set((state) => {
          const tmp = Object.entries(state.schema);

          // Getting the blocks index
          const fromIndex = tmp.findIndex((val) => val[0] === from);
          const toIndex = tmp.findIndex((val) => val[0] === to);

          state.schema = Object.fromEntries(arrayMove(tmp, fromIndex, toIndex));

          emitter(EditorEvent.BLOCK_REPOSITION, { from, to });
        }),
      select: (blockId) =>
        set((state) => {
          if (blockId) {
            // Is ctrl/cmd key is pressed
            if (isHotkeyPressed("shift")) state.active.push(blockId);
            // Single select
            else state.active = [blockId];
          }
          // Unselect all
          else state.active = [];

          emitter(EditorEvent.BLOCK_SELECTION, { blockId });
        }),
      duplicate: (blockId) => {
        const block = get().get(blockId);

        if (!block)
          throw new Error(`Unable to find the block with Id ${blockId}`);

        get().add(block);
        emitter(EditorEvent.BLOCK_DUPLICATION, { blockId });
      },
    })),
  ) as UseBoundStore<StoreApi<CanvasStore<T, U>>>;
};

function revalidateCache(schema: Record<string, BlockType | undefined>) {
  return Object.values(schema).reduce<Record<string, number>>((prev, cur) => {
    if (!cur) return prev;

    const { type } = cur;

    if (type in prev) prev[type] += 1;
    else prev[type] = 1;

    return prev;
  }, {});
}
