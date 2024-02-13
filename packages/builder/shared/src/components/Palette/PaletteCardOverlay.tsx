import { DragOverlay, useDndContext } from "@dnd-kit/core";
import { PaletteCard } from "./PaletteCard";
import { Block } from "../../types";

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
