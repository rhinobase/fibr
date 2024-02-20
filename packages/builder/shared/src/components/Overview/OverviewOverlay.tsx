import { Portal } from "../utils";
import { DragOverlay, useDndContext } from "@dnd-kit/core";
import { OverviewCard } from "./OverviewCard";
import { adjustTranslate } from "./utils";
import type { BlockType } from "@fibr/providers";

export function OverviewOverlay() {
  const { active } = useDndContext();

  return (
    <Portal>
      <DragOverlay modifiers={[adjustTranslate]}>
        {active && (
          <OverviewCard
            id={String(active.id)}
            {...(active.data.current as BlockType)}
          />
        )}
      </DragOverlay>
    </Portal>
  );
}
