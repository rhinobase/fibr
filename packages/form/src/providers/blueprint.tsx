"use client";
import { arrayMove } from "@dnd-kit/sortable";
import { Form, f } from "@fibr/blocks";
import { Env, useBuilder } from "@fibr/builder";
import { ThreadType, ThreadWithIdType } from "@fibr/react";
import _ from "lodash";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type BlueprintContextType = ReturnType<typeof useBlueprintManager>;

const BlueprintContext = createContext<BlueprintContextType | null>(null);

export function BlueprintProvider({ children }: PropsWithChildren) {
  const value = useBlueprintManager();

  return (
    <BlueprintContext.Provider value={value}>
      {children}
    </BlueprintContext.Provider>
  );
}

export const DEFAULT_FORM_NAME = "form1";

function useBlueprintManager() {
  const { env } = useBuilder();

  const [forms, setForms] = useState<Map<string, ThreadType<Form>>>(
    new Map(
      Object.entries({
        [DEFAULT_FORM_NAME]: f.form({
          title: "Main",
          onSubmit: console.log,
          blocks: new Map(),
        }),
      }),
    ),
  );
  // Selected form
  const [activeForm, setActiveForm] = useState<string | null>(
    DEFAULT_FORM_NAME,
  );
  // Selected block
  const [activeBlock, setActiveBlock] = useState<string | null>(
    DEFAULT_FORM_NAME,
  );

  useEffect(() => {
    if (env.current === Env.PRODUCTION) setActiveBlock(null);
  }, [env.current]);

  // On block select
  const selectBlock = useCallback((id: string | null) => {
    setActiveBlock(id);
  }, []);

  // Generate block Id
  // TODO: useUniqueId - https://github.dev/clauderic/dnd-kit/blob/694dcc2f62e5269541fc941fa6c9af46ccd682ad/packages/utilities/src/hooks/useUniqueId.ts#L5
  const generateId = useCallback(
    (type: string, context: Map<string, unknown>, index = 1): string => {
      let inc = index;
      while (true) {
        const id = `${type}${inc}`;

        inc += 1;

        if (context.has(id)) continue;

        return id;
      }
    },
    [],
  );

  // Get form
  const getForm = useCallback(
    (formId: string) => {
      const form = forms.get(formId);
      if (form) return form;
      return null;
    },
    [forms],
  );

  // Add form
  const addForm = useCallback(
    (title: string) => {
      let formId: string | null = null;

      setForms((prev) => {
        formId = generateId("form", prev);
        prev.set(
          formId,
          f.form({ onSubmit: console.log, title, blocks: new Map() }),
        );
        return new Map(prev);
      });

      setActiveForm(formId);
      setActiveBlock(formId);
    },
    [generateId],
  );

  // Remove form
  const removeForm = useCallback((formId: string) => {
    setForms((prev) => {
      prev.delete(formId);
      return new Map(prev);
    });

    setActiveForm((prev) => {
      if (prev === formId) return null;
      return prev;
    });
  }, []);

  // Get all blocks
  const allBlocks = useCallback(
    (formId: string): ThreadWithIdType[] => {
      const form = forms.get(formId);

      if (!form) return [];

      return Array.from(form.blocks).map(([id, block]) => ({
        id,
        ...block,
      }));
    },
    [forms],
  );

  // Get block
  const getBlock = useCallback(
    (formId: string, blockId: string): ThreadType | undefined => {
      let block: ThreadType | undefined;

      if (forms.has(blockId)) block = forms.get(blockId);
      else block = forms.get(formId)?.blocks.get(blockId);

      return block;
    },
    [forms],
  );

  // Add block
  const addBlock = useCallback(
    function AddBlock<T extends Record<string, unknown>>(
      formId: string,
      block: ThreadType<T>,
    ) {
      let blockId: string | null = null;

      setForms((prev) => {
        const form = prev.get(formId);

        if (!form)
          throw new Error(`Form with this ID ${formId} doesn't exist!`);

        // Generating a new Id
        blockId = generateId(block.type, form.blocks);

        // Storing the block with the other form blocks
        form.blocks.set(blockId, block);

        // Updating the form blocks
        prev.set(formId, form);

        // Returning the updated schema
        return new Map(prev);
      });

      setActiveBlock(blockId);
    },
    [generateId],
  );

  // Update block
  const updateBlock = useCallback(function UpdateBlock<
    T extends Record<string, unknown>,
  >(formId: string, blockId: string, value: Partial<ThreadType<T>>) {
    setForms((prev) => {
      const form = prev.get(formId);

      if (!form) throw new Error(`Form with this ID ${formId} doesn't exist!`);

      // Storing the block with the other form blocks
      form.blocks.set(blockId, _.merge(form.blocks.get(blockId), value));

      // Updating the form blocks
      prev.set(formId, form);

      // Returning the updated schema
      return new Map(prev);
    });
  }, []);

  // Remove block
  const removeBlock = useCallback((formId: string, blockId: string) => {
    setForms((prev) => {
      prev.get(formId)?.blocks.delete(blockId);

      return new Map(prev);
    });

    setActiveBlock((prev) => {
      if (prev === blockId) return null;
      return prev;
    });
  }, []);

  // Move block
  const moveBlock = useCallback((formId: string, from: string, to: string) => {
    setForms((prev) => {
      const form = prev.get(formId);

      if (!form) throw new Error(`Form with this ID ${formId} doesn't exist!`);

      const tmp = Array.from(form.blocks);

      // Getting the blocks index
      const fromIndex = tmp.findIndex((val) => val[0] === from);
      const toIndex = tmp.findIndex((val) => val[0] === to);

      form.blocks = new Map(arrayMove(tmp, fromIndex, toIndex));

      // Storing the updated blocks arrangement
      prev.set(formId, form);

      // Returning the new schema
      return new Map(prev);
    });
  }, []);

  // Find block index
  const findBlockIndex = useCallback(
    (formId: string, blockId: string) => {
      const keys = Array.from(forms.get(formId)?.blocks.keys() ?? []);

      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if (key === blockId) return index;
      }

      return null;
    },
    [forms],
  );

  // Duplicate block
  const duplicateBlock = useCallback(
    (formId: string, blockId: string) => {
      const block = getBlock(formId, blockId);

      if (!block)
        throw new Error(
          `Unable to find the block with Id ${blockId} in form ${formId}`,
        );

      addBlock(formId, block);
    },
    [getBlock, addBlock],
  );

  return {
    schema: forms,
    forms: {
      get: getForm,
      add: addForm,
      remove: removeForm,
    },
    active: {
      form: activeForm,
      block: activeBlock,
    },
    blocks: {
      all: allBlocks,
      get: getBlock,
      add: addBlock,
      update: updateBlock,
      remove: removeBlock,
      move: moveBlock,
      select: selectBlock,
      findIndex: findBlockIndex,
      duplicate: duplicateBlock,
    },
  };
}

export function useBlueprint() {
  const context = useContext(BlueprintContext);

  if (!context)
    throw new Error("Missing BlueprintContext.Provider in the tree");

  return context;
}
