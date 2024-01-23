"use client";
import { ThreadWithIdType, ThreadType } from "@fibr/react";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import _ from "lodash";
import { nanoid } from "nanoid";
import { arrayMove } from "@dnd-kit/sortable";

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
  const [fields, setFields] = useState<Map<string, ThreadType>>(new Map());

  // Get all fields
  const allFields = useCallback(
    (): ThreadWithIdType[] =>
      Array.from(fields).map(([id, field]) => ({
        id,
        ...field,
      })),
    [fields],
  );

  // Get field
  const getField = useCallback(
    (id: string) => {
      const field = fields.get(id);
      if (field) return field;
      return null;
    },
    [fields],
  );

  // Add field
  const addField = useCallback(
    (field: ThreadType, force = false) => {
      const id = nanoid();

      if (fields.has(id) && !force)
        throw new Error(`Field with ID ${id} already exists!`);

      setFields((prev) => {
        prev.set(id, field);
        return new Map(prev);
      });
    },
    [fields],
  );

  // Update field
  const updateField = useCallback(
    (id: string, value: Partial<ThreadType>) => {
      if (!fields.has(id))
        throw new Error(`Field with ID ${id} doesn't exists!`);

      setFields((prev) => {
        prev.set(id, _.merge(prev.get(id), value));

        return new Map(prev);
      });
    },
    [fields],
  );

  // Delete field
  const deleteField = useCallback((id: string) => {
    setFields((prev) => {
      prev.delete(id);
      return new Map(prev);
    });
  }, []);

  // Move field
  const moveField = useCallback((from: string, to: string) => {
    setFields((fields) => {
      const tmp = Array.from(fields);
      const oldIndex = tmp.findIndex((val) => val[0] === from);
      const newIndex = tmp.findIndex((val) => val[0] === to);
      return new Map(arrayMove(tmp, oldIndex, newIndex));
    });
  }, []);

  return {
    fields: {
      all: allFields,
      get: getField,
      add: addField,
      update: updateField,
      delete: deleteField,
      move: moveField,
    },
  };
}

export function useBlueprint() {
  const context = useContext(BlueprintContext);

  if (!context)
    throw new Error("Missing BlueprintContext.Provider in the tree");

  return context;
}
