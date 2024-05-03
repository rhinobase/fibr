import {
  type PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";
import {
  type BlocksStore,
  type BlocksStoreProps,
  createBlocksStore,
} from "./store";

const BlocksContext = createContext<ReturnType<
  typeof createBlocksStore
> | null>(null);

export function BlocksProvider({
  children,
  ...props
}: PropsWithChildren<BlocksStoreProps>) {
  const store = useRef(createBlocksStore(props)).current;
  return (
    <BlocksContext.Provider value={store}>{children}</BlocksContext.Provider>
  );
}

export function useBlocks<T>(selector: (state: BlocksStore) => T): T {
  const store = useContext(BlocksContext);

  if (!store) throw new Error("Missing BlocksContext.Provider in the tree");

  return useStore(store, selector);
}
