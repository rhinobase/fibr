import { Env, useBuilder } from "@fibr/builder";
import { eventHandler } from "@rafty/shared";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@rafty/ui";
import { LuMonitorPlay } from "react-icons/lu";

export function PreviewButton() {
  const {
    env: { current, change },
  } = useBuilder();

  const toggleEnv = eventHandler(() =>
    change(current === Env.DEVELOPMENT ? Env.PRODUCTION : Env.DEVELOPMENT),
  );

  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleEnv}
          onKeyDown={toggleEnv}
        >
          <LuMonitorPlay size={18} className="stroke-2" />
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
