"use client";
import { PropsWithChildren, createContext, useContext } from "react";
import { Blueprint } from "../types";

type BlueprintContextType = {
  readonly blueprint: Blueprint["blueprint"];
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
      {children}
    </BlueprintContext.Provider>
  );
}

export const useBlueprint = () => useContext(BlueprintContext);
