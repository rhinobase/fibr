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

function useBlueprintManager() {
  const { env } = useBuilder();

  const [forms, setForms] = useState<Map<string, ThreadType<Form>>>(
    new Map(
      Object.entries({
        form1: f.form({
          title: "Main",
          onSubmit: console.log,
          blocks: new Map(),
        }),
      }),
    ),
  );
  // Selected form
  const [activeForm, setActiveForm] = useState<string | null>("form1");
  // Selected field
  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    if (env.current === Env.PRODUCTION) setActiveField(null);
  }, [env.current]);

  // On field select
  const selectField = useCallback((id: string | null) => {
    setActiveField(id);
  }, []);

  // Generate field Id
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

  // Get field
  const getForm = useCallback(
    (formId: string) => {
      const field = forms.get(formId);
      if (field) return field;
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

  // Get all fields
  const allFields = useCallback(
    (formId: string): ThreadWithIdType[] => {
      const form = forms.get(formId);

      if (!form) return [];

      return Array.from(form.blocks).map(([id, field]) => ({
        id,
        ...field,
      }));
    },
    [forms],
  );

  // Get field
  const getField = useCallback(
    (formId: string, fieldId: string) => {
      const field = forms.get(formId)?.blocks.get(fieldId);
      if (field) return field;
      return null;
    },
    [forms],
  );

  // Add field
  const addField = useCallback(
    function AddField<T extends Record<string, unknown>>(
      formId: string,
      field: ThreadType<T>,
    ) {
      let fieldId: string | null = null;

      setForms((prev) => {
        const form = prev.get(formId);

        if (!form)
          throw new Error(`Form with this ID ${formId} doesn't exist!`);

        // Generating a new Id
        fieldId = generateId(field.type, form.blocks);

        // Storing the field with the other form fields
        form.blocks.set(fieldId, field);

        // Updating the form fields
        prev.set(formId, form);

        // Returning the updated schema
        return new Map(prev);
      });

      setActiveField(fieldId);
    },
    [generateId],
  );

  // Update field
  const updateField = useCallback(function UpdateField<
    T extends Record<string, unknown>,
  >(formId: string, fieldId: string, value: Partial<ThreadType<T>>) {
    setForms((prev) => {
      const form = prev.get(formId);

      if (!form) throw new Error(`Form with this ID ${formId} doesn't exist!`);

      // Storing the field with the other form fields
      form.blocks.set(fieldId, _.merge(form.blocks.get(fieldId), value));

      // Updating the form fields
      prev.set(formId, form);

      // Returning the updated schema
      return new Map(prev);
    });
  }, []);

  // Remove field
  const removeField = useCallback((formId: string, fieldId: string) => {
    setForms((prev) => {
      prev.get(formId)?.blocks.delete(fieldId);

      return new Map(prev);
    });

    setActiveField((prev) => {
      if (prev === fieldId) return null;
      return prev;
    });
  }, []);

  // Move field
  const moveField = useCallback((formId: string, from: string, to: string) => {
    setForms((prev) => {
      const form = prev.get(formId);

      if (!form) throw new Error(`Form with this ID ${formId} doesn't exist!`);

      const tmp = Array.from(form.blocks);

      // Getting the fields index
      const fromIndex = tmp.findIndex((val) => val[0] === from);
      const toIndex = tmp.findIndex((val) => val[0] === to);

      form.blocks = new Map(arrayMove(tmp, fromIndex, toIndex));

      // Storing the updated fields arrangement
      prev.set(formId, form);

      // Returning the new schema
      return new Map(prev);
    });
  }, []);

  // Find field index
  const findFieldIndex = useCallback(
    (formId: string, fieldId: string) => {
      const keys = Array.from(forms.get(formId)?.blocks.keys() ?? []);

      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if (key === fieldId) return index;
      }

      return null;
    },
    [forms],
  );

  // Duplicate field
  const duplicateField = useCallback(
    (formId: string, fieldId: string) => {
      const field = getField(formId, fieldId);

      if (!field)
        throw new Error(
          `Unable to find the field with Id ${fieldId} in form ${formId}`,
        );

      addField(formId, field);
    },
    [getField, addField],
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
      field: activeField,
    },
    fields: {
      all: allFields,
      get: getField,
      add: addField,
      update: updateField,
      remove: removeField,
      move: moveField,
      select: selectField,
      findIndex: findFieldIndex,
      duplicate: duplicateField,
    },
  };
}

export function useBlueprint() {
  const context = useContext(BlueprintContext);

  if (!context)
    throw new Error("Missing BlueprintContext.Provider in the tree");

  return context;
}
