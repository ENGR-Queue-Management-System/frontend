import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type PopupProps = {
  title: string;
  opened: boolean;
  onClose: () => void;
};
const AddCounterModal: React.FC<PopupProps> = ({ title, opened, onClose }) => {
  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-table-foreground ">{title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <div
            // style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
            className="flex rounded-md flex-col w-full my-3  gap-5"
          >
            <div className="flex flex-col gap-1">
              <p className="text-b2">
                ชื่อเคาท์เตอร์ (กรอกตัวอักษรภาษาอังกฤษ 1 ตัว)
              </p>
              <Input className="h-8" placeholder="e.g. H"></Input>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-b2">บุคคลประจำเคาท์เตอร์ (CMU Account)</p>
              <Input
                className="h-8"
                placeholder="e.g. example@cmu.ac.th"
              ></Input>
            </div>
          </div>
         
          <Button onClick={onClose}>เสร็จสิ้น</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCounterModal;
