import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import IconTrash from "../../../public/icons/trash.svg";
import IconEdit from "../../../public/icons/edit.svg";
import IconTopic from "../../../public/icons/topic.svg";
import IconPlus from "../../../public/icons/plus.svg";
import IconRight from "../../../public/icons/chevronRight.svg";
import OneCounterModal from "../modal/OneCounterManage";

import Icon from "@/components/Icon";
import OneCounterManage from "./OneCounterManage";
import { useNotification } from "@/notifications/useNotification";
import { DEVICE_TYPE } from "@/config/Enum";
import { useAppSelector } from "@/store";
import { getUserName } from "@/helpers/function";

type Props = {
  triggerText?: string;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
};
export default function CounterManageModal({
  triggerText,
  icon: IconComponent,
  title,
}: Props) {
  const { deviceType, isPhone } = useNotification();
  const counters = useAppSelector((state) => state.counter);
  const [opendCounterModal, setOpenCounterModal] = useState(false);
  const [openEditOneCounterModal, setOpenEditOneCounterModal] = useState(false);
  const [openAddOneCounterModal, setOpenAddOneCounterModal] = useState(false);

  return (
    <>
      <Dialog open={opendCounterModal} onOpenChange={setOpenCounterModal}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="bg-white hover:bg-table-background text-[#333333] justify-start acerSwift:max-macair133:text-b4"
          >
            {IconComponent && (
              <IconComponent className="h-5 w-5 -translate-x-1 stroke-[#333333] acerSwift:max-macair133:w-4 acerSwift:max-macair133:h-4" />
            )}
            <span className="ml-1 ">{triggerText}</span>
          </Button>
        </DialogTrigger>
        <DialogContent
          classNameClose={`${
            [DEVICE_TYPE.IOS].includes(deviceType!) ? "pt-12" : ""
          }`}
          className={`${
            [DEVICE_TYPE.IOS].includes(deviceType!)
              ? "w-[100vw] h-full"
              : "md:max-w-[50vw] min-w-fit"
          }`}
        >
          <DialogHeader
            className={`  ${
              [DEVICE_TYPE.IOS].includes(deviceType!) ? "pt-12" : ""
            }`}
          >
            <DialogTitle className="text-primary font-[500]  acerSwift:max-macair133:text-b1">
              {title}
            </DialogTitle>{" "}
          </DialogHeader>
          <div className={`flex flex-col  gap-4  `}>
            <div
              className="p-0 rounded-lg mt-2 flex flex-col text-[14px]"
              style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px" }}
            >
              <div className="flex bg-table-background text-table-foreground acerSwift:max-macair133:text-b3 gap-3 items-center font-medium py-3 px-4">
                <Icon
                  IconComponent={IconTopic}
                  className="acerSwift:max-macair133:size-5"
                />
                เคาน์เตอร์ที่ให้บริการ
              </div>

              <div
                className={`max-h-[500px] acerSwift:max-macair133:max-h-[325px]  overflow-y-auto ${
                  isPhone ? "h-full" : ""
                }`}
              >
                <div className="flex flex-col border-b-[1px] border-[#e1e1e1] acerSwift:max-macair133:mt-2 font-medium text-default gap-3 acerSwift:max-macair133:gap-0 items-center ">
                  {counters.map((counter) => (
                    <div
                      key={counter.id}
                      className="flex justify-between items-center px-5 py-4 acerSwift:max-macair133:py-3 w-full"
                    >
                      <div className="flex items-center gap-4">
                        <p
                          className={`border rounded-full p-2 px-[14px] acerSwift:max-macair133:text-b3 ${
                            isPhone ? "hidden" : ""
                          }`}
                        >
                          {counter.counter}
                        </p>
                        <div className="flex flex-col">
                          <p
                            className={`text-b2 acerSwift:max-macair133:text-b3 ${
                              isPhone ? "text-b3" : ""
                            }`}
                          >
                            เคาน์เตอร์ {counter.counter}
                          </p>
                          <p
                            className={`text-b3 acerSwift:max-macair133:text-b4 text-primary ${
                              isPhone ? "text-b3" : ""
                            }`}
                          >
                            {getUserName(counter.user)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <DialogClose asChild>
                          <Button
                            onClick={() => {
                              setOpenEditOneCounterModal(true);
                            }}
                            variant="outline"
                            className="!border-orange-500 text-orange-500 rounded-full hover:bg-[#f7cbb13b] hover:text-orange-600 acerSwift:max-macair133:text-b4"
                            size={isPhone ? "icon" : "default"}
                          >
                            <Icon
                              IconComponent={IconEdit}
                              className="stroke-orange-500 acerSwift:max-macair133:!size-4"
                            />
                            {!isPhone && "แก้ไข"}
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            // onClick={}
                            variant="outline"
                            className="border-red-500 rounded-full text-red-500 hover:bg-[#f7b1b13b] hover:text-red-600 acerSwift:max-macair133:text-b4"
                            size={isPhone ? "icon" : "default"}
                          >
                            <Icon
                              IconComponent={IconTrash}
                              className="stroke-delete acerSwift:max-macair133:!size-4"
                            />
                            {!isPhone && "ลบ"}
                          </Button>
                        </DialogClose>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogClose>
              <Button
                onClick={() => setOpenAddOneCounterModal(true)}
                className="w-full mt-1"
              >
                <Icon
                  IconComponent={IconPlus}
                  className="acerSwift:max-macair133:size-4"
                />
                <span className="ml-1 acerSwift:max-macair133:text-bภ">
                  เพิ่มเคาน์เตอร์ที่ให้บริการ
                </span>
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
        <OneCounterModal
          title="เพิ่มเคาน์เตอร์ที่ให้บริการ"
          type="add"
          opened={openAddOneCounterModal}
          onClose={() => {
            setOpenAddOneCounterModal(false);
            setOpenCounterModal(true);
          }}
        />
        <OneCounterManage
          title="แก้ไขเคาน์เตอร์ A"
          type="edit"
          opened={openEditOneCounterModal}
          onClose={() => {
            setOpenEditOneCounterModal(false);
            setTimeout(() => {
              setOpenCounterModal(true);
            }, 40);
          }}
        />
      </Dialog>
    </>
  );
}
