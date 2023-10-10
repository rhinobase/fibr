import { FieldWrapper, PropType } from "@fiber/react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { classNames } from "@rafty/ui";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export function ExtendComponent(props: PropType) {
  const { name, field } = props;
  const [defaultValue, setDefaultValue] = useState([50]);

  const { register, setValue } = useFormContext();
  register(name);

  useEffect(() => {
    setValue(name, defaultValue);
  }, []);

  return (
    <FieldWrapper
      name={name}
      label={field.label}
      description={field.description}
    >
      <Slider
        onValueChange={(value) => setDefaultValue(value)}
        value={defaultValue}
        max={100}
        step={1}
      />
      <div className="text-secondary-500 font-semibold">{defaultValue}</div>
    </FieldWrapper>
  );
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={classNames(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="bg-secondary-400 relative h-2 w-full grow overflow-hidden rounded-full">
      <SliderPrimitive.Range className="bg-primary-300 absolute h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="border-primary ring-offset-background focus-visible:ring-ring bg-primary-600 block h-5 w-5 rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;
