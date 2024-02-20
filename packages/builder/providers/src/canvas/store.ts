import _ from "lodash";
import { StoreApi, UseBoundStore, create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { type Draft } from "immer";
import { EditorEvent } from "../utils";
import { EditorEventBus } from "../events";
import { isHotkeyPressed } from "react-hotkeys-hook";
import { arrayMove } from "@dnd-kit/sortable";
import {
  AddBlockProps,
  AllBlocksProps,
  BlockType,
  BlockWithIdType,
  DuplicateBlockProps,
  GetBlockProps,
  MoveBlockProps,
  RemoveBlockProps,
  SelectBlockProps,
  ShouldEmitEvent,
  UpdateBlockProps,
  UpdateIdBlockProps,
} from "./types";

export type CanvasStoreProps<
  T = undefined,
  U extends Record<string, unknown> = Record<string, unknown>,
> = {
  initialSchema?: CanvasStore<T, U>["schema"];
  defaultActiveBlocks?: string[];
  emitter?: EditorEventBus["broadcast"];
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
  all: (props?: AllBlocksProps) => BlockWithIdType<T, U>[];
  get: (props: GetBlockProps) => BlockType | undefined;
  add: <
    T = undefined,
    U extends Record<string, unknown> = Record<string, unknown>,
  >(
    props: AddBlockProps<T, U>,
  ) => void;
  update: <
    T = undefined,
    U extends Record<string, unknown> = Record<string, unknown>,
  >(
    props: UpdateBlockProps<T, U>,
  ) => void;
  set: (
    props: ShouldEmitEvent<{
      func: (values: BlockWithIdType<T, U>[]) => BlockWithIdType<T, U>[];
    }>,
  ) => void;
  updateId: (props: UpdateIdBlockProps) => void;
  remove: (props: RemoveBlockProps) => void;
  move: (props: MoveBlockProps) => void;
  select: (props: SelectBlockProps) => void;
  duplicate: (props: DuplicateBlockProps) => void;
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
      all: (props) =>
        Object.entries(get().schema).reduce<BlockWithIdType<T, U>[]>(
          (prev, [id, block]) => {
            if (!block) return prev;

            if (
              props?.filters?.parentNode &&
              block.parentNode !== props.filters.parentNode
            )
              return prev;

            prev.push({
              id,
              ...block,
            } as BlockWithIdType<T, U>);

            return prev;
          },
          [],
        ),
      get: ({ blockId }) => get().schema[blockId],
      add: ({ block, id, shouldEmit = true }) => {
        const blockId = id ?? get().uniqueId(block.type);

        set((state) => {
          state.schema[blockId] = block as Draft<BlockType>;
          state.active = [blockId];
        });

        if (shouldEmit)
          emitter(EditorEvent.BLOCK_ADDITION, {
            block: block as BlockType,
            id: blockId,
          });
      },
      update: ({ blockId, values, shouldEmit = true }) =>
        set((state) => {
          // Merging the current props with the new ones
          const combinedValues = _.merge(state.schema[blockId], values);

          if (shouldEmit)
            emitter(EditorEvent.BLOCK_UPDATION, {
              id: blockId,
              updatedValues: values as Partial<BlockType>,
              oldValues: state.schema[blockId] as Partial<BlockType>,
            });

          // Updating the schema
          state.schema[blockId] = combinedValues;
        }),
      updateId: ({ blockId, newId, shouldEmit = true }) => {
        set((state) => {
          const block = state.schema[blockId];
          if (block && !(newId in state.schema)) {
            // Updating schema with the new Id
            state.schema = Object.entries(state.schema).reduce<
              Record<string, Draft<BlockType>>
            >((prev, [id, block]) => {
              if (block)
                if (id === blockId) prev[newId] = block;
                else prev[id] = block;

              return prev;
            }, {});

            // Updating the active block
            state.active = [newId];

            // Revalidating the cache
            state._unique = revalidateCache(state.schema);

            // Firing the event
            if (shouldEmit)
              emitter(EditorEvent.BLOCK_ID_UPDATION, {
                blockId,
                newId,
              });
          }
        });
      },
      set: ({ func, shouldEmit = true }) =>
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

          if (shouldEmit)
            emitter(EditorEvent.SCHEMA_RESET, {
              blocks: blocks as BlockWithIdType[],
            });
        }),
      remove: ({ blockId, shouldEmit = true }) =>
        set((state) => {
          const block = { ...get().schema[blockId] };
          // Deleting the block
          delete state.schema[blockId];

          // Removing the block from the active blocks list
          if (state.active.includes(blockId))
            state.active.filter((value) => value !== blockId);

          // Firing the event
          if (shouldEmit)
            emitter(EditorEvent.BLOCK_DELETION, {
              blockId,
              block: block as BlockType,
            });
        }),
      move: ({ from, to, shouldEmit = true }) =>
        set((state) => {
          const tmp = Object.entries(state.schema);

          // Getting the blocks index
          const fromIndex = tmp.findIndex((val) => val[0] === from);
          const toIndex = tmp.findIndex((val) => val[0] === to);

          state.schema = Object.fromEntries(arrayMove(tmp, fromIndex, toIndex));

          if (shouldEmit) emitter(EditorEvent.BLOCK_REPOSITION, { from, to });
        }),
      select: ({ blockId, shouldEmit = true }) =>
        set((state) => {
          if (blockId) {
            // Is ctrl/cmd key is pressed
            if (isHotkeyPressed("shift"))
              if (state.active.includes(blockId))
                state.active = state.active.filter(
                  (value) => value !== blockId,
                );
              else state.active.push(blockId);
            // Single select
            else state.active = [blockId];
          }
          // Unselect all
          else state.active = [];

          if (shouldEmit) emitter(EditorEvent.BLOCK_SELECTION, { blockId });
        }),
      duplicate: ({ blockId, shouldEmit = true }) => {
        const block = get().get({ blockId });

        if (!block)
          throw new Error(`Unable to find the block with Id ${blockId}`);

        const id = get().uniqueId(block.type);

        get().add({ block, id });

        if (shouldEmit)
          emitter(EditorEvent.BLOCK_DUPLICATION, { newId: id, block });
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
