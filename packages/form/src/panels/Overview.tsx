import { SidebarItem } from "@fibr/builder";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { OverviewCard } from "../components";
import { useBlueprint } from "../providers";
import {
  type DragEndEvent,
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export function Overview() {
  const {
    fields: { all, move },
  } = useBlueprint();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const fields = all();

  return (
    <SidebarItem
      name="over"
      label="Over"
      icon={<ListBulletIcon className="h-5 w-5 stroke-2" />}
      className="data-[orientation=vertical]:p-3"
    >
      <div className="space-y-3">
        <h4 className="font-medium">Overview</h4>
        <hr />
        <div className="flex w-full flex-col gap-1.5">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field) => (
                <OverviewCard key={field.id} {...field} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </SidebarItem>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      move(String(active.id), String(over.id));
    }
  }
}
