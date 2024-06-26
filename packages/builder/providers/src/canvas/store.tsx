import { arrayMove } from "@dnd-kit/sortable";
import { Toast } from "@rafty/ui";
import type { Draft } from "immer";
import _ from "lodash";
import toast from "react-hot-toast";
import { type StoreApi, type UseBoundStore, create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { EditorEventBus } from "../events";
import { EditorEvent } from "../utils";
import type {
  AddBlockProps,
  BlockType,
  DuplicateBlockProps,
  MoveBlockProps,
  RemoveBlockProps,
  ShouldEmitEvent,
  UpdateBlockProps,
  UpdateIdBlockProps,
} from "./types";

export type CanvasStoreProps = {
  initialSchema?: BlockType[];
  enableMultiSelect?: boolean;
  emitter?: EditorEventBus["broadcast"];
};

export type CanvasStore = {
  schema: BlockType[];
  // Generating unique keys for components
  _unique: Record<string, number>;
  uniqueId: (type: string) => string;
  // ---
  get: (props: { blockIds: string | string[] }) => BlockType[];
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
  select: (props: { selectedBlockIds: string | string[] | null }) => void;
  duplicate: (props: DuplicateBlockProps) => void;
};

export const createCanvasStore = ({
  initialSchema = [],
  enableMultiSelect = true,
  emitter = () => undefined,
}: CanvasStoreProps) => {
  return create(
    immer<CanvasStore>((set, get) => ({
      schema: initialSchema,
      _unique: revalidateCache(initialSchema),
      uniqueId: (type) => {
        let typeCount = 1;

        const blocks = get().schema;

        const ids = blocks.reduce<Record<string, boolean>>((prev, { id }) => {
          prev[id] = true;
          return prev;
        }, {});

        set((state) => {
          let index = 1;

          while (ids[`${type}${typeCount}`]) {
            typeCount = (state._unique[type] ?? 0) + index;
            index += 1;
          }
          state._unique[type] = typeCount;
        });

        return `${type}${typeCount}`;
      },
      get: ({ blockIds }) => {
        const ids = Array.isArray(blockIds) ? blockIds : [blockIds];
        const blocks: BlockType[] = [];

        const schema = get().schema;

        for (const block of schema) {
          if (ids.includes(block.id)) blocks.push(block);
        }

        return blocks;
      },
      add: ({ blockData, blockId, shouldEmit = true, insertionIndex = -1 }) => {
        const generatedBlockId = blockId ?? get().uniqueId(blockData.type);

        const payload = {
          ...blockData,
          id: generatedBlockId,
        } as Draft<BlockType>;

        const prevSchema = get().schema;
        const schema = [...prevSchema];

        if (insertionIndex !== -1) schema.splice(insertionIndex, 0, payload);
        else schema.push(payload);

        set((state) => {
          state.schema = schema;
        });

        get().select({
          selectedBlockIds: generatedBlockId,
        });

        if (shouldEmit)
          emitter(EditorEvent.BLOCK_ADDITION, {
            prev: prevSchema,
            cur: schema,
          });
      },
      update: ({ blockId, updatedValues, shouldEmit = true }) => {
        const blocks = get().schema;
        const index = blocks.findIndex((block) => block.id === blockId);

        if (index === -1) {
          toast.custom((t) => (
            <Toast
              title="Unable to find the block!"
              severity="error"
              visible={t.visible}
            />
          ));

          return;
        }

        const oldValues = blocks[index];

        // Making sure we are not overriding these properties
        updatedValues.id = undefined;
        updatedValues.parentNode = undefined;

        // Merging the current props with the new ones
        const combinedValues = _.merge({}, oldValues, updatedValues);

        // Updating the schema
        set((state) => {
          state.schema[index] = combinedValues;
        });

        if (shouldEmit)
          emitter(EditorEvent.BLOCK_UPDATION, {
            prev: blocks,
            cur: get().schema,
          });
      },
      updateId: ({ currentBlockId, newBlockId, shouldEmit = true }) => {
        if (currentBlockId === newBlockId) return;

        const schema = get().schema;
        const blockIndex = schema.findIndex(
          (block) => block.id === currentBlockId,
        );
        const block = schema[blockIndex];

        // Check if this is a unique combo
        const index = schema.findIndex((item) => item.id === newBlockId);

        if (index !== -1) {
          toast.custom((t) => (
            <Toast
              title={`"${newBlockId}" is a component that already exists!`}
              severity="error"
              visible={t.visible}
            />
          ));
          return;
        }

        set((state) => {
          // Updating schema with the new Id
          state.schema[blockIndex] = {
            ...block,
            id: newBlockId,
            selected: true,
          };

          // Revalidating the cache
          state._unique = revalidateCache(state.schema);
        });

        // Firing the event
        if (shouldEmit)
          emitter(EditorEvent.BLOCK_ID_UPDATION, {
            prev: schema,
            cur: get().schema,
          });
      },
      set: ({ func, shouldEmit = true }) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const currentBlocks = get().schema as any[];
        const blocks = func(currentBlocks);

        set((state) => {
          state.schema = blocks as BlockType[];
        });

        if (shouldEmit)
          emitter(EditorEvent.SCHEMA_RESET, {
            prev: currentBlocks,
            cur: blocks as BlockType[],
          });
      },
      remove: ({ blockIds, shouldEmit = true }) => {
        const changes: { index: number; block: BlockType }[] = [];

        const ids = Array.isArray(blockIds) ? blockIds : [blockIds];

        const prevSchema = get().schema;
        const blocks = prevSchema.reduce<BlockType[]>((prev, block, index) => {
          if (ids.includes(block.id)) changes.push({ index, block });
          else prev.push(block);

          return prev;
        }, []);

        set((state) => {
          state.schema = blocks;
        });

        // Firing the event
        if (shouldEmit)
          emitter(EditorEvent.BLOCK_DELETION, {
            prev: prevSchema,
            cur: blocks,
          });
      },
      move: ({ sourceBlockId, targetBlockId, shouldEmit = true }) => {
        const prevSchema = get().schema;

        // Getting the blocks index
        const fromIndex = prevSchema.findIndex(
          (block) => block.id === sourceBlockId,
        );
        const toIndex = prevSchema.findIndex(
          (block) => block.id === targetBlockId,
        );

        if (fromIndex === -1 || toIndex === -1) {
          return toast.custom((t) => (
            <Toast
              title="Unable to find the block!"
              severity="error"
              visible={t.visible}
            />
          ));
        }

        set((state) => {
          const tmp = state.schema;
          const fromParentNode = tmp[fromIndex].parentNode;
          tmp[fromIndex].parentNode = tmp[toIndex].parentNode;
          tmp[toIndex].parentNode = fromParentNode;

          state.schema = arrayMove(tmp, fromIndex, toIndex);
        });

        if (shouldEmit)
          emitter(EditorEvent.BLOCK_REPOSITION, {
            prev: prevSchema,
            cur: get().schema,
          });
      },
      select: ({ selectedBlockIds }) => {
        const isMulti = Array.isArray(selectedBlockIds);
        const ids = (
          isMulti
            ? selectedBlockIds
            : selectedBlockIds
              ? [selectedBlockIds]
              : []
        ).reduce<Record<string, boolean>>((prev, cur) => {
          prev[cur] = true;
          return prev;
        }, {});

        set((state) => {
          state.schema = state.schema.map((block) => {
            if (ids[block.id]) block.selected = true;
            else if (!(enableMultiSelect && isMulti)) block.selected = false;

            return block;
          });
        });
      },
      duplicate: (params) => {
        const { originalBlockIds, shouldEmit = true } = params;

        const ids = Array.isArray(originalBlockIds)
          ? originalBlockIds
          : [originalBlockIds];
        const blocks = get().get({ blockIds: ids });

        const prevSchema = get().schema;

        const blockData = blocks[0];

        if (!blockData) {
          return toast.custom((t) => (
            <Toast
              title={`Unable to find the block with Id "${originalBlockIds}"`}
              severity="error"
              visible={t.visible}
            />
          ));
        }

        const id = get().uniqueId(blockData.type);

        get().add({ blockData, blockId: id });

        if (shouldEmit)
          emitter(EditorEvent.BLOCK_DUPLICATION, {
            prev: prevSchema,
            cur: get().schema,
          });
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
