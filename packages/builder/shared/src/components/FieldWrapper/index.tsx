import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type BlockType, eventHandler, useCanvas } from "@fibr/builder";
import { classNames } from "@rafty/ui";
import { cva } from "class-variance-authority";
import { useField } from "duck-form";
import {
  type CSSProperties,
  Fragment,
  type HTMLAttributes,
  type PropsWithChildren,
  forwardRef,
} from "react";
import { QuickActions } from "./QuickActions";

export function FieldWrapper(props: PropsWithChildren) {
  const { isOverlay, ...field } = useField<
    BlockType & { isOverlay?: boolean }
  >();
  const { select, noOfSelectedBlocks } = useCanvas(({ select, schema }) => ({
    select,
    noOfSelectedBlocks: schema.filter(({ selected }) => selected).length,
  }));

  const isSelected = field.selected ?? false;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id, data: field });

  const onSelect = eventHandler(() =>
    select({
      selectedBlockIds: field.id,
    }),
  );

  if (field.type === "canvas")
    return (
      <Wrapper
        selected={isSelected}
        className="p-6"
        onClick={onSelect}
        onKeyDown={onSelect}
      >
        {props.children}
      </Wrapper>
    );

  const nodeStyle: CSSProperties = {
    transform: CSS.Transform.toString({
      x: transform?.x ?? 0,
      y: transform?.y ?? 0,
      scaleX: 1,
      scaleY: 1,
    }),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const Component =
    isDragging || noOfSelectedBlocks > 1 ? Fragment : QuickActions;

  return (
    <Component>
      <Wrapper
        selected={isSelected}
        ref={setNodeRef}
        style={nodeStyle}
        {...attributes}
        {...listeners}
        className={classNames(
          "select-none p-4",
          isDragging ? "z-50" : "transition-shadow",
          !isSelected &&
            "dark:hover:border-secondary-900 hover:shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] dark:hover:shadow-none",
        )}
      >
        {props.children}
      </Wrapper>
    </Component>
  );
}

const wrapperClasses = cva(
  "w-full cursor-pointer border bg-white dark:bg-secondary-950 rounded",
  {
    variants: {
      selected: {
        true: "border-primary-500 dark:border-primary-400",
        false: "border-transparent",
      },
    },
  },
);

type Wrapper = HTMLAttributes<HTMLDivElement> & {
  selected: boolean;
};

const Wrapper = forwardRef<HTMLDivElement, Wrapper>(
  ({ className, selected, ...props }, forwardedRef) => (
    <div
      {...props}
      className={classNames(wrapperClasses({ selected }), className)}
      ref={forwardedRef}
    />
  ),
);
