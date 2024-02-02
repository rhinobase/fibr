import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SidebarItem } from "@fibr/builder";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { AddFieldCard, OverviewCard } from "../../components";
import { useBlueprint } from "../../providers";

export function Overview() {
  return (
    <SidebarItem
      name="over"
      label="Over"
      icon={<ListBulletIcon className="h-5 w-5 stroke-2" />}
      className="flex-col overflow-hidden overflow-y-auto data-[state=active]:flex data-[orientation=vertical]:p-0"
    >
      <div className="sticky top-0 z-10 space-y-3 bg-white p-3">
        <h4 className="font-medium">Overview</h4>
        <hr />
      </div>
      <FieldsRender />
    </SidebarItem>
  );
}

function FieldsRender() {
  const {
    blocks: { all, move },
    active,
  } = useBlueprint();

  const formId = active.form;

  if (!formId) throw new Error("Unable to find an active form!");

  const blocks = all(formId);

  if (blocks.length === 0)
    return (
      <div className="text-secondary-500 flex h-full w-full select-none flex-col items-center justify-center gap-2 p-3 text-center font-medium">
        <p className="text-lg">No field exists</p>
        <p className="text-sm leading-tight">
          You can go to palette to add field or just click on the button below
        </p>
        <AddFieldCard />
      </div>
    );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id && formId) {
      move(formId, String(active.id), String(over.id));
    }
  }

  return (
    <div className="space-y-2.5 px-3 pb-3">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      >
        <SortableContext
          items={blocks.map(({ id }) => id)}
          strategy={verticalListSortingStrategy}
        >
          {blocks.map((block) => (
            <OverviewCard key={block.id} {...block} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
