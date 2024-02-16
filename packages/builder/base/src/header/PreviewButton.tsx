import { eventHandler } from "@rafty/shared";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@rafty/ui";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { VscDebugStart } from "react-icons/vsc";
import { useBuilder, Env } from "@fibr/providers";

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
        className="text-2xs rounded px-1.5 py-1.5 leading-none"
      >
        Toggle preview mode
      </TooltipContent>
    </Tooltip>
  );
}
