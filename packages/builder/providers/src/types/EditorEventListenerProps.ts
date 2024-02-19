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
  [EditorEvent.SCHEMA_RESET]: Record<string, unknown>;
  // Blocks
  [EditorEvent.BLOCK_ADDITION]: {
    block: ThreadType;
  };
  [EditorEvent.BLOCK_UPDATION]: {
    blockId: string;
    values: Partial<ThreadType>;
  };
  [EditorEvent.BLOCK_ID_UPDATION]: {
    blockId: string;
    newId: string;
  };
  [EditorEvent.BLOCK_DELETION]: {
    blockId: string;
  };
  [EditorEvent.BLOCK_REPOSITION]: {
    from: string;
    to: string;
  };
  [EditorEvent.BLOCK_SELECTION]: { blockId: string | null };
  [EditorEvent.BLOCK_DUPLICATION]: {
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
