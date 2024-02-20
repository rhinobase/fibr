import { Env } from "../utils";
import { TabPayload } from "./store";

export type Layout = {
  sidebar: boolean;
  shortcutsDialog: boolean;
  commandPalette: boolean;
};

export type AddTabProps = { payload: TabPayload };

export type GetTabProps = { tabId: string };

export type ActiveTabProps = { tabId: string | null };

export type LayoutUpdateProps = { values: Partial<Layout> };

export type EnvChangeProps = { env: Env };
