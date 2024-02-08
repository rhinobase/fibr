import { arrayMove } from "@dnd-kit/sortable";
import type { ThreadType, ThreadWithIdType } from "@fibr/react";
import type { Draft } from "immer";
import _ from "lodash";
import { StoreApi, UseBoundStore, create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type CanvasType = {
  title: string;
  blocks: Map<string, ThreadType>;
};

export type FormBuilderStoreProps<T extends CanvasType> = {
  canvasKey?: string;
  initialSchema?: FormBuilderStore<T>["schema"];
  defaultActiveCanvas?: string | null;
  defaultActiveBlock?: string | null;
};

export type FormBuilderStore<T extends CanvasType> = {
  schema: Map<string, ThreadType<T>>;
  active: {
    canvas: string | null;
    block: string | null;
  };
  uniqueId: (type: string, context: Map<string, unknown>) => string;
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
    updateId: (canvasId: string, blockId: string, newId: string) => void;
    remove: (canvasId: string, blockId: string) => void;
    move: (canvasId: string, from: string, to: string) => void;
    select: (blockId: string | null) => void;
    findIndex: (canvasId: string, blockId: string) => number | null;
    duplicate: (canvasId: string, blockId: string) => void;
  };
};

export const createFormBuilderStore = <T extends CanvasType>({
  canvasKey = "canvas",
  initialSchema = new Map(),
  defaultActiveCanvas = null,
  defaultActiveBlock = null,
}: FormBuilderStoreProps<T>) => {
  return create(
    immer<FormBuilderStore<T>>((set, get) => ({
      schema: initialSchema,
      active: {
        canvas: defaultActiveCanvas,
        block: defaultActiveBlock,
      },
      uniqueId: (type, context) => {
        let index = 1;
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const id = `${type}${index}`;

          index += 1;

          if (context.has(id)) continue;

          return id;
        }
      },
      canvas: {
        select: (canvasId) =>
          set((state) => {
            state.active.canvas = canvasId;
            state.active.block = canvasId;
          }),
        get: (canvasId) => {
          const canvas = get().schema.get(canvasId);
          if (canvas) return canvas;
          return null;
        },
        add: (struct) =>
          set((state) => {
            const canvasId = get().uniqueId(canvasKey, state.schema);
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
          }),
        remove: (canvasId) =>
          set((state) => {
            state.schema.delete(canvasId);

            if (state.active.canvas === canvasId) state.active.canvas = null;

            if (state.active.block === canvasId) state.active.block = null;
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
          set((state) => {
            const canvas = state.schema.get(canvasId);

            if (!canvas)
              throw new Error(`Canvas with this ID ${canvasId} doesn't exist!`);

            const blockId = state.uniqueId(block.type, canvas.blocks);

            canvas.blocks.set(blockId, block);

            state.schema.set(canvasId, canvas);
            state.active.block = blockId;
          }),
        update: (canvasId, blockId, values) =>
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
            }
          }),
        remove: (canvasId, blockId) =>
          set((state) => {
            const canvas = state.schema.get(canvasId);

            if (!canvas)
              throw new Error(`Canvas with this ID ${canvasId} doesn't exist!`);

            canvas.blocks.delete(blockId);
            state.schema.set(canvasId, canvas);

            if (state.active.block === blockId) state.active.block = null;
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
          }),
        select: (blockId) =>
          set((state) => {
            state.active.block = blockId;
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
        },
      },
    })),
  ) as UseBoundStore<StoreApi<FormBuilderStore<T>>>;
};
