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
import IconTopic from "../../../public/icons/topic.svg";
import IconPlus from "../../../public/icons/plus.svg";

import Icon from "@/components/Icon";

type PopupProps = {
  triggerText?: string;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
};
const ContactTopicMangeModal: React.FC<PopupProps> = ({
  triggerText,
  icon: IconComponent,
  title,
}) => {
  const [openAddTopicModal, setOpenAddTopicModal] = useState(false);
  const [openEditTopicModal, setOpenEditTopicModal] = useState(false);
  const [openDeleteTopicPopup, setOpenDeleteTopicPopup] = useState(false);

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
    <Dialog
      onOpenChange={(isOpen) => {
        if (isOpen) {
          setOpenDeleteTopicPopup(false);
          setOpenAddTopicModal(false);
          setOpenEditTopicModal(false);
        }
      }}
    >
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
      <DialogContent
        className={`${
          openAddTopicModal || openEditTopicModal || openDeleteTopicPopup
            ? "max-w-[35vw]"
            : "max-w-[45vw]"
        }`}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-table-foreground  ${
              openDeleteTopicPopup && "flex items-center gap-2 text-delete"
            }`}
          >
            {openDeleteTopicPopup && (
              <Icon IconComponent={IconTrash} className="stroke-delete" />
            )}
            {openAddTopicModal
              ? "เพิ่มหัวข้อการบริการ"
              : openEditTopicModal
              ? "แก้ไขหัวข้อการบริการ"
              : openDeleteTopicPopup
              ? "ลบหัวข้อการบริการ ?"
              : title}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {!openAddTopicModal && !openEditTopicModal && !openDeleteTopicPopup ? (
          <div className="flex flex-col gap-4">
            <div
              className="p-0 rounded-lg mt-2 flex flex-col gap-1 text-[14px]"
              style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px" }}
            >
              <div className="flex bg-table-background text-table-foreground gap-3 items-center font-medium py-3 px-4">
                <Icon IconComponent={IconTopic} /> รายชื่อหัวข้อการบริการ
              </div>
              <div className="max-h-[500px] iphone:max-sm:h-[20vh] overflow-y-auto px-5">
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
              </div>
            </div>
            <Button className="px-5" onClick={() => setOpenAddTopicModal(true)}>
              <Icon IconComponent={IconPlus} />
              เพิ่มหัวข้อการบริการ
            </Button>
          </div>
        ) : openEditTopicModal ? (
          <div>
            <div className="flex flex-col gap-4 pb-4">
              <div className="grid w-full max-w-full items-center gap-1.5">
                <p className="text-[14px] font-medium">หัวข้อภาษาไทย</p>
                <Input
                  type="text"
                  value={inputValues.topicTH}
                  placeholder="เช่น ขอคำปรึกษาด้านวิชาการ"
                />
              </div>
              <div className="grid w-full max-w-full items-center gap-1.5">
                <p className="text-[14px] font-medium">หัวข้อภาษาอังกฤษ</p>
                <Input
                  type="text"
                  value={inputValues.topicEN}
                  placeholder="e.g. Academic Consultation"
                />
              </div>
              <div className="border my-2 mb-1"></div>
              <div className="grid w-full max-w-full items-center gap-1.5">
                <p className="text-[14px] font-medium">
                  เลือกสถานที่ติดต่อสำหรับหัวข้อที่ท่านแก้ไข
                </p>
                <Input
                  type="text"
                  value={inputValues.room}
                  placeholder="เช่น งานบริการนักศึกษา"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end text-default">
              <Button
                className="mt-4"
                variant="ghost"
                onClick={() => setOpenEditTopicModal(false)}
              >
                ยกเลิก
              </Button>
              <Button
                className="mt-4"
                onClick={() => setOpenEditTopicModal(false)}
              >
                แก้ไข
              </Button>
            </div>
          </div>
        ) : openAddTopicModal ? (
          <div>
            <div className="flex flex-col gap-4 pb-4">
              <div className="grid w-full max-w-full items-center gap-1.5">
                <p className="text-[14px] font-medium">หัวข้อภาษาไทย</p>
                <Input type="text" placeholder="เช่น ขอคำปรึกษาด้านวิชาการ" />
              </div>
              <div className="grid w-full max-w-full items-center gap-1.5">
                <p className="text-[14px] font-medium">หัวข้อภาษาอังกฤษ</p>
                <Input type="text" placeholder="e.g. Academic Consultation" />
              </div>
              <div className="border my-2 mb-1"></div>
              <div className="grid w-full max-w-full items-center gap-1.5">
                <p className="text-[14px] font-medium">
                  เลือกสถานที่ติดต่อสำหรับหัวข้อที่ท่านเพิ่ม
                </p>
                <Input type="text" placeholder="เช่น งานบริการนักศึกษา" />
              </div>
            </div>

            <div className="flex gap-3 justify-end text-default">
              <Button
                className="mt-4"
                variant="ghost"
                onClick={() => setOpenAddTopicModal(false)}
              >
                ยกเลิก
              </Button>
              <Button
                className="mt-4"
                onClick={() => setOpenAddTopicModal(false)}
              >
                เพิ่ม
              </Button>
            </div>
          </div>
        ) : openDeleteTopicPopup ? (
          <div className="flex flex-col gap-1">
            <p className="text-delete text-b2 text-medium">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="flex gap-3 justify-end text-default">
              <Button
                className="mt-4"
                variant="ghost"
                onClick={() => setOpenDeleteTopicPopup(false)}
              >
                ยกเลิก
              </Button>
              <Button
                className="mt-4 bg-delete hover:bg-delete/90"
                onClick={() => setOpenDeleteTopicPopup(false)}
              >
                ลบ
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ContactTopicMangeModal;
