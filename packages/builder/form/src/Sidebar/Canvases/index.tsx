import { SidebarItem } from "@fibr/builder";
import { useCanvas } from "@fibr/providers";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { Button, InputField, useBoolean } from "@rafty/ui";
import { useEffect, useRef } from "react";
import { MdAdd } from "react-icons/md";
import { CanvasCard } from "./CanvasCard";
import { Empty } from "@fibr/shared";

export function Canvases() {
  const [show, toggle] = useBoolean();
  const { schema, add } = useCanvas(({ schema, canvas }) => ({
    add: canvas.add,
    schema,
  }));

  const isEmpty = Object.keys(schema).length === 0;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (show && ref.current) ref.current.focus();
  }, [show]);

  const handleClick = () => {
    if (!ref.current) return;

    const value = ref.current.value;
    if (value.length > 0) add(value);
    toggle();
  };

  return (
    <SidebarItem
      name="canvases"
      label="Canvases"
      icon={<Square3Stack3DIcon className="h-5 w-5 stroke-2" />}
      action={
        <Button
          size="icon"
          variant="ghost"
          className="rounded p-0.5"
          onClick={() => toggle(true)}
        >
          <MdAdd />
        </Button>
      }
    >
      <CanvasesList />
      <div className="flex-1 empty:hidden">
        {isEmpty && !show && (
          <div className="flex h-full flex-1 flex-col justify-center">
            <Empty
              title="No canvas"
              description="You can add a canvas by clicking on plus icon"
            />
          </div>
        )}
        {show && (
          <InputField
            ref={ref}
            className="text-2xs"
            onBlur={handleClick}
            onKeyDown={(event) => event.key === "Enter" && handleClick()}
          />
        )}
      </div>
    </SidebarItem>
  );
}

function CanvasesList() {
  const schema = useCanvas(({ schema }) => schema);

  return Object.entries(schema).map(([id, canvas]) => (
    <CanvasCard key={id} id={id} canvas={canvas as CanvasCard["canvas"]} />
  ));
}
