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
import { useNotification } from "@/notifications/useNotification";
import { DEVICE_TYPE } from "@/config/Enum";

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
  const { deviceType, isPhone } = useNotification();

  const onChangeLoginNotCmu = async (value: boolean) => {
    const res = await updateLoginNotCmu({ loginNotCmu: value });
    // if (res) {
    //   toast({
    //     title: `${
    //       value ? "เปิดจองคิว" : "ปิดจองคิว"
    //     } โดยไม่ต้องใช้ CMU Account`,
    //     variant: "success",
    //     duration: 3000,
    //   });
    // }
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
        classNameClose={`${deviceType == DEVICE_TYPE.IOS ? "pt-12" : ""}`}
        className={`  ${
          !isPhone && "ipad11:max-w-[40vw] "
        } ipad11:max-w-[45vw]  flex flex-col justify-start  ${
          isPhone ? "w-[100vw] h-full" : "md:max-w-[50vw] min-w-fit"
        }`}
      >
        <DialogHeader
          className={`  ${deviceType == DEVICE_TYPE.IOS ? "pt-12" : ""}`}
        >
          <DialogTitle
            className={`text-table-foreground acerSwift:max-macair133:text-b1 font-medium`}
          >
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 justify-between h-full iphone:max-sm:pt-1">
          <div
            className={`flex  iphone:max-sm:gap-4 bg-white rounded-lg border border-[#E5DDEA] text-[15px] px-6 py-4 justify-between items-center ${
              isPhone ? "px-2" : ""
            }`}
            style={{
              boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex-col ">
              <p
                className={`acerSwift:max-macair133:text-b3 ${
                  isPhone ? "text-[13px]" : " text-b1"
                } font-medium `}
              >
                จองคิวโดยไม่ต้องใช้ CMU Account
              </p>
              <p className="text-primary text-[12px] acerSwift:max-macair133:text-b4 ">
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
