import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import LoginPage from "@/pages/index";

type PopupProps = {
  triggerText?: string;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
};
export default function LoginManageModal({
  triggerText,
  icon: IconComponent,
  title,
}: PopupProps) {
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const handleSwitchChange = (value: any) => {
    setIsSwitchOn(value); 
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="bg-white hover:bg-table-background text-[#333333] justify-start acerSwift:max-macair133:text-b4"
        >
          {IconComponent && (
            <IconComponent className="h-5 w-5 -translate-x-1 stroke-[#333333]" />
          )}
          <span className="ml-1">{triggerText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`   ipad11:max-w-[55vw] iphone:max-sm:max-h-[70vh] flex flex-col justify-start`}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-table-foreground acerSwift:max-macair133:text-b1 `}
          >
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 justify-between h-full iphone:max-sm:pt-1">
          <div
            className="flex bg-white rounded-lg border border-[#E5DDEA] text-[15px] px-6 py-3 justify-between items-center"
            style={{
              boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex-col">
              <p className="acerSwift:max-macair133:text-b3 text-b1">
                จองคิวโดยไม่ต้องใช้ CMU Account
              </p>
              <p className="text-primary text-b3 acerSwift:max-macair133:text-b4 ">
                สำหรับนักเรียน นักศึกษา และบุคลากรที่ไม่มี CMU Account
              </p>
            </div>
            <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} />
            <div className="hidden">
              <LoginPage showLink={isSwitchOn} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
