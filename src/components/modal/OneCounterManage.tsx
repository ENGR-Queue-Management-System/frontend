import React, { useState } from "react";
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
import IconTrash from "../../../public/icons/trash.svg";

import Icon from "@/components/Icon";

type PopupProps = {
  title: string;
  opened: boolean;
  onClose: () => void;
};
const OneCounterManage: React.FC<PopupProps> = ({ title, opened, onClose }) => {
  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent className=" max-w-[50vw]">
        <DialogHeader>
          <DialogTitle className="text-table-foreground ">{title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <div className="p-4 bg-table-background rounded-lg">
      
              <p className="mb-1 text-b2 ">บุคคลประจำเคาท์เตอร์ (CMU Account)</p>
              
              <Input
                className="h-8 bg-white"
                placeholder="e.g. example@cmu.ac.th"
              ></Input>
    
          </div>
          {/* <div
            style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
            className="flex rounded-md flex-col w-full p-4 gap-5"
          >
            <div className="flex flex-col">
              <p className="text-b2">หัวข้อบริการภาษาไทยประจำเคาท์เตอร์</p>
              <Input className="h-8" placeholder="e.g. ทุนการศึกษา"></Input>
            </div>
            <div>
              <p className="text-b2">หัวข้อบริการภาษาอังกฤษประจำเคาท์เตอร์</p>
              <Input className="h-8" placeholder="e.g. scholarship"></Input>
            </div>
          
          </div> */}
          <Button onClick={onClose}>เสร็จสิ้น</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OneCounterManage;
