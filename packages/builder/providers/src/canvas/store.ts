import { arrayMove } from "@dnd-kit/sortable";
import { type Draft } from "immer";
import _ from "lodash";
import { StoreApi, UseBoundStore, create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { EditorEventBus } from "../events";
import { EditorEvent } from "../utils";
import {
  AddBlockProps,
  BlockType,
  DuplicateBlockProps,
  MoveBlockProps,
  RemoveBlockProps,
  SelectBlockProps,
  ShouldEmitEvent,
  UpdateBlockProps,
  UpdateIdBlockProps,
} from "./types";

export type CanvasStoreProps = {
  initialSchema?: BlockType[];
  emitter?: EditorEventBus["broadcast"];
};

export type CanvasStore = {
  schema: BlockType[];
  // Generating unique keys for components
  _unique: Record<string, number>;
  uniqueId: (type: string) => string;
  // ---
  get: (props: { blockId: string }) => BlockType | undefined;
  add: <T = undefined>(props: AddBlockProps<T>) => void;
  update: <T = undefined>(props: UpdateBlockProps<T>) => void;
  set: <T = BlockType>(
    props: ShouldEmitEvent<{
      func: (values: T[]) => T[];
    }>,
  ) => void;
  updateId: (props: UpdateIdBlockProps) => void;
  remove: (props: RemoveBlockProps) => void;
  move: (props: MoveBlockProps) => void;
  select: (props: SelectBlockProps) => void;
  duplicate: (props: DuplicateBlockProps) => void;
};

export const createCanvasStore = ({
  emitter = () => undefined,
  initialSchema = [],
}: CanvasStoreProps) => {
  return create(
    immer<CanvasStore>((set, get) => ({
      schema: initialSchema,
      _unique: revalidateCache(initialSchema),
      uniqueId: (type) => {
        let id = 1;

        set((state) => {
          let index = 1;
          // TODO: Improve this
          while (
            state.schema.findIndex((block) => block.id === `${type}${id}`) !==
            -1
          ) {
            id = (state._unique[type] ?? 0) + index;
            index += 1;
          }
          state._unique[type] = id;
        });

        return `${type}${id}`;
      },
      get: ({ blockId }) => get().schema.find((block) => block.id === blockId),
      add: ({ block, id, shouldEmit = true, index = -1 }) => {
        const blockId = id ?? get().uniqueId(block.type);

        const payload = {
          ...block,
          id: blockId,
        } as Draft<BlockType>;

        const schema = [...get().schema];

        if (index !== -1) schema.splice(index, 0, payload);
        else schema.push(payload);

        set((state) => {
          state.schema = schema;
        });

        get().select({ blockId: [blockId], shouldEmit: false });

        if (shouldEmit)
          emitter(EditorEvent.BLOCK_ADDITION, {
            block: block as BlockType,
            id: blockId,
          });
      },
      update: ({ blockId, values, shouldEmit = true }) => {
        const schema = get().schema;
        const index = schema.findIndex((block) => block.id === blockId);
        const oldValues = schema[index];

        // Making sure we are not overriding these properties
        values.id = undefined;
        values.parentNode = undefined;

        // Merging the current props with the new ones
        const combinedValues = _.merge({}, oldValues, values);

        // Updating the schema
        set((state) => {
          state.schema[index] = combinedValues;
        });

        if (shouldEmit)
          emitter(EditorEvent.BLOCK_UPDATION, {
            id: blockId,
            updatedValues: values as Partial<BlockType>,
            oldValues,
          });
      },
      updateId: ({ blockId, newId, shouldEmit = true }) => {
        const schema = [...get().schema];
        const blockIndex = schema.findIndex((block) => block.id === blockId);
        const block = schema[blockIndex];

        // Check if this is a unique combo
        const index = schema.findIndex(
          (item) => item.id === newId && item.parentNode === block?.parentNode,
        );

        if (index !== -1) return;

        set((state) => {
          // Updating schema with the new Id
          state.schema[blockIndex] = { ...block, id: newId, selected: true };

          // Revalidating the cache
          state._unique = revalidateCache(state.schema);
        });

        // Firing the event
        if (shouldEmit)
          emitter(EditorEvent.BLOCK_ID_UPDATION, {
            blockId,
            newId,
          });
      },
      set: ({ func, shouldEmit = true }) => {
        const blocks = func(get().schema as any);

        set((state) => {
          state.schema = blocks as BlockType[];
        });

        if (shouldEmit)
          emitter(EditorEvent.SCHEMA_RESET, {
            blocks: blocks as BlockType[],
          });
      },
      // TODO: Implment delete for parentNode
      remove: ({ blockId, shouldEmit = true }) => {
        let index = -1;
        let blockContent: BlockType | undefined;

        const blocks = get().schema.reduce<BlockType[]>((prev, block, i) => {
          if (block.id === blockId) {
            index = i;
            blockContent = block;
          } else prev.push(block);

          return prev;
        }, []);

        set((state) => {
          state.schema = blocks;
        });

        // Firing the event
        if (shouldEmit)
          emitter(EditorEvent.BLOCK_DELETION, {
            blockId,
            block: blockContent as BlockType,
            index,
          });
      },
      move: ({ from, to, shouldEmit = true }) =>
        set((state) => {
          const tmp = [...state.schema];

          // Getting the blocks index
          const fromIndex = tmp.findIndex((block) => block.id === from);
          const toIndex = tmp.findIndex((block) => block.id === to);

          const fromParentNode = tmp[fromIndex].parentNode;
          tmp[fromIndex].parentNode = tmp[toIndex].parentNode;
          tmp[toIndex].parentNode = fromParentNode;

          state.schema = arrayMove(tmp, fromIndex, toIndex);

          if (shouldEmit) emitter(EditorEvent.BLOCK_REPOSITION, { from, to });
        }),
      // TODO: Add parent Node
      select: ({ blockId, shouldEmit = true }) => {
        const ids = Array.isArray(blockId) ? blockId : [blockId];

        set((state) => {
          state.schema = state.schema.map((block) => {
            if (ids.includes(block.id)) block.selected = true;
            else block.selected = false;

            return block;
          });
        });

        if (shouldEmit) emitter(EditorEvent.BLOCK_SELECTION, { blockId });
      },
      duplicate: ({ blockId, shouldEmit = true }) => {
        const block = get().get({ blockId });

        if (!block)
          throw new Error(`Unable to find the block with Id ${blockId}`);

        const id = get().uniqueId(block.type);

        get().add({ block, id });

        if (shouldEmit)
          emitter(EditorEvent.BLOCK_DUPLICATION, { newId: id, block });
      },
    })),
  ) as UseBoundStore<StoreApi<CanvasStore>>;
};

function revalidateCache(schema: BlockType[]) {
  return schema.reduce<Record<string, number>>((prev, cur) => {
    if (!cur) return prev;

    const { type } = cur;

    if (type in prev) prev[type] += 1;
    else prev[type] = 1;

    return prev;
  }, {});
}
