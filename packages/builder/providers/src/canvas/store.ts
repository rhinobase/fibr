/* eslint-disable @typescript-eslint/ban-ts-comment */
import { arrayMove } from "@dnd-kit/sortable";
import type { ThreadType, ThreadWithIdType } from "@fibr/react";
import { type Draft } from "immer";
import _ from "lodash";
import { StoreApi, UseBoundStore, create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import { EditorEvent } from "../events";

export type CanvasType<
  T extends Record<string, unknown> = Record<string, unknown>,
> = ThreadType<
  {
    blocks: Record<string, ThreadType | undefined>;
  } & T
>;

export type CanvasStoreProps<T extends CanvasType> = {
  canvasKey?: string;
  initialSchema?: CanvasStore<T>["schema"];
  defaultActiveCanvas?: string | null;
  defaultActiveBlock?: string | null;
  emitter?: (type: EditorEvent, context: Record<string, unknown>) => void;
};

export type CanvasStore<T extends CanvasType> = {
  schema: Record<string, T | undefined>;
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
    findIndex: (canvasId: string, blockId: string) => number;
    duplicate: (canvasId: string, blockId: string) => void;
  };
};

enableMapSet();
export const createCanvasStore = <T extends CanvasType>({
  emitter = () => undefined,
  canvasKey = "canvas",
  initialSchema = {},
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
      // @ts-ignore
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
          const canvas = get().schema[canvasId];
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

            state.schema[canvasId] = block as Draft<ThreadType<T>>;
            state.active.canvas = canvasId;
            state.active.block = canvasId;
            emitter(EditorEvent.CANVAS_ADDITION, { canvasId });
          }),
        remove: (canvasId) =>
          set((state) => {
            delete state.schema[canvasId];

            if (state.active.canvas === canvasId) state.active.canvas = null;

            if (state.active.block === canvasId) state.active.block = null;

            emitter(EditorEvent.CANVAS_DELETION, { canvasId });
          }),
      },
      block: {
        all: (canvasId) => {
          const canvas = get().schema[canvasId];

          if (!canvas) return [];

          return Object.entries(canvas.blocks).reduce<ThreadWithIdType[]>(
            (prev, [id, block]) => {
              if (!block) return prev;

              prev.push({
                id,
                ...block,
              });

              return prev;
            },
            [],
          );
        },
        get: (canvasId, blockId) => {
          const schema = get().schema;
          let block: ThreadType | undefined;

          if (schema[blockId]) block = schema[blockId];
          else block = schema[canvasId]?.blocks[blockId];

          return block;
        },
        add: (canvasId, block) =>
          set((oldState) => {
            const canvas = oldState.schema[canvasId];

            if (!canvas)
              throw new Error(`Canvas with this ID ${canvasId} doesn't exist!`);

            const { id: blockId, state } = oldState.uniqueId(
              oldState,
              block.type,
              canvasId,
            );

            canvas.blocks[blockId] = block;

            state.schema[canvasId] = canvas;
            state.active.block = blockId;

            emitter(EditorEvent.BLOCK_ADDITION, { canvasId });
          }),
        update: (canvasId, blockId, values) =>
          set((state) => {
            let canvas = state.schema[canvasId];

            if (!canvas)
              throw new Error(`Canvas with this ID ${canvasId} doesn't exist!`);

            // Updating the canvas data
            if (canvasId === blockId) canvas = _.merge(canvas, values);
            // Storing the block with the other canvas blocks
            else
              canvas.blocks[blockId] = _.merge(canvas.blocks[blockId], values);

            // Updating the canvas blocks
            state.schema[canvasId] = canvas;

            emitter(EditorEvent.BLOCK_UPDATION, {
              canvasId,
              blockId,
              values,
            });
          }),
        updateId: (canvasId, blockId, newId) =>
          set((state) => {
            const canvas = state.schema[canvasId];

            if (!canvas)
              throw new Error(`Canvas with this ID ${canvasId} doesn't exist!`);

            if (canvasId === blockId && !state.schema[newId]) {
              // Geting all the entries
              const entries = Object.entries(state.schema);

              // Updating the key
              for (let index = 0; index < entries.length; index++) {
                const [key] = entries[index];

                if (key === blockId) {
                  entries[index][0] = newId;
                  break;
                }
              }

              // Updaing the schema
              state.schema = Object.fromEntries(entries);

              // Updating the active block
              state.active.block = newId;
            } else if (!canvas.blocks[newId]) {
              // Geting all the entries
              const entries = Object.entries(canvas.blocks);

              // Updating the key
              for (let index = 0; index < entries.length; index++) {
                const [key] = entries[index];

                if (key === blockId) {
                  entries[index][0] = newId;
                  break;
                }
              }

              // Updaing the blocks
              canvas.blocks = Object.fromEntries(entries);

              // Updating the canvas with the new values
              state.schema[canvasId] = canvas;

              // Updating the active block
              state.active.block = newId;

              // Revalidating the cache
              // @ts-ignore
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
            const canvas = state.schema[canvasId];

            if (!canvas)
              throw new Error(`No canvas found with id ${canvasId}!`);

            canvas.blocks = blocks.reduce<Record<string, ThreadType>>(
              (prev, cur) => {
                const { id, ...data } = cur;

                prev[id] = data;

                return prev;
              },
              {},
            );

            if (state.active.block && !canvas.blocks[state.active.block])
              state.active.block = null;

            state.schema[canvasId] = canvas;
            emitter(EditorEvent.CANVAS_RESET, { canvasId });
          }),
        remove: (canvasId, blockId) =>
          set((state) => {
            const canvas = state.schema[canvasId];

            if (!canvas)
              throw new Error(`Canvas with this ID ${canvasId} doesn't exist!`);

            delete canvas.blocks[blockId];
            state.schema[canvasId] = canvas;

            if (state.active.block === blockId) state.active.block = null;
            emitter(EditorEvent.BLOCK_DELETION, { canvasId });
          }),
        move: (canvasId, from, to) =>
          set((state) => {
            const canvas = state.schema[canvasId];

            if (!canvas)
              throw new Error(`Canvas with this ID ${canvasId} doesn't exist!`);

            const tmp = Object.entries(canvas.blocks);

            // Getting the blocks index
            const fromIndex = tmp.findIndex((val) => val[0] === from);
            const toIndex = tmp.findIndex((val) => val[0] === to);

            canvas.blocks = Object.fromEntries(
              arrayMove(tmp, fromIndex, toIndex),
            );

            // Storing the updated blocks arrangement
            state.schema[canvasId] = canvas;
            emitter(EditorEvent.BLOCK_REPOSITION, { canvasId });
          }),
        select: (blockId) =>
          set((state) => {
            state.active.block = blockId;
            emitter(EditorEvent.BLOCK_SELECTION, { blockId });
          }),
        findIndex: (canvasId, blockId) => {
          return Object.keys(get().schema[canvasId]?.blocks ?? {}).findIndex(
            (key) => key === blockId,
          );
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

function revalidateCache(schema: Record<string, CanvasType>, key: string) {
  const data = Object.values(schema).reduce<
    Record<string, Record<string, number>>
  >((prev, cur) => {
    if (!cur) return prev;

    const { type, blocks } = cur;

    if (key in prev) {
      if (type in prev[key]) prev[key][type] += 1;
      else prev[key][type] = 1;
    } else prev[key] = { [type]: 1 };

    let sub = {};
    if (blocks && Object.keys(blocks).length > 0)
      sub = revalidateCache(blocks as Record<string, CanvasType>, type);

    // TODO: resolve this
    // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
    return { ...prev, ...sub };
  }, {});

  return data;
}
