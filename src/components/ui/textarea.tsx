import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & { maxLength?: number }
>(({ className, maxLength = 100, ...props }, ref) => {
  const [charCount, setCharCount] = React.useState(0);

  React.useEffect(() => {
    const length = (props.value as string)?.length;
    if (maxLength && length <= maxLength) {
      setCharCount(length);
    }
  }, [props.value]);

  return (
    <div className="flex flex-col max-w-full relative">
      <textarea
        className={cn(
          `relative flex h-[100px] iphone:max-sm:w-[85vw] iphone:max-sm:h-32 iphone:max-sm:text-sm sm:max-macair133:w-[50vw] macair133:w-[40vw] ipad11:max-samsungA24:min-w bg-[#F6F6F6] resize-none rounded-md border   px-5 py-4 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
          className
        )}
        ref={ref}
        maxLength={maxLength}
        {...props}
      />
      {maxLength && (
        <div
          className={`absolute bottom-2 right-3 text-right text-xs font-medium text-gray-500 mt-2`}
        >
          {charCount}/{maxLength}
        </div>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
