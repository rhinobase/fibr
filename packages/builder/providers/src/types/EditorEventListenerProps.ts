import { ThreadType } from "@fibr/react";
import { Layout, TabPayload } from "../builder";
import { EditorEvent, Env } from "../utils";

export type EditorEventListenerProps = {
  [EditorEvent.ALL]: unknown;
  [EditorEvent.BLOCK_ID_GENERATION]: {
    state: unknown;
    type: string;
    key: string;
  };
  // Canvas
  [EditorEvent.CANVAS_SELECTION]: {
    canvasId: string | null;
  };
  [EditorEvent.CANVAS_ADDITION]: {
    struct: string | ThreadType;
  };
  [EditorEvent.CANVAS_DELETION]: {
    canvasId: string;
  };
  [EditorEvent.CANVAS_RESET]: { canvasId: string };
  // Blocks
  [EditorEvent.BLOCK_ADDITION]: {
    canvasId: string;
    block: ThreadType;
  };
  [EditorEvent.BLOCK_UPDATION]: {
    canvasId: string;
    blockId: string;
    values: Partial<ThreadType>;
  };
  [EditorEvent.BLOCK_ID_UPDATION]: {
    canvasId: string;
    blockId: string;
    newId: string;
  };
  [EditorEvent.BLOCK_DELETION]: {
    canvasId: string;
    blockId: string;
  };
  [EditorEvent.BLOCK_REPOSITION]: {
    canvasId: string;
    from: string;
    to: string;
  };
  [EditorEvent.BLOCK_SELECTION]: { blockId: string | null };
  [EditorEvent.BLOCK_DUPLICATION]: {
    canvasId: string;
    blockId: string;
  };
  // Layout
  [EditorEvent.LAYOUT_UPDATE]: {
    values: Partial<Layout>;
  };
  // Env
  [EditorEvent.ENV_CHANGE]: { env: Env };
  // Tab
  [EditorEvent.ACTIVE_TAB]: { tabId: string | null };
  [EditorEvent.ADD_TAB]: TabPayload;
};
