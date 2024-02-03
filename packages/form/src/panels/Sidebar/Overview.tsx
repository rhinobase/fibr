import { SidebarItem } from "@fibr/builder";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { OverviewCard } from "../../components";
import { useBlueprint } from "../../providers";
import { DndWrapper } from "../../utils";

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
  const { all, activeForm } = useBlueprint(({ blocks, active }) => ({
    all: blocks.all,
    activeForm: active.form,
  }));

  if (!activeForm) throw new Error("Unable to find an active form!");

  const blocks = all(activeForm);

  if (blocks.length === 0)
    return (
      <div className="text-secondary-500 flex h-full w-full select-none flex-col items-center justify-center gap-2 p-3 text-center font-medium">
        <p className="text-lg">No field</p>
        <p className="text-sm leading-tight">
          You can go to palette to add field
        </p>
      </div>
    );

  return (
    <div className="space-y-2.5 px-3 pb-3">
      <DndWrapper items={blocks.map(({ id }) => id)}>
        {blocks.map((block) => (
          <OverviewCard key={block.id} {...block} />
        ))}
      </DndWrapper>
    </div>
  );
}
