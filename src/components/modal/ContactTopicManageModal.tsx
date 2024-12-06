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
import IconUsers from "../../../public/icons/users.svg";
import IconTrash from "../../../public/icons/trash.svg";
import IconEdit from "../../../public/icons/edit.svg";
import IconTopic from "../../../public/icons/topic.svg";
import IconPlus from "../../../public/icons/plus.svg";

import Icon from "@/components/Icon";

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
  const categories = [
    { topic: "ฝึกงาน-สหกิจศึกษา", room: "งานบริการนักศึกษา" },
    { topic: "อื่นๆ", room: "งานพัฒนาคุณภาพนักศึกษา" },
    { topic: "ทุนการศึกษา", room: "งานบริการนักศึกษา" },
    { topic: "ขอคำปรึกษาด้านวิชาการ", room: "งานพัฒนาคุณภาพนักศึกษา" },
    { topic: "แจ้งปัญหาด้านการเรียนการสอน", room: "งานบริการนักศึกษา" },
    { topic: "ขอจัดกิจกรรมหรือโครงการพิเศษ", room: "งานพัฒนาคุณภาพนักศึกษา" },
  ];
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
          <span className="ml-1">{triggerText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[45vw]">
        <DialogHeader>
          <DialogTitle className=" text-table-foreground">{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>{" "}
        <div
          className="p-0 rounded-lg mt-2 flex flex-col gap-1 text-[14px]"
          style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px" }}
        >
          <div className="flex bg-table-background text-table-foreground gap-3 items-center font-medium py-3 px-4 ">
            <Icon IconComponent={IconTopic} /> รายชื่อหัวข้อการบริการ
          </div>
          <div className=" max-h-[400px] overflow-y-auto px-5">
            {categories.map((cat) => (
              <div className="flex border-b-[1px] border-[#e1e1e1] font-medium text-default justify-between gap-3 items-center py-2  ">
                <div className="flex items-center gap-5">
                  <div
                    className={`${
                      cat.topic === "อื่นๆ"
                        ? "bg-contactList-others"
                        : cat.topic === "ทุนการศึกษา"
                        ? "bg-contactList-scholarship"
                        : cat.topic === "ขอคำปรึกษาด้านวิชาการ"
                        ? "bg-contactList-consultation"
                        : cat.topic === "แจ้งปัญหาด้านการเรียนการสอน"
                        ? "bg-contactList-report"
                        : cat.topic === "ขอจัดกิจกรรมหรือโครงการพิเศษ"
                        ? "bg-contactList-request"
                        : cat.topic === "ฝึกงาน-สหกิจศึกษา" &&
                          "bg-contactList-internship"
                    } h-3 w-3 rounded-[100%]`}
                  ></div>

                  <div className="flex flex-col py-2">
                    <p>{cat.topic}</p>
                    <p className=" font-normal text-b3 text-table-foreground">
                      {cat.room}
                    </p>
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
                      className="stroke-[#ff4747]"
                    />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button className=" px-5">
          <Icon IconComponent={IconPlus} />
          เพิ่มหัวข้อการบริการ
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddAdminModal;
