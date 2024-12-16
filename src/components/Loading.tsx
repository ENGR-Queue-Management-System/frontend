import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-1 justify-center items-center w-full h-full">
      <Loader2 className="animate-spin" />
    </div>
  );
}
