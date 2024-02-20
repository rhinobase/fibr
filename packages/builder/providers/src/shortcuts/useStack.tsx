import { useCallback, useState } from "react";

export enum ActionType {
  UNDO = "undo",
  REDO = "redo",
}

export function useStack<T>(
  callback?: (payload: { action: ActionType; data: T }) => void,
) {
  const [mainStack, setMainStack] = useState<T[]>([]);
  const [undoStack, setUndoStack] = useState<T[]>([]);

  // Push an action onto the main stack
  const pushAction = useCallback((action: T) => {
    setMainStack((prev) => [...prev, action]);
  }, []);

  // Undo the last action
  const undo = useCallback(() => {
    if (!mainStack.length) return; // Nothing to undo
    const lastAction = mainStack.pop();
    if (lastAction) {
      callback?.({ action: ActionType.UNDO, data: lastAction });
      setUndoStack((prev) => [...prev, lastAction]);
    }
  }, [mainStack]);

  // Redo the last undone action
  const redo = useCallback(() => {
    if (!undoStack.length) return; // Nothing to redo
    const lastUndoneAction = undoStack.pop();
    if (lastUndoneAction) {
      callback?.({ action: ActionType.REDO, data: lastUndoneAction });
      setMainStack((prev) => [...prev, lastUndoneAction]);
    }
  }, [undoStack]);

  // Clear undo stack
  const clearUndoStack = useCallback(() => {
    setUndoStack([]);
  }, []);

  // Clear both stacks
  const clear = useCallback(() => {
    setMainStack([]);
    setUndoStack([]);
  }, []);

  return {
    mainStack,
    undoStack,
    pushAction,
    undo,
    redo,
    clearUndoStack,
    clear,
  };
}