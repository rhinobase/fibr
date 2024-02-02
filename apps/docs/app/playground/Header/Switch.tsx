import { Tab, TabList, TabTrigger, classNames } from "@rafty/ui";
import { Container } from "../utils";

export type Switch = {
  value?: Container;
  onValueChange?: (value: Container) => void;
};

export function Switch({ value, onValueChange }: Switch) {
  return (
    <Tab
      className="w-max"
      size="sm"
      value={value}
      onValueChange={(value) => onValueChange?.(value as Container)}
    >
      <TabList className="bg-secondary-200 gap-0.5 rounded-md border-none p-0.5">
        <SwitchTrigger value="builder">Builder</SwitchTrigger>
        <SwitchTrigger value="flow">Flow</SwitchTrigger>
      </TabList>
    </Tab>
  );
}

function SwitchTrigger({ className, ...props }: TabTrigger) {
  return (
    <TabTrigger
      {...props}
      className={classNames(
        "rounded border-none py-0.5 leading-snug data-[state=active]:bg-white",
        className,
      )}
    />
  );
}
