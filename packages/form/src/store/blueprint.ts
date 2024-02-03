import { type Form, f } from "@fibr/blocks";
import { ThreadType, ThreadWithIdType } from "@fibr/react";
import { StoreApi, UseBoundStore, create } from "zustand";
import { immer } from "zustand/middleware/immer";
import _ from "lodash";
import { arrayMove } from "@dnd-kit/sortable";

export type BlueprintStore = {
  schema: Map<string, ThreadType<Form>>;
  active: {
    form: string | null;
    block: string | null;
  };
  uniqueId: (type: string, context: Map<string, unknown>) => string;
  forms: {
    select: (formId: string | null) => void;
    get: (formId: string) => ThreadType<Form> | null;
    add: (title: string) => void;
    remove: (formId: string) => void;
  };
  blocks: {
    all: (formId: string) => ThreadWithIdType[];
    get: (formId: string, blockId: string) => ThreadType | undefined;
    add: <T extends Record<string, unknown>>(
      formId: string,
      block: ThreadType<T>,
    ) => void;
    update: <T extends Record<string, unknown>>(
      formId: string,
      blockId: string,
      value: Partial<ThreadType<T>>,
    ) => void;
    remove: (formId: string, blockId: string) => void;
    move: (formId: string, from: string, to: string) => void;
    select: (blockId: string | null) => void;
    findIndex: (formId: string, blockId: string) => number | null;
    duplicate: (formId: string, blockId: string) => void;
  };
};

export const DEFAULT_FORM_NAME = "form1";
export const createBlueprintStore = () =>
  create(
    immer<BlueprintStore>((set, get) => ({
      schema: new Map(
        Object.entries({
          [DEFAULT_FORM_NAME]: f.form({
            title: "Main",
            onSubmit: console.log,
            blocks: new Map(),
          }),
        }),
      ),
      active: {
        form: DEFAULT_FORM_NAME,
        block: DEFAULT_FORM_NAME,
      },
      uniqueId: (type, context) => {
        let index = 1;
        while (true) {
          const id = `${type}${index}`;

          index += 1;

          if (context.has(id)) continue;

          return id;
        }
      },
      forms: {
        select: (formId) =>
          set((state) => {
            state.active.form = formId;
            state.active.block = formId;
          }),
        get: (formId) => {
          const form = get().schema.get(formId);
          if (form) return form;
          return null;
        },
        add: (title) =>
          set((state) => {
            const formId = get().uniqueId("form", state.schema);
            const block = f.form({
              title,
              blocks: new Map(),
              onSubmit: console.log,
            });

            state.schema.set(formId, block);
            state.active.form = formId;
            state.active.block = formId;
          }),
        remove: (formId) => set((state) => state.schema.delete(formId)),
      },
      blocks: {
        all: (formId) => {
          const form = get().schema.get(formId);

          if (!form) return [];

          return Array.from(form.blocks).map(([id, block]) => ({
            id,
            ...block,
          }));
        },
        get: (formId, blockId) => {
          const schema = get().schema;
          let block: ThreadType | undefined;

          if (schema.has(blockId)) block = schema.get(blockId);
          else block = schema.get(formId)?.blocks.get(blockId);

          return block;
        },
        add: (formId, block) =>
          set((state) => {
            const form = state.schema.get(formId);

            if (!form)
              throw new Error(`Form with this ID ${formId} doesn't exist!`);

            const blockId = state.uniqueId(block.type, form.blocks);

            form.blocks.set(blockId, block);

            state.schema.set(formId, form);
            state.active.block = blockId;
          }),
        update: (formId, blockId, values) =>
          set((state) => {
            const form = state.schema.get(formId);

            if (!form)
              throw new Error(`Form with this ID ${formId} doesn't exist!`);

            // Storing the block with the other form blocks
            form.blocks.set(blockId, _.merge(form.blocks.get(blockId), values));

            // Updating the form blocks
            state.schema.set(formId, form);
          }),
        remove: (formId, blockId) =>
          set((state) => {
            const form = state.schema.get(formId);

            if (!form)
              throw new Error(`Form with this ID ${formId} doesn't exist!`);

            form.blocks.delete(blockId);
            state.schema.set(formId, form);
          }),
        move: (formId, from, to) =>
          set((state) => {
            const form = state.schema.get(formId);

            if (!form)
              throw new Error(`Form with this ID ${formId} doesn't exist!`);

            const tmp = Array.from(form.blocks);

            // Getting the blocks index
            const fromIndex = tmp.findIndex((val) => val[0] === from);
            const toIndex = tmp.findIndex((val) => val[0] === to);

            form.blocks = new Map(arrayMove(tmp, fromIndex, toIndex));

            // Storing the updated blocks arrangement
            state.schema.set(formId, form);
          }),
        select: (blockId) =>
          set((state) => {
            state.active.block = blockId;
          }),
        findIndex: (formId, blockId) => {
          const keys = Array.from(
            get().schema.get(formId)?.blocks.keys() ?? [],
          );

          for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (key === blockId) return index;
          }

          return null;
        },
        duplicate: (formId, blockId) => {
          const block = get().blocks.get(formId, blockId);

          if (!block)
            throw new Error(
              `Unable to find the block with Id ${blockId} in form ${formId}`,
            );

          get().blocks.add(formId, block);
        },
      },
    })),
  ) as UseBoundStore<StoreApi<BlueprintStore>>;
