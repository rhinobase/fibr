import { Header as BuilderHeader } from "@fibr/builder";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@rafty/ui";
import { HiOutlineChevronDown } from "react-icons/hi";
import { LuMonitorPlay } from "react-icons/lu";

export function Header() {
  return (
    <BuilderHeader className="gap-2 px-2 py-1.5">
      <h1 className="text-xl font-bold leading-none">rhinobase</h1>
      <div className="flex-1" />
      <Tooltip delayDuration={500}>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost">
            <LuMonitorPlay size={18} className="stroke-2" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          isArrow={false}
          className="text-2xs px-2 py-1.5 leading-none"
        >
          Toggle preview mode
        </TooltipContent>
      </Tooltip>
      <Button
        colorScheme="primary"
        size="sm"
        rightIcon={<HiOutlineChevronDown />}
      >
        Publish
      </Button>
    </BuilderHeader>
  );
}
