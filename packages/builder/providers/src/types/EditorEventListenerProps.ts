import { TabPayload } from "../builder";
import {
  ActiveTabProps,
  EnvChangeProps,
  LayoutUpdateProps,
} from "../builder/types";
import {
  AddBlockProps,
  BlockWithIdType,
  DuplicateBlockProps,
  MoveBlockProps,
  RemoveBlockProps,
  SelectBlockProps,
  UpdateBlockProps,
  UpdateIdBlockProps,
} from "../canvas";
import { EditorEvent } from "../utils";

export type EditorEventListenerProps = {
  [EditorEvent.ALL]: unknown;
  [EditorEvent.BLOCK_ID_GENERATION]: {
    state: unknown;
    type: string;
    key: string;
  };
  // Canvas
  [EditorEvent.SCHEMA_RESET]: { blocks: BlockWithIdType[] };
  // Blocks
  [EditorEvent.BLOCK_ADDITION]: AddBlockProps;
  [EditorEvent.BLOCK_UPDATION]: UpdateBlockProps;
  [EditorEvent.BLOCK_ID_UPDATION]: UpdateIdBlockProps;
  [EditorEvent.BLOCK_DELETION]: RemoveBlockProps;
  [EditorEvent.BLOCK_REPOSITION]: MoveBlockProps;
  [EditorEvent.BLOCK_SELECTION]: SelectBlockProps;
  [EditorEvent.BLOCK_DUPLICATION]: DuplicateBlockProps;
  // Layout
  [EditorEvent.LAYOUT_UPDATE]: LayoutUpdateProps;
  // Env
  [EditorEvent.ENV_CHANGE]: EnvChangeProps;
  // Tab
  [EditorEvent.ACTIVE_TAB]: ActiveTabProps;
  [EditorEvent.ADD_TAB]: TabPayload;
};
