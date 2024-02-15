/* eslint-disable @typescript-eslint/ban-ts-comment */
import { arrayMove } from "@dnd-kit/sortable";
import type { ThreadType, ThreadWithIdType } from "@fibr/react";
import { type Draft } from "immer";
import _ from "lodash";
import { StoreApi, UseBoundStore, create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { EditorEvent } from "../events";

export type CanvasType<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  blocks: Map<string, ThreadType>;
} & T;

export type CanvasStoreProps<T extends CanvasType> = {
  canvasKey?: string;
  initialSchema?: CanvasStore<T>["schema"];
  defaultActiveCanvas?: string | null;
  defaultActiveBlock?: string | null;
  emitter?: (type: EditorEvent, context: Record<string, unknown>) => void;
};

export type CanvasStore<T extends CanvasType> = {
  schema: Map<string, ThreadType<T>>;
  active: {
    canvas: string | null;
    block: string | null;
  };
  // Generating unique keys for components
  _unique: Record<string, Record<string, number>>;
  uniqueId: <U>(
    state: U,
    type: string,
    key?: string,
  ) => { id: string; state: U };
  // ---
  canvas: {
    select: (canvasId: string | null) => void;
    get: (canvasId: string) => ThreadType<T> | null;
    add: (title: string | ThreadType<T>) => void;
    remove: (canvasId: string) => void;
  };
  block: {
    all: (canvasId: string) => ThreadWithIdType[];
    get: (canvasId: string, blockId: string) => ThreadType | undefined;
    add: <T extends Record<string, unknown>>(
      canvasId: string,
      block: ThreadType<T>,
    ) => void;
    update: <T extends Record<string, unknown>>(
      canvasId: string,
      blockId: string,
      values: Partial<ThreadType<T>>,
    ) => void;
    set: (
      canvasId: string,
      func: (values: ThreadWithIdType[]) => ThreadWithIdType[],
    ) => void;
    updateId: (canvasId: string, blockId: string, newId: string) => void;
    remove: (canvasId: string, blockId: string) => void;
    move: (canvasId: string, from: string, to: string) => void;
    select: (blockId: string | null) => void;
    findIndex: (canvasId: string, blockId: string) => number | null;
    duplicate: (canvasId: string, blockId: string) => void;
  };
};

export const createCanvasStore = <T extends CanvasType>({
  emitter = () => undefined,
  canvasKey = "canvas",
  initialSchema = new Map(),
  defaultActiveCanvas = null,
  defaultActiveBlock = null,
}: CanvasStoreProps<T>) => {
  return create(
    immer<CanvasStore<T>>((set, get) => ({
      schema: initialSchema,
      active: {
        canvas: defaultActiveCanvas,
        block: defaultActiveBlock,
      },
      _unique: revalidateCache(initialSchema, canvasKey),
      uniqueId: (state, type, key = canvasKey) => {
        // Generating new id
        let id = 1;

        // Getting cache or init a new one
        // @ts-ignore
        const context = state._unique[key] ?? {};

        // Starting from 1
        id = (context[type] ?? 0) + 1;

        // Updating the cache
        context[type] = id;
        // @ts-ignore
        state._unique[key] = context;

        const generatedId = `${type}${id}`;

        emitter(EditorEvent.BLOCK_ID_GENERATION, { id: generatedId });

        // Returning the new value
        return { id: generatedId, state };
      },
      canvas: {
        select: (canvasId) =>
          set((state) => {
            state.active.canvas = canvasId;
            state.active.block = canvasId;

            emitter(EditorEvent.CANVAS_SELECTION, { canvasId });
          }),
        get: (canvasId) => {
          const canvas = get().schema.get(canvasId);
          if (canvas) return canvas;
          return null;
        },
        add: (struct) =>
          set((oldState) => {
            const { id: canvasId, state } = oldState.uniqueId(
              oldState,
              canvasKey,
            );
            const block =
              typeof struct === "string"
                ? {
                    type: canvasKey,
                    title: struct,
                    blocks: new Map(),
                  }
                : struct;

            state.schema.set(canvasId, block as Draft<ThreadType<T>>);
            state.active.canvas = canvasId;
            state.active.block = canvasId;
            emitter(EditorEvent.CANVAS_ADDITION, { canvasId });
          }),
        remove: (canvasId) =>
          set((state) => {
            state.schema.delete(canvasId);

            if (state.active.canvas === canvasId) state.active.canvas = null;

            if (state.active.block === canvasId) state.active.block = null;

            emitter(EditorEvent.CANVAS_DELETION, { canvasId });
          }),
      },
      block: {
        all: (canvasId) => {
          const canvas = get().schema.get(canvasId);

          if (!canvas) return [];

          return Array.from(canvas.blocks).map(([id, block]) => ({
            id,
            ...block,
          }));
        },
        get: (canvasId, blockId) => {
          const schema = get().schema;
          let block: ThreadType | undefined;

          if (schema.has(blockId)) block = schema.get(blockId);
          else block = schema.get(canvasId)?.blocks.get(blockId);

          return block;
        },
        add: (canvasId, block) =>
          set((oldState) => {
            const canvas = oldState.schema.get(canvasId);

            if (!canvas)
              throw new Error(`Canvas with this ID ${canvasId} doesn't exist!`);

            const { id: blockId, state } = oldState.uniqueId(
              oldState,
              block.type,
              canvasId,
            );

            canvas.blocks.set(blockId, block);

            state.schema.set(canvasId, canvas);
            state.active.block = blockId;

            emitter(EditorEvent.BLOCK_ADDITION, { canvasId });
          }),
        update: (canvasId, blockId, { id, ...values }) =>
          set((state) => {
            let canvas = state.schema.get(canvasId);

            if (!canvas)
              throw new Error(`Canvas with this ID ${canvasId} doesn't exist!`);

            // Updating the canvas data
            if (canvasId === blockId) canvas = _.merge(canvas, values);
            // Storing the block with the other canvas blocks
            else
              canvas.blocks.set(
                blockId,
                _.merge(canvas.blocks.get(blockId), values),
              );

            // Updating the canvas blocks
            state.schema.set(canvasId, canvas);

            emitter(EditorEvent.BLOCK_UPDATION, { canvasId });
          }),
        updateId: (canvasId, blockId, newId) =>
          set((state) => {
            const canvas = state.schema.get(canvasId);

            if (!canvas)
              throw new Error(`Canvas with this ID ${canvasId} doesn't exist!`);

            if (canvasId === blockId && !state.schema.has(newId)) {
              // Geting all the entries
              const entries = Array.from(state.schema.entries());

              // Updating the key
              for (let index = 0; index < entries.length; index++) {
                const [key] = entries[index];

                if (key === blockId) {
                  entries[index][0] = newId;
                  break;
                }
              }

              // Updaing the schema
              state.schema = new Map(entries);

              // Updating the active block
              state.active.block = newId;
            } else if (!canvas.blocks.has(newId)) {
              // Geting all the entries
              const entries = Array.from(canvas.blocks.entries());

              // Updating the key
              for (let index = 0; index < entries.length; index++) {
                const [key] = entries[index];

                if (key === blockId) {
                  entries[index][0] = newId;
                  break;
                }
              }

              // Updaing the blocks
              canvas.blocks = new Map(entries);

              // Updating the canvas with the new values
              state.schema.set(canvasId, canvas);

              // Updating the active block
              state.active.block = newId;

              // Revalidating the cache
              state._unique = revalidateCache(state.schema, canvasKey);
            }
            emitter(EditorEvent.BLOCK_ID_UPDATION, { canvasId });
          }),
        set: (canvasId, func) =>
          set((state) => {
            const {
              block: { all },
            } = state;

            const blocks = func(all(canvasId));
            const canvas = state.schema.get(canvasId);

            if (!canvas)
              throw new Error(`No canvas found with id ${canvasId}!`);

            canvas.blocks = blocks.reduce((prev, cur) => {
              const { id, ...data } = cur;

              prev.set(id, data);

              return prev;
            }, new Map());

            if (state.active.block && !canvas.blocks.has(state.active.block))
              state.active.block = null;

            state.schema.set(canvasId, canvas);
            emitter(EditorEvent.CANVAS_RESET, { canvasId });
          }),
        remove: (canvasId, blockId) =>
          set((state) => {
            const canvas = state.schema.get(canvasId);

            if (!canvas)
              throw new Error(`Canvas with this ID ${canvasId} doesn't exist!`);

            canvas.blocks.delete(blockId);
            state.schema.set(canvasId, canvas);

            if (state.active.block === blockId) state.active.block = null;
            emitter(EditorEvent.BLOCK_DELETION, { canvasId });
          }),
        move: (canvasId, from, to) =>
          set((state) => {
            const canvas = state.schema.get(canvasId);

            if (!canvas)
              throw new Error(`Canvas with this ID ${canvasId} doesn't exist!`);

            const tmp = Array.from(canvas.blocks);

            // Getting the blocks index
            const fromIndex = tmp.findIndex((val) => val[0] === from);
            const toIndex = tmp.findIndex((val) => val[0] === to);

            canvas.blocks = new Map(arrayMove(tmp, fromIndex, toIndex));

            // Storing the updated blocks arrangement
            state.schema.set(canvasId, canvas);
            emitter(EditorEvent.BLOCK_REPOSITION, { canvasId });
          }),
        select: (blockId) =>
          set((state) => {
            state.active.block = blockId;
            emitter(EditorEvent.BLOCK_SELECTION, { blockId });
          }),
        findIndex: (canvasId, blockId) => {
          const keys = Array.from(
            get().schema.get(canvasId)?.blocks.keys() ?? [],
          );

          for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (key === blockId) return index;
          }

          return null;
        },
        duplicate: (canvasId, blockId) => {
          const block = get().block.get(canvasId, blockId);

          if (!block)
            throw new Error(
              `Unable to find the block with Id ${blockId} in canvas ${canvasId}`,
            );

          get().block.add(canvasId, block);
          emitter(EditorEvent.BLOCK_DUPLICATION, { canvasId });
        },
      },
    })),
  ) as UseBoundStore<StoreApi<CanvasStore<T>>>;
};

function revalidateCache(
  schema: Map<string, ThreadType<{ blocks?: Map<string, ThreadType> }>>,
  key: string,
) {
  const data = Array.from(schema.values()).reduce<
    Record<string, Record<string, number>>
  >((prev, { type, blocks }) => {
    if (key in prev) {
      if (type in prev[key]) prev[key][type] += 1;
      else prev[key][type] = 1;
    } else prev[key] = { [type]: 1 };

    let sub = {};
    if (blocks && blocks.size > 0) sub = revalidateCache(blocks, type);

    // TODO: resolve this
    // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
    return { ...prev, ...sub };
  }, {});

  return data;
}
