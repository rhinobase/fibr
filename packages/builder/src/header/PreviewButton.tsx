import { eventHandler } from "@rafty/shared";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@rafty/ui";
import { VscDebugStart } from "react-icons/vsc";
import { useBuilder } from "../providers";
import { Env } from "../utils";

export function PreviewButton() {
  const { current, change } = useBuilder((state) => state.env);

  const toggleEnv = eventHandler(() =>
    change(current === Env.DEVELOPMENT ? Env.PRODUCTION : Env.DEVELOPMENT),
  );

  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <Button
          leftIcon={<VscDebugStart size={18} />}
          size="sm"
          variant="ghost"
          onClick={toggleEnv}
          onKeyDown={toggleEnv}
        >
          Preview
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
