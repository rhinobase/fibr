"use client";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Block } from "../types";

type SourceContextType = ReturnType<typeof useSourceManager>;

const SourceContext = createContext<SourceContextType | null>(null);

export type useSourceManagerProps = { blocks: Block[] };

export type SourceProvider = PropsWithChildren<useSourceManagerProps>;

export function SourceProvider({ children, ...props }: SourceProvider) {
  const value = useSourceManager(props);

  return (
    <SourceContext.Provider value={value}>{children}</SourceContext.Provider>
  );
}

function useSourceManager(props: useSourceManagerProps) {
  const [blocks, setBlocks] = useState(props.blocks);

  return { blocks };
}

export function useSource() {
  const context = useContext(SourceContext);

  if (!context) throw new Error("Missing SourceContext.Provider in the tree");

  return context;
}
