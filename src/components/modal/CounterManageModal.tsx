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
import AddCounterModal from "../modal/AddCounterModal";

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
  const [addCounterModal, setAddCounterModal] = useState(false);
  const [openOneCounterModal, setOpenOneCounterModal] = useState(false);

  const [inputValues, setInputValues] = useState({
    topicTH: "",
    topicEN: "",
    room: "",
  });

  const categories = [
    {
      topicTH: "ฝึกงาน-สหกิจศึกษา",
      topicEN: "Internship and Cooperative Education",
      room: "งานบริการนักศึกษา",
    },
    {
      topicTH: "อื่นๆ",
      topicEN: "Others",
      room: "งานพัฒนาคุณภาพนักศึกษา",
    },
    {
      topicTH: "ทุนการศึกษา",
      topicEN: "Scholarships",
      room: "งานบริการนักศึกษา",
    },
    {
      topicTH: "ขอคำปรึกษาด้านวิชาการ",
      topicEN: "Academic Consultation",
      room: "งานพัฒนาคุณภาพนักศึกษา",
    },
    {
      topicTH: "แจ้งปัญหาด้านการเรียนการสอน",
      topicEN: "Report Issues with Teaching and Learning",
      room: "งานบริการนักศึกษา",
    },
    {
      topicTH: "ขอจัดกิจกรรมหรือโครงการพิเศษ",
      topicEN: "Request for Special Activities or Projects",
      room: "งานพัฒนาคุณภาพนักศึกษา",
    },
  ];

  return (
    <>
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
        <DialogContent className=" max-w-[50vw]">
          <DialogHeader>
            <DialogTitle className="text-table-foreground ">
              {title}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div
              className="p-0 rounded-lg mt-2 flex flex-col text-[14px]"
              style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px" }}
            >
              <div className="flex bg-table-background text-table-foreground gap-3 items-center font-medium py-3 px-4">
                <Icon IconComponent={IconTopic} /> เคาท์เตอร์ที่ให้บริการ
              </div>

              <div className="max-h-[500px] iphone:max-sm:h-[20vh] overflow-y-auto">
                <div className="flex border-b-[1px] border-[#e1e1e1] font-medium text-default justify-between gap-3 items-center ">
                  <div className="flex justify-between items-center pl-6 pr-8 py-3 w-full">
                    <div className="flex items-center gap-4">
                      <p className=" border rounded-full p-2 px-[14px]">A</p>
                      <div className="flex flex-col">
                        <p className=" text-b2">เคาท์เตอร์ A</p>
                        <p className="text-b3 text-primary">เนตรนภา สาระแปง</p>
                      </div>
                    </div>
                    <div className="flex gap-3 ">
                      <DialogClose asChild>
                        <Button
                          onClick={() => setOpenOneCounterModal(true)}
                          variant="outline"
                          className=" !border-orange-500 text-orange-500 rounded-full hover:bg-[#f7cbb13b] hover:text-orange-600"
                        >
                          <Icon
                            IconComponent={IconEdit}
                            className="stroke-orange-500"
                          />
                          แก้ไข
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          variant="outline"
                          className="border-red-500 rounded-full text-red-500 hover:bg-[#f7b1b13b] hover:text-red-600"
                        >
                          <Icon
                            IconComponent={IconTrash}
                            className="stroke-delete"
                          />
                          ลบ
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="max-h-[500px] iphone:max-sm:h-[20vh] overflow-y-auto px-5">
                {categories.map((cat) => (
                  <div
                    key={cat.topicTH}
                    className="flex border-b-[1px] border-[#e1e1e1] font-medium text-default justify-between gap-3 items-center py-2"
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={`${
                          cat.topicTH === "อื่นๆ"
                            ? "bg-contactList-others"
                            : cat.topicTH === "ทุนการศึกษา"
                            ? "bg-contactList-scholarship"
                            : cat.topicTH === "ขอคำปรึกษาด้านวิชาการ"
                            ? "bg-contactList-consultation"
                            : cat.topicTH === "แจ้งปัญหาด้านการเรียนการสอน"
                            ? "bg-contactList-report"
                            : cat.topicTH === "ขอจัดกิจกรรมหรือโครงการพิเศษ"
                            ? "bg-contactList-request"
                            : cat.topicTH === "ฝึกงาน-สหกิจศึกษา" &&
                              "bg-contactList-internship"
                        } h-3 w-3 rounded-[100%]`}
                      ></div>

                      <div className="flex flex-col py-2 text-[14px]">
                        <p>{cat.topicTH}</p>
                        <p>{cat.topicEN}</p>
                        <p className="font-normal text-b4 text-table-foreground">
                          {cat.room}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setInputValues({
                            topicTH: cat.topicTH,
                            topicEN: cat.topicEN,
                            room: cat.room,
                          });
                          setOpenEditTopicModal(true);
                        }}
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
                        onClick={() => setOpenDeleteTopicPopup(true)}
                      >
                        <Icon
                          IconComponent={IconTrash}
                          className="stroke-delete"
                        />
                      </Button>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
            <DialogClose>
              <Button
                onClick={() => setAddCounterModal(true)}
                className="w-full"
              >
                <Icon IconComponent={IconPlus} />
                <span className="ml-1"> เพิ่มเคาท์เตอร์ที่ให้บริการ</span>
              </Button>
            </DialogClose>{" "}
          </div>{" "}
        </DialogContent>
        {addCounterModal && (
          <AddCounterModal
            title="เพิ่มเคาท์เตอร์ที่ให้บริการ"
            opened={addCounterModal}
            onClose={() => setAddCounterModal(false)}
          />
        )}
        {openOneCounterModal && (
          <OneCounterManage
            title="เคาท์เตอร์ A"
            opened={openOneCounterModal}
            onClose={() => setOpenOneCounterModal(false)}
          />
        )}
      </Dialog>
    </>
  );
};

export default CounterManageModal;
