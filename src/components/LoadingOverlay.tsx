import { Loader2 } from "lucide-react";

export default function LoadingOverlay() {
  return (
    <div className="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-black bg-opacity-20 z-[10000]">
      <Loader2 className="animate-spin" />
    </div>
  );
}
