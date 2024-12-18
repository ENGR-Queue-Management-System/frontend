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

type PopupProps = {
  triggerText?: string;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
};
const CounterManageModal: React.FC<PopupProps> = ({
  triggerText,
  icon: IconComponent,
  title,
}) => {
  const [opendCounterModal, setOpenCounterModal] = useState(false);
  const [openOneCounterModal, setOpenOneCounterModal] = useState(false);

  return (
    <>
      <Dialog open={opendCounterModal} onOpenChange={setOpenCounterModal}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="bg-white hover:bg-table-background text-[#333333] justify-start acerSwift:max-macair133:text-b3"
          >
            {IconComponent && (
              <IconComponent className="h-5 w-5 -translate-x-1 stroke-[#333333] acerSwift:max-macair133:w-4 acerSwift:max-macair133:h-4" />
            )}
            <span className="ml-1">{triggerText}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className=" max-w-[50vw]">
          <DialogHeader>
            <DialogTitle className="text-table-foreground acerSwift:max-macair133:text-b1">
              {title}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div
              className="p-0 rounded-lg mt-2 flex flex-col text-[14px]"
              style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px" }}
            >
              <div className="flex bg-table-background text-table-foreground acerSwift:max-macair133:text-b2 gap-3 items-center font-medium py-3 px-4">
                <Icon
                  IconComponent={IconTopic}
                  className="acerSwift:max-macair133:size-6"
                />{" "}
                เคาท์เตอร์ที่ให้บริการ
              </div>

              <div className="max-h-[500px] iphone:max-sm:h-[20vh] overflow-y-auto">
                <div className="flex border-b-[1px] border-[#e1e1e1] font-medium text-default justify-between gap-3 items-center ">
                  <div className="flex justify-between items-center  px-5 py-4 w-full">
                    <div className="flex items-center gap-4">
                      <p className=" border rounded-full p-2 px-[14px] acerSwift:max-macair133:text-b3">
                        A
                      </p>
                      <div className="flex flex-col">
                        <p className=" text-b2 acerSwift:max-macair133:text-b3">
                          เคาท์เตอร์ A
                        </p>
                        <p className="text-b3 acerSwift:max-macair133:text-b4 text-primary">
                          เนตรนภา สาระแปง
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 ">
                      <DialogClose asChild>
                        <Button
                          onClick={() => setOpenOneCounterModal(true)}
                          variant="outline"
                          className=" !border-orange-500 text-orange-500 rounded-full hover:bg-[#f7cbb13b] hover:text-orange-600 acerSwift:max-macair133:text-b3"
                        >
                          <Icon
                            IconComponent={IconEdit}
                            className="stroke-orange-500 acerSwift:max-macair133:!size-4"
                          />
                          แก้ไข
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          variant="outline"
                          className="border-red-500 rounded-full text-red-500 hover:bg-[#f7b1b13b] hover:text-red-600 acerSwift:max-macair133:text-b3"
                        >
                          <Icon
                            IconComponent={IconTrash}
                            className="stroke-delete acerSwift:max-macair133:!size-4"
                          />
                          ลบ
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogClose>
              <Button
                onClick={() => setOpenOneCounterModal(true)}
                className="w-full mt-1"
              >
                <Icon IconComponent={IconPlus} />
                <span className="ml-1 acerSwift:max-macair133:text-b3">
                  {" "}
                  เพิ่มเคาท์เตอร์ที่ให้บริการ
                </span>
              </Button>
            </DialogClose>{" "}
          </div>{" "}
        </DialogContent>
        {openOneCounterModal && (
          <OneCounterModal
            title="เพิ่มเคาท์เตอร์ที่ให้บริการ"
            type="add"
            opened={openOneCounterModal}
            onClose={() => {
              setOpenOneCounterModal(false);
              setOpenCounterModal(true);
            }}
          />
        )}
        {openOneCounterModal && (
          <OneCounterManage
            title="แก้ไขเคาท์เตอร์ A"
            type="edit"
            opened={openOneCounterModal}
            onClose={() => {
              setOpenOneCounterModal(false);
              setTimeout(() => {
                setOpenCounterModal(true);
              }, 40);
            }}
          />
        )}
      </Dialog>
    </>
  );
};

export default CounterManageModal;
