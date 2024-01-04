"use client";
import { PropsWithChildren, createContext, useContext } from "react";
import { Blueprint } from "../types";
import { Weaver } from "../components/Weaver";

type BlueprintContextType = {
  readonly blueprint: Blueprint;
};

const BlueprintContext = createContext<BlueprintContextType>({
  blueprint: {},
});

export function BlueprintProvider({
  children,
  blueprint,
}: PropsWithChildren<BlueprintContextType>) {
  return (
    <BlueprintContext.Provider value={{ blueprint }}>
      {children ?? <Weaver />}
    </BlueprintContext.Provider>
  );
}

export const useBlueprint = () => useContext(BlueprintContext);
