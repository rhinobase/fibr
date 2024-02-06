import { SidebarItem } from "@fibr/builder";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { Button, InputField, useBoolean } from "@rafty/ui";
import { useEffect, useRef } from "react";
import { MdAdd } from "react-icons/md";
import { FormCard } from "../../components";
import { useFormBuilder } from "@fibr/providers";
import { Empty } from "@fibr/shared";

export function Forms() {
  const [show, toggle] = useBoolean();
  const { schema, add } = useFormBuilder(({ schema, forms }) => ({
    add: forms.add,
    schema,
  }));

  const isEmpty = schema.size === 0;

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
      name="forms"
      label="Forms"
      icon={<Square3Stack3DIcon className="h-5 w-5 stroke-2" />}
      className="flex-col overflow-hidden overflow-y-auto data-[state=active]:flex data-[orientation=vertical]:p-0"
    >
      <div className="sticky top-0 z-10 bg-white p-3">
        <div className="mb-3 flex items-center">
          <h4 className="flex-1 font-medium">Forms</h4>
          <Button
            size="icon"
            variant="ghost"
            className="rounded p-0.5"
            onClick={() => toggle(true)}
          >
            <MdAdd />
          </Button>
        </div>
        <hr />
      </div>
      <FormsRender />
      <div className="h-full px-3">
        {isEmpty && !show && (
          <Empty
            title="No form"
            description="You can add a form by clicking on plus icon"
          />
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

function FormsRender() {
  const schema = useFormBuilder(({ schema }) => schema);

  return (
    <div className="space-y-2.5 px-3 pb-3">
      {Array.from(schema).map(([id, form]) => (
        <FormCard key={id} id={id} form={form} />
      ))}
    </div>
  );
}
