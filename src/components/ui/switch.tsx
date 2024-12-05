import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer relative inline-flex h-8 w-[70px] shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "bg-gray-300 data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300",
        className
      )}
      {...props}
      ref={ref}
      checked={isChecked}
      onCheckedChange={(checked) => setIsChecked(checked)}
    >
      {isChecked && (
        <span
          className={cn(
            "absolute left-3 text-white text-sm font-medium transition-opacity duration-200"
          )}
        >
          เปิด
        </span>
      )}

      {!isChecked && (
        <span
          className={cn(
            "absolute right-3 text-gray-500 text-sm font-medium transition-opacity duration-200"
          )}
        >
          ปิด
        </span>
      )}

      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-6 w-6 ml-0.5 data-[state=checked]:ml-1 rounded-full bg-white shadow-md ring-0 transition-transform transform",
          "translate-x-1 data-[state=checked]:translate-x-9"
        )}
      />
    </SwitchPrimitives.Root>
  );
});

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
