import { arrayMove } from "@dnd-kit/sortable";
import type { ThreadType, ThreadWithIdType } from "@fibr/react";
import type { Draft } from "immer";
import _ from "lodash";
import { StoreApi, UseBoundStore, create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type BasicFormType = {
  title: string;
  blocks: Map<string, ThreadType>;
};

export type FormBuilderStoreProps<T extends BasicFormType> = {
  formKey?: string;
} & Partial<Pick<FormBuilderStore<T>, "schema">>;

export type FormBuilderStore<T extends BasicFormType> = {
  schema: Map<string, ThreadType<T>>;
  active: {
    form: string | null;
    block: string | null;
  };
  uniqueId: (type: string, context: Map<string, unknown>) => string;
  forms: {
    select: (formId: string | null) => void;
    get: (formId: string) => ThreadType<T> | null;
    add: (title: string | ThreadType<T>) => void;
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
      values: Partial<ThreadType<T>>,
    ) => void;
    remove: (formId: string, blockId: string) => void;
    move: (formId: string, from: string, to: string) => void;
    select: (blockId: string | null) => void;
    findIndex: (formId: string, blockId: string) => number | null;
    duplicate: (formId: string, blockId: string) => void;
  };
};

export const createFormBuilderStore = <T extends BasicFormType>({
  formKey = "form",
  schema = new Map(),
}: FormBuilderStoreProps<T>) =>
  create(
    immer<FormBuilderStore<T>>((set, get) => ({
      schema,
      active: {
        form: null,
        block: null,
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
        add: (struct) =>
          set((state) => {
            const formId = get().uniqueId(formKey, state.schema);
            const block =
              typeof struct === "string"
                ? {
                    type: formKey,
                    title: struct,
                    blocks: new Map(),
                  }
                : struct;

            state.schema.set(formId, block as Draft<ThreadType<T>>);
            state.active.form = formId;
            state.active.block = formId;
          }),
        remove: (formId) =>
          set((state) => {
            state.schema.delete(formId);

            if (state.active.form === formId) state.active.form = null;

            if (state.active.block === formId) state.active.block = null;
          }),
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
            let form = state.schema.get(formId);

            if (!form)
              throw new Error(`Form with this ID ${formId} doesn't exist!`);

            // Updating the form data
            if (formId === blockId) form = _.merge(form, values);
            // Storing the block with the other form blocks
            else
              form.blocks.set(
                blockId,
                _.merge(form.blocks.get(blockId), values),
              );

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

            if (state.active.block === blockId) state.active.block = null;
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
  ) as UseBoundStore<StoreApi<FormBuilderStore<T>>>;
