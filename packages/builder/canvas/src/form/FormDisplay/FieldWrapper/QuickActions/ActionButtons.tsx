import {
  type BlockType,
  DEFAULT_GROUP,
  groupByParentNode,
  useCanvas,
} from "@fibr/builder";
import { useThread } from "@fibr/react";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@rafty/ui";
import { classNames, eventHandler } from "@fibr/builder";
import type { IconType } from "react-icons";
import { HiOutlineEyeOff } from "react-icons/hi";
import {
  MdOutlineAddToPhotos,
  MdOutlineArrowDownward,
  MdOutlineArrowUpward,
  MdOutlineDelete,
} from "react-icons/md";

enum Direction {
  UP = -1,
  DOWN = 1,
}

export function ActionButtons() {
  const { id, parentNode = DEFAULT_GROUP } = useThread<BlockType>();
  const { schema, move, remove, duplicate, select, update } = useCanvas(
    ({ schema, move, remove, duplicate, select, update }) => ({
      schema,
      move,
      remove,
      duplicate,
      select,
      update,
    }),
  );

  const groups = groupByParentNode(schema);
  const blocks = groups[parentNode] ?? [];
  const index = blocks.findIndex((block) => block.id === id);

  if (index == null || index === -1) return;

  const onMove = (direction: Direction) => {
    select({ selectedBlockIds: id });

    const target = blocks[index + direction];
    move({
      sourceBlockId: id,
      targetBlockId: target.id,
    });
  };

  return (
    <div className="dark:bg-secondary-800 dark:border-secondary-800 flex w-max gap-1 rounded-md border bg-white p-1 shadow">
      {index > 0 && (
        <CustomButton
          name="Move up"
          icon={MdOutlineArrowUpward}
          action={() => onMove(Direction.UP)}
        />
      )}
      {index < blocks.length - 1 && (
        <CustomButton
          name="Move down"
          icon={MdOutlineArrowDownward}
          action={() => onMove(Direction.DOWN)}
        />
      )}
      <CustomButton
        name="Hidden"
        icon={HiOutlineEyeOff}
        action={() =>
          update({
            blockId: id,
            updatedValues: { hidden: true, selected: false },
          })
        }
      />
      <CustomButton
        name="Duplicate file"
        icon={MdOutlineAddToPhotos}
        action={() => duplicate({ originalBlockIds: id })}
      />
      <CustomButton
        name="Delete visual field"
        icon={MdOutlineDelete}
        action={() => remove({ blockIds: id })}
        className="hover:bg-red-200/40 hover:text-red-500 dark:hover:bg-red-300/10 dark:hover:text-red-300"
      />
    </div>
  );
}

type CustomButton = {
  name: string;
  icon: IconType;
  action: () => void;
} & Pick<Button, "className">;

function CustomButton({ name, icon: Icon, action, className }: CustomButton) {
  const manageAction = eventHandler(action);

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={classNames("rounded p-1", className)}
          onClick={manageAction}
          onKeyDown={manageAction}
        >
          <Icon size={18} />
        </Button>
      </TooltipTrigger>
      <TooltipContent
        isArrow={false}
        sideOffset={7}
        className="rounded px-1.5 py-1.5 text-[0.75rem] leading-none"
      >
        {name}
      </TooltipContent>
    </Tooltip>
  );
}
