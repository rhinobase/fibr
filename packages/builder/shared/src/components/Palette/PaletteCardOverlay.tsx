import { DragOverlay, useDndContext } from "@dnd-kit/core";
import type { Block } from "../../types";
import { PaletteCard } from "./PaletteCard";

export function PaletteCardOverlay() {
  const { active } = useDndContext();

  return (
    <DragOverlay dropAnimation={null}>
      {active?.data && (
        <PaletteCard isOverlay {...(active.data.current as Block)} />
      )}
    </DragOverlay>
  );
}
