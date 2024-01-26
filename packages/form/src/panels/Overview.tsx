import { SidebarItem } from "@fibr/builder";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { AddFieldCard, OverviewCard } from "../components";
import { useBlueprint } from "../providers";
import { DndWrapper } from "../utils";

export function Overview() {
  return (
    <SidebarItem
      name="over"
      label="Over"
      icon={<ListBulletIcon className="size-5 stroke-2" />}
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
    fields: { all, fields },
  } = useBlueprint();

  const all_fields = all();

  if (fields.size === 0)
    return (
      <div className="text-secondary-500 flex size-full select-none flex-col items-center justify-center gap-2 p-3 text-center font-medium">
        <p className="text-lg">No field exists</p>
        <p className="text-sm leading-tight">
          You can go to palette to add field or just click on the button below
        </p>
        <AddFieldCard />
      </div>
    );

  return (
    <div className="space-y-2.5 px-3 pb-3">
      <DndWrapper items={Array.from(fields.keys())}>
        {all_fields.map((field) => (
          <OverviewCard key={field.id} {...field} />
        ))}
      </DndWrapper>
    </div>
  );
}
