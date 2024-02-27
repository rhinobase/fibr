import { useCanvas } from "@fibr/providers";
import { mergeRefs } from "@rafty/ui";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { forwardRef, type HTMLAttributes } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export type CopyWrapper = HTMLAttributes<HTMLDivElement>;

export const CopyWrapper = forwardRef<HTMLDivElement, CopyWrapper>(
  ({ tabIndex = -1, ...props }, forwardedRef) => {
    const [, copyToClipboard] = useCopyToClipboard();
    const { blocks, remove } = useCanvas(({ schema, remove }) => ({
      remove,
      blocks: schema.filter(({ selected }) => selected),
    }));

    const ref = useHotkeys<HTMLDivElement>(
      "mod+c,mod+x",
      (_, { keys = [] }) => {
        console.log("Working");
        copyToClipboard(JSON.stringify(blocks));
        if (keys[0] === "x") remove({ blockIds: blocks.map(({ id }) => id) });
      },
    );

    return (
      <div tabIndex={tabIndex} {...props} ref={mergeRefs(ref, forwardedRef)} />
    );
  },
);
CopyWrapper.displayName = "CopyWrapper";
