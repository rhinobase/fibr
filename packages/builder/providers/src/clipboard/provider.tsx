"use client";
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { BlockType, useCanvas } from "../canvas";

const ClipboardContext = createContext<ReturnType<
  typeof useClipboardManager
> | null>(null);

export function ClipboardProvider({ children, ...props }: PropsWithChildren) {
  const value = useClipboardManager();

  return (
    <ClipboardContext.Provider value={value}>
      {children}
    </ClipboardContext.Provider>
  );
}

function useClipboardManager() {
  const [clipboard, setClipboard] = useState<BlockType[]>();
  const { blocks, remove, uniqueId, set } = useCanvas(
    ({ schema, remove, uniqueId, set }) => ({
      remove,
      blocks: schema.filter(({ selected }) => selected),
      uniqueId,
      set,
    }),
  );

  const copyRef = useHotkeys<HTMLDivElement>(
    "mod+c,mod+x",
    (_, { keys = [] }) => {
      console.log("Working");
      setClipboard(blocks);
      if (keys[0] === "x") remove({ blockIds: blocks.map(({ id }) => id) });
    },
    { description: "Copy / Cut", preventDefault: true },
    [blocks],
  );

  const pasteRef = useHotkeys<HTMLDivElement>(
    "mod+v",
    () => {
      console.log("Pasting");
      if (clipboard) {
        const tmp: BlockType[] = [];
        for (const block of clipboard) {
          tmp.push({
            ...block,
            id: uniqueId(block.type),
          });
        }
        set({
          func: (components: BlockType[]) => [
            ...components.map((item) => ({ ...item, selected: false })),
            ...tmp,
          ],
        });
      }
    },
    { description: "Paste", preventDefault: true },
    [clipboard],
  );

  return {
    clipboard,
    copyRef,
    pasteRef,
    set,
  };
}

export function useClipboard() {
  const context = useContext(ClipboardContext);

  if (!context)
    throw new Error("Missing ClipboardContext.Provider in the tree");

  return context;
}
