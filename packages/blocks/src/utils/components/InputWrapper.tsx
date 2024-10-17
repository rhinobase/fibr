import RaftyIcon, { type RaftyIconProps } from "@rafty/icons";
import { InputGroup, LeftAddon, Prefix, RightAddon, Suffix } from "@rafty/ui";
import { cva } from "class-variance-authority";
import { useField } from "duck-form";
import type { PropsWithChildren } from "react";

const addonTextClasses = cva(
  "text-secondary-600 dark:text-secondary-400 font-medium",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
  },
);

const iconClasses = cva("opacity-55", {
  variants: {
    size: {
      sm: "size-[18px] stroke-2",
      md: "size-5",
      lg: "size-[22px]",
    },
  },
});

export type InputWrapperProps = {
  data: {
    size?: "sm" | "md" | "lg";
    prefixText?: string;
    suffixText?: string;
    prefixIcon?: RaftyIconProps["type"];
    suffixIcon?: RaftyIconProps["type"];
  };
};

export function InputWrapper(props: PropsWithChildren) {
  const {
    data: { prefixIcon, prefixText, suffixIcon, size = "md", suffixText },
  } = useField<InputWrapperProps>();

  return (
    <InputGroup size={size} className="w-full">
      {prefixText && (
        <LeftAddon className={addonTextClasses({ size })}>
          {prefixText}
        </LeftAddon>
      )}
      {prefixIcon && (
        <Prefix>
          <RaftyIcon type={prefixIcon} className={iconClasses({ size })} />
        </Prefix>
      )}
      {props.children}
      {suffixIcon && (
        <Suffix>
          <RaftyIcon type={suffixIcon} className={iconClasses({ size })} />
        </Suffix>
      )}
      {suffixText && (
        <RightAddon className={addonTextClasses({ size })}>
          {suffixText}
        </RightAddon>
      )}
    </InputGroup>
  );
}
