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
import { useAppDispatch, useAppSelector } from "@/store";
import { updateLoginNotCmu } from "@/services/config/config.service";
import { setLoginNotCmu } from "@/store/config";
import { toast } from "@/hooks/use-toast";

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
  const config = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  const onChangeLoginNotCmu = async (value: boolean) => {
    const res = await updateLoginNotCmu({ loginNotCmu: value });
    if (res) {
      dispatch(setLoginNotCmu(value));
      toast({
        title: `${
          value ? "เปิดจองคิว" : "ปิดจองคิว"
        } โดยไม่ต้องใช้ CMU Account`,
        variant: "success",
        duration: 3000,
      });
    }
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
            <Switch
              checked={config.loginNotCmu}
              onCheckedChange={onChangeLoginNotCmu}
            />
            <div className="hidden">
              <LoginPage />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
