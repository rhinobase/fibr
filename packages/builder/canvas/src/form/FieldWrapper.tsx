import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlockType, useCanvas } from "@fibr/providers";
import { useThread } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import { classNames } from "@rafty/ui";
import { cva } from "class-variance-authority";
import {
  type CSSProperties,
  Fragment,
  type HTMLAttributes,
  type PropsWithChildren,
  forwardRef,
} from "react";
import { QuickActions } from "./QuickActions";

export function FieldWrapper({ children }: PropsWithChildren) {
  const { isOverlay, ...field } = useThread<
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

  const onSelect = eventHandler((event) => {
    event.stopPropagation();
    select({
      selectedBlockIds: field.id,
    });
  });

  if (field.type === "canvas")
    return (
      <Wrapper
        selected={isSelected}
        className="p-6"
        onClick={onSelect}
        onKeyDown={onSelect}
      >
        {children}
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
          !isDragging && "transition-shadow",
          isDragging && "z-50",
          !isSelected &&
            "dark:hover:border-secondary-900 hover:shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] dark:hover:shadow-none",
        )}
      >
        {children}
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

type WrapperProps = HTMLAttributes<HTMLDivElement> & {
  selected: boolean;
};

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(
  ({ className, selected, ...props }, forwardedRef) => (
    <div
      {...props}
      className={classNames(wrapperClasses({ selected }), className)}
      ref={forwardedRef}
    />
  ),
);
