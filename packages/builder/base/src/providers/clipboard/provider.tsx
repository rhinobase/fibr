"use client";
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { type BlockType, useCanvas } from "../canvas";
import { mergeRefs } from "../../utils";
import type { XYPosition } from "reactflow";
import { groupByParentNode } from "../utils";
import { WorkspaceErrorType, useBuilder } from "../builder";

const ClipboardContext = createContext<ReturnType<
  typeof useClipboardManager
> | null>(null);

export function ClipboardProvider({ children }: PropsWithChildren) {
  const value = useClipboardManager();

  return (
    <ClipboardContext.Provider value={value}>
      {children}
    </ClipboardContext.Provider>
  );
}

function useClipboardManager() {
  const onError = useBuilder((state) => state.onError);
  const [clipboard, setClipboard] = useState<BlockType[]>();
  const { schema, remove, uniqueId, set } = useCanvas(
    ({ schema, remove, uniqueId, set }) => ({
      remove,
      schema,
      uniqueId,
      set,
    }),
  );

  const copyRef = useHotkeys<HTMLDivElement>(
    "mod+c,mod+x",
    (_, { keys = [] }) => {
      // Getting all the selected blocks
      const blocks = schema.filter(({ selected }) => selected);

      // Storing then in the local clipboard
      setClipboard(blocks);

      // If cut shortcut is activited, then removing them from the canvas
      if (keys[0] === "x") remove({ blockIds: blocks.map(({ id }) => id) });
    },
    { description: "Copy / Cut", preventDefault: true },
    [schema],
  );

  const pasteRef = useHotkeys<HTMLDivElement>(
    "mod+v",
    () => {
      if (clipboard == null) return;

      console.log("Pasting");

      // Getting new id for the blocks
      const tmp: BlockType[] = [];
      for (const block of clipboard) {
        tmp.push({
          ...block,
          id: uniqueId(block.type),
        });
      }

      // Updating the canvas with the new blocks
      set({
        func: (components: BlockType[]) => [
          ...components.map((item) => ({ ...item, selected: false })),
          ...tmp,
        ],
      });
    },
    { description: "Paste", preventDefault: true },
    [clipboard],
  );

  const groupRef = useHotkeys<HTMLDivElement>(
    "shift+g",
    () => {
      console.log("Grouping");
      const group: BlockType & { position?: XYPosition; extent: string } = {
        id: uniqueId("object"),
        type: "object",
        selected: true,
        data: undefined,
        extent: "parent",
      };
      const blocks: (BlockType & { position?: XYPosition })[] = [];

      for (const block of schema) {
        if (block.selected) {
          if (group.parentNode && block.parentNode !== group.parentNode) {
            onError?.({ type: WorkspaceErrorType.GROUP_NOT_VALID });

            return;
          }

          if ("position" in block && block.position) {
            if (group.position == null)
              group.position = { x: 10_000, y: 10_000 };

            const { x, y } = block.position as XYPosition;

            if (x < group.position.x) group.position.x = x;
            if (y < group.position.y) group.position.y = y;
          }

          group.parentNode = block.parentNode;
          blocks.push({ ...block, selected: false, parentNode: group.id });
        } else blocks.push(block);
      }

      // Adding the group
      blocks.unshift(group);

      // Updating the canvas with the new blocks
      set({
        func: () => Object.values(groupByParentNode(blocks)).flat(),
      });
    },
    {
      description: "Group",
      preventDefault: true,
    },
  );

  return {
    clipboard,
    ref: mergeRefs(copyRef, pasteRef, groupRef),
    set,
  };
}

export function useClipboard() {
  const context = useContext(ClipboardContext);

  if (!context)
    throw new Error("Missing ClipboardContext.Provider in the tree");

  return context;
}
