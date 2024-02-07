import { eventHandler } from "@rafty/shared";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@rafty/ui";
import { VscDebugStart } from "react-icons/vsc";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { useBuilder } from "../providers";
import { Env } from "../utils";

export function PreviewButton() {
  const { current, change } = useBuilder((state) => state.env);
  const isDevelopment = current === Env.DEVELOPMENT;

  const toggleEnv = eventHandler(() =>
    change(isDevelopment ? Env.PRODUCTION : Env.DEVELOPMENT),
  );

  const Icon = isDevelopment ? VscDebugStart : HiOutlineCodeBracketSquare;

  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <Button
          leftIcon={<Icon size={18} />}
          size="sm"
          variant="ghost"
          onClick={toggleEnv}
          onKeyDown={toggleEnv}
        >
          {isDevelopment ? "Preview" : "Sandbox"}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        isArrow={false}
        className="text-2xs rounded px-1.5 py-1.5 leading-none"
      >
        Toggle preview mode
      </TooltipContent>
    </Tooltip>
  );
}
