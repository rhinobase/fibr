import { useThread } from "@fibr/react";
import RaftyIcon, { type RaftyIconProps } from "@rafty/icons";
import { InputGroup, LeftAddon, Prefix, RightAddon, Suffix } from "@rafty/ui";
import { cva } from "class-variance-authority";
import { type PropsWithChildren } from "react";

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

export type InputWrapperProps = {
  data: {
    size?: "sm" | "md" | "lg";
    prefixText?: string;
    suffixText?: string;
    prefixIcon?: RaftyIconProps["type"];
    suffixIcon?: RaftyIconProps["type"];
  };
};

export type InputWrapper = PropsWithChildren;

export function InputWrapper({ children }: InputWrapper) {
  const {
    data: { prefixIcon, prefixText, suffixIcon, size = "md", suffixText },
  } = useThread<InputWrapperProps>();

  return (
    <InputGroup size={size} className="w-full">
      {prefixText && (
        <LeftAddon className={addonTextClasses({ size })}>
          {prefixText}
        </LeftAddon>
      )}
      {prefixIcon && (
        <Prefix>
          <RaftyIcon type={prefixIcon} className="opacity-60" />
        </Prefix>
      )}
      {children}
      {suffixIcon && (
        <Suffix>
          <RaftyIcon type={suffixIcon} />
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
