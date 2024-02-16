export type EditorEventListener<T = unknown> = (
  context: T,
) => Promise<void> | void;
