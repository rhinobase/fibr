import { DragOverlay, useDndContext } from "@dnd-kit/core";
import type { BlockType } from "@fibr/builder";
import { Portal } from "../../utils";
import { OverviewCard } from "../OverviewCard";
import { adjustTranslate } from "./adjustTranslate";

export function OverviewOverlay() {
  const { active } = useDndContext();

  return (
    <Portal>
      <DragOverlay modifiers={[adjustTranslate]}>
        {active && (
          <OverviewCard
            {...(active.data.current as BlockType)}
            id={`${active.id}`}
          />
        )}
      </DragOverlay>
    </Portal>
  );
}
