import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type PopupProps = {
  triggerText: string;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
};
const AddAdminModal: React.FC<PopupProps> = ({
  triggerText,
  icon: IconComponent,
  title,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="bg-white hover:bg-table-background text-[#333333] justify-start"
        >
          {IconComponent && (
            <IconComponent className="h-5 w-5 -translate-x-1 stroke-[#333333]" />
          )}
          <span className="ml-2">{triggerText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[50vw]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {" "}
            <div
              className="p-6 rounded-lg mt-3 flex flex-col gap-1"
              style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px" }}
            >
              เพิ่มผู้ดูแลระบบด้วย CMU account
              <div className="flex gap-3">
                <Input type="email" placeholder="e.g. example@cmu.ac.th" />
                <Button>เพิ่ม</Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddAdminModal;
