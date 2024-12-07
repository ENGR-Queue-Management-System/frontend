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
import IconEdit from "../../../public/icons/edit.svg";
import IconBuild from "../../../public/icons/build.svg";
import IconPlus from "../../../public/icons/plus.svg";

import Icon from "@/components/Icon";

type PopupProps = {
  triggerText?: string;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
};
const RoomMangeModal: React.FC<PopupProps> = ({
  triggerText,
  icon: IconComponent,
  title,
}) => {
  // const [openAddTopicModal, setOpenAddTopicModal] = useState(false);
  // const [openEditTopicModal, setOpenEditTopicModal] = useState(false);
  // const [openDeleteTopicPopup, setOpenDeleteTopicPopup] = useState(false);

  // const [inputValues, setInputValues] = useState({
  //   topicTH: "",
  //   topicEN: "",
  //   room: "",
  // });

  const categories = [
    {
      id: 1,
      room: "งานบริการนักศึกษา",
      instructor: ["เนตรนภา สาระแปง", "สวิช จารึกพูนผล"],
    },
    {
      id: 2,
      room: "งานพัฒนาคุณภาพนักศึกษา",
      instructor: ["วรพิชชา เมืองยศ", "ธนพร ชาญชนะโยธิน"],
    },
  ];

  return (
    <Dialog onOpenChange={(isOpen) => {}}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="bg-white hover:bg-table-background text-[#333333] justify-start"
        >
          {IconComponent && (
            <IconComponent className="h-5 w-5 -translate-x-1 stroke-[#333333]" />
          )}
          <span className="ml-1">{triggerText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className={`${"max-w-[45vw]"}`}>
        <DialogHeader>
          <DialogTitle
            className={`text-table-foreground flex items-center gap-2`}
          >
            {title}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div
            className="p-0 rounded-lg mt-2 flex flex-col gap-1 text-[14px]"
            style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px" }}
          >
            <div className="flex bg-table-background text-table-foreground gap-3 items-center font-medium py-3 px-4">
              <Icon IconComponent={IconBuild} /> รายชื่อสถานที่บริการ
            </div>
            <div className="max-h-[500px] iphone:max-sm:h-[20vh] overflow-y-auto px-5">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex border-b-[1px] border-[#e1e1e1] font-medium text-default justify-between gap-3 items-center py-2"
                >
                  <div className="flex items-center gap-5">
                    <div className="flex flex-col py-2 text-[14px]">
                      <p>{cat.room}</p>
                      <div className="flex gap-2 items-center">
                        <p className="text-default text-b4 font-medium">
                          ผู้ดูแล:
                        </p>
                        <div className="flex items-center">
                          {cat.instructor.map((ins, index) => (
                            <span
                              key={index}
                              className="font-normal text-b4 text-table-foreground"
                            >
                              {ins}
                              {index < cat.instructor.length - 1 && (
                                <span className="mx-1">,</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="border-[#F39D4E] rounded-full text-[#F39D4E] hover:bg-[#f7b1b13b] hover:text-white"
                    >
                      <Icon
                        IconComponent={IconEdit}
                        className="stroke-[#F39D4E]"
                      />
                    </Button>

                    <Button
                      variant="outline"
                      className="border-red-500 rounded-full text-red-500 hover:bg-[#f7b1b13b] hover:text-white"
                    >
                      <Icon
                        IconComponent={IconTrash}
                        className="stroke-delete"
                      />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button className="px-5">
            <Icon IconComponent={IconPlus} />
            เพิ่มสถานที่บริการ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomMangeModal;
