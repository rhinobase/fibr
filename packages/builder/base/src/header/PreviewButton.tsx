import { Env, useBuilder } from "@fibr/providers";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  eventHandler,
} from "@rafty/ui";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { VscDebugStart } from "react-icons/vsc";

export function PreviewButton() {
  const { isDevelopment, toggle } = useBuilder(
    ({ env: { current, change } }) => ({
      isDevelopment: current === Env.DEVELOPMENT,
      toggle: () =>
        change(current === Env.DEVELOPMENT ? Env.PRODUCTION : Env.DEVELOPMENT),
    }),
  );

  const toggleEnv = eventHandler(() => toggle());

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
        className="rounded px-1.5 py-1.5 text-[0.75rem] leading-none"
      >
        Toggle preview mode
      </TooltipContent>
    </Tooltip>
  );
}
