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
import IconUsers from "../../../public/icons/users.svg";
import IconUser from "../../../public/icons/user.svg";
import IconTrash from "../../../public/icons/trash.svg";
import IconEdit from "../../../public/icons/edit.svg";
import IconTopic from "../../../public/icons/topic.svg";
import IconList from "../../../public/icons/list.svg";
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
            ? "max-w-[40vw]"
            : "max-w-[55vw]"
        }`}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-table-foreground  ${
              openDeleteTopicPopup && "flex items-center gap-2 text-[#f85959]"
            }`}
          >
            {openDeleteTopicPopup && (
              <Icon IconComponent={IconTrash} className="stroke-[#f85959]" />
            )}
            {openAddTopicModal
              ? "เพิ่มหัวข้อการบริการ"
              : openEditTopicModal
              ? "แก้ไขหัวข้อการบริการ"
              : openDeleteTopicPopup
              ? "ลบหัวข้อการบริการ"
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
                      <div className="flex pl-3 flex-col py-2 text-[14px]">
                        <p>{cat.topicTH}</p>
                        <p>{cat.topicEN}</p>
                        <p className="font-normal text-b4 text-table-foreground"></p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setInputValues({
                            topicTH: cat.topicTH,
                            topicEN: cat.topicEN,
                          });
                          setOpenEditTopicModal(true);
                        }}
                        className=" !border-orange-500 text-orange-500 rounded-full hover:bg-[#f7cbb13b] hover:text-orange-600 acerSwift:max-macair133:text-b3"
                      >
                        <Icon
                          IconComponent={IconEdit}
                          className="stroke-orange-500 acerSwift:max-macair133:!size-4"
                        />
                        แก้ไช
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setOpenDeleteTopicPopup(true)}
                        className="border-red-500 rounded-full text-red-500 hover:bg-[#f7b1b13b] hover:text-red-600 acerSwift:max-macair133:text-b3"
                      >
                        <Icon
                          IconComponent={IconTrash}
                          className="stroke-delete acerSwift:max-macair133:!size-4"
                        />
                        ลบ
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
            <div className="flex flex-col  gap-4 pb-4">
              <div
                style={{
                  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
                }}
                className=" gap-4   py-5 rounded-lg px-4 text-b2  text-start flex flex-col "
              >
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
                <div className="grid w-full max-w-full items-center gap-1.5">
                  <p className="text-[14px] font-medium  ">
                    โค้ดสำหรับหัวข้อบริการ{" "}
                    <span className="text-secondary font-normal">
                      (กรอกตัวอักษรภาษาอังกฤษระหว่าง A ถึง Z)
                    </span>
                  </p>
                  <Input type="text" placeholder="e.g. S" />
                </div>
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
                เสร็จสิ้น
              </Button>
            </div>
          </div>
        ) : openAddTopicModal ? (
          <div>
            <div className="flex flex-col gap-4 pb-4">
              <div
                style={{
                  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
                }}
                className=" gap-4   py-5 rounded-lg px-4 text-b2  text-start flex flex-col "
              >
                <div className="grid w-full max-w-full items-center gap-1.5">
                  <p className="text-[14px] font-medium">หัวข้อภาษาไทย</p>
                  <Input type="text" placeholder="เช่น ขอคำปรึกษาด้านวิชาการ" />
                </div>
                <div className="grid w-full max-w-full items-center gap-1.5">
                  <p className="text-[14px] font-medium">หัวข้อภาษาอังกฤษ</p>
                  <Input type="text" placeholder="e.g. Academic Consultation" />
                </div>
                <div className="grid w-full max-w-full items-center gap-1.5">
                <p className="text-[14px] font-medium  ">
                    โค้ดสำหรับหัวข้อบริการ{" "}
                    <span className="text-secondary font-normal">
                      (กรอกตัวอักษรภาษาอังกฤษระหว่าง A ถึง Z)
                    </span>
                  </p>
                  <Input type="text" placeholder="e.g. S" />
                </div>
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
                เสร็จสิ้น
              </Button>
            </div>
          </div>
        ) : openDeleteTopicPopup ? (
          <div className="flex flex-col gap-1 w-full">
            <div className=' w-full'>
            <p className=" text-[15px] p-4 rounded-md text-[#f85959] bg-[#fcc4c440] w-full text-medium">
            การดำเนินการนี้ไม่สามารถย้อนกลับได้ หลังจากคุณลบหัวข้อบริการนี้ หัวข้อบริการจะถูกลบออกจากระบบนี้อย่างถาวร คุณแน่ใจจะลบหัวข้อบริการนี้ใช่ไหม?
            </p></div>
            <div className="mt-4 flex flex-col  ">
 <p className="text-b2 text-[#797979]">หัวข้อบริการ</p>
 <p className="text-b1">ทุนการศึกษา</p>
 </div>
            <div className="flex gap-3 mt-3 justify-end text-default">
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
                ลบหัวข้อบริการ
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ContactTopicMangeModal;