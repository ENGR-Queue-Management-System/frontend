import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import IconTrash from "../../../public/icons/trash.svg";
import Icon from "@/components/Icon";

type PopupProps = {
  title: string;
  opened: boolean;
  onClose: () => void;
};
const AddCounterModal: React.FC<PopupProps> = ({ title, opened, onClose }) => {
  const categories = [
    {
      topicTH: "ฝึกงาน-สหกิจศึกษา",
      topicEN: "Internship and Cooperative Education",
    },
    {
      topicTH: "อื่นๆ",
      topicEN: "Others",
    },
    {
      topicTH: "ทุนการศึกษา",
      topicEN: "Scholarships",
    },
    {
      topicTH: "ขอคำปรึกษาด้านวิชาการ",
      topicEN: "Academic Consultation",
    },
    {
      topicTH: "แจ้งปัญหาด้านการเรียนการสอน",
      topicEN: "Report Issues with Teaching and Learning",
    },
    {
      topicTH: "ขอจัดกิจกรรมหรือโครงการพิเศษ",
      topicEN: "Request for Special Activities or Projects",
    },
  ];
  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent className=" max-w-[60vw]">
        <DialogHeader>
          <DialogTitle className="text-table-foreground ">{title}</DialogTitle>
        </DialogHeader>

        <div className="flex h-fit  gap-5">
          <div className="flex flex-col w-[40%] gap-5">
            <div
              style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
              className="flex rounded-md flex-col w-full  p-4 gap-5 justify-end"
            >
              <div className="flex flex-col gap-1">
                <p className="text-b2">
                  ชื่อเคาท์เตอร์ (กรอกตัวอักษรภาษาอังกฤษ 1 ตัว)
                </p>
                <Input className="h-8" placeholder="e.g. H"></Input>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-b2">บุคคลประจำเคาท์เตอร์ (CMU Account)</p>
                <Input
                  className="h-8"
                  placeholder="e.g. example@cmu.ac.th"
                ></Input>
              </div>
            </div>
            <div
              style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
              className="flex rounded-md flex-col w-full  p-4 gap-5 justify-end"
            >
              <div className="flex flex-col">
                <p className="text-b2">หัวข้อบริการภาษาไทยประจำเคาท์เตอร์</p>
                <Input className="h-8" placeholder="e.g. ทุนการศึกษา"></Input>
              </div>
              <div>
                <p className="text-b2">หัวข้อบริการภาษาอังกฤษประจำเคาท์เตอร์</p>
                <Input className="h-8" placeholder="e.g. scholarship"></Input>
              </div>
              <Button variant="secondary" onClick={onClose}>
                เพิ่มหัวข้อบริการ
              </Button>
            </div>
          </div>
          <div
            style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
            className="overflow-y-auto rounded-md flex flex-1 px-5 flex-col max-h-[400px] "
          >
            {categories.map((cat) => (
              <div
                key={cat.topicTH}
                className="flex border-b-[1px]  border-[#e1e1e1] px-2 font-medium text-default justify-between gap-3 items-center py-2"
              >
                <div className="flex items-center gap-5">
                  <div className="flex flex-col py-2 text-b2">
                    <p>{cat.topicTH}</p>
                    <p>{cat.topicEN}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="border-red-500 rounded-full text-red-500 hover:bg-[#f7b1b13b] hover:text-white"
                  >
                    <Icon IconComponent={IconTrash} className="stroke-delete" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button onClick={onClose}>เสร็จสิ้น</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddCounterModal;
