import { InputGroup, LeftAddon, Prefix, RightAddon, Suffix } from "@rafty/ui";
import { cva } from "class-variance-authority";
import { type PropsWithChildren } from "react";
import { RaftyIcon } from "@rafty/icons";

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

export type InputWrapperProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  size?: "sm" | "md" | "lg";
  prefixText?: string;
  suffixText?: string;
  prefixIcon?: string;
  suffixIcon?: string;
} & T;

export type InputWrapper = PropsWithChildren<InputWrapperProps>;

export function InputWrapper({
  children,
  prefixIcon,
  prefixText,
  suffixIcon,
  size = "md",
  suffixText,
}: InputWrapper) {
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
