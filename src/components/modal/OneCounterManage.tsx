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
import IconList from "../../../public/icons/list.svg";
import Icon from "@/components/Icon";

import { TimePickerInput } from "../ui/time-picker-input";
import { Period } from "../ui/time-picker-utils";

type PopupProps = {
  title: string;
  type: "add" | "edit";
  opened: boolean;
  onClose: () => void;
};

const OneCounterManage: React.FC<PopupProps> = ({
  title,
  type,
  opened,
  onClose,
}) => {
  const [inputValues, setInputValues] = useState({
    topicTH: "",
    topicEN: "",
    room: "",
  });

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

  const [period, setPeriod] = useState<Period>("PM");
  const [date, setDate] = useState<Date | null>(null);

  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);

  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent className="max-w-[60vw] p-6 mb-1 acerSwift:max-macair133:p-4.5 ">
        <DialogHeader>
          <DialogTitle className="text-table-foreground mb-3 acerSwift:max-macair133:text-h2">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex max-h-[500px] acerSwift:max-macair133:max-h-[400px] gap-5">
          <div className="flex flex-col w-[40%] gap-4 h-full ">
            <div
              style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
              className="flex rounded-md flex-col w-full p-5 gap-5 acerSwift:max-macair133:p-4 acerSwift:max-macair133:gap-3 justify-end h-full"
            >
              <div className="flex flex-col gap-1 ">
                <p className="text-b2 acerSwift:max-macair133:text-b3">
                  ชื่อเคาท์เตอร์{" "}
                  <span className="text-secondary">(ตัวอักษรภาษาอังกฤษ)</span>{" "}
                  <span className="text-delete">*</span>
                </p>
                <Input className="h-8 " placeholder="e.g. H"></Input>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-b2 acerSwift:max-macair133:text-b3 ">
                  บุคคลประจำเคาท์เตอร์{" "}
                  <span className="text-secondary font-medium">
                    (CMU Account)
                  </span>{" "}
                  <span className="text-delete">*</span>
                </p>
                <Input
                  className="h-8"
                  placeholder="e.g. example@cmu.ac.th"
                ></Input>
              </div>

              <div className="w-full max-w-sm ">
                <p className="text-b2 acerSwift:max-macair133:text-b3 mb-1">
                  ปิดรับคิวอัตโนมัติ <span className="text-delete">*</span>
                </p>
                <Input
                  type="time"
                  className="w-[40%] acerSwift:max-macair133:w-[42%]  py-2 px-4 border rounded-md text-gray-700"
                />
                {/* <TimePickerInput
                  type="time"
                  picker="12hours"
                  period={period}
                  date={date ?? undefined} // Convert `null` to `undefined` if necessary
                  setDate={(newDate) => setDate(newDate ?? null)}
                  ref={hourRef}
                  onRightFocus={() => minuteRef.current?.focus()}
                /> */}
              </div>
            </div>
            <div
              style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
              className="flex rounded-md flex-col w-full p-5 gap-5 acerSwift:max-macair133:gap-3 acerSwift:max-macair133:p-4"
            >
              <div className="flex flex-col">
                <p className="text-b2 mb-1 acerSwift:max-macair133:text-b3">
                  หัวข้อบริการประจำเคาท์เตอร์{" "}
                  <span className="text-secondary">(ภาษาไทย)</span>{" "}
                  <span className="text-delete">*</span>
                </p>
                <Input className="h-8" placeholder="e.g. ทุนการศึกษา"></Input>
              </div>
              <div>
                <p className="text-b2 mb-1 acerSwift:max-macair133:text-b3">
                  หัวข้อบริการประจำเคาท์เตอร์{" "}
                  <span className="text-secondary">(English)</span>{" "}
                  <span className="text-delete">*</span>
                </p>
                <Input className="h-8" placeholder="e.g. scholarship"></Input>
              </div>
              <Button
                variant="secondary"
                className="acerSwift:max-macair133:hidden"
              >
                เพิ่มหัวข้อบริการ
              </Button>
            </div>
          </div>

          <div
            style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
            className="overflow-y-auto rounded-md flex flex-1 flex-col h-full"
          >
            <div className="sticky flex top-0 bg-table-background text-table-foreground gap-3 px-5 items-center justify-between font-medium py-3">
              <div className="flex gap-3 items-center acerSwift:max-macair133:text-b2">
                <Icon
                  IconComponent={IconList}
                  className="acerSwift:max-macair133:!size-5"
                />
                รายการติดต่อ
              </div>

              <div className="text-b1 acerSwift:max-macair133:text-b2">
                {" "}
                {categories.length} รายการ
              </div>
            </div>

            {categories.map((cat) => (
              <div
                key={cat.topicTH}
                className="flex border-b-[1px] mx-5  border-[#e1e1e1] last:border-none px-2 font-medium text-default justify-between gap-3 items-center py-2"
              >
                <div className="flex items-center gap-3 ">
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
                    } h-3 w-3 acerSwift:max-macair133:h-2.5 acerSwift:max-macair133:w-2.5 rounded-[100%]`}
                  ></div>
                  <div className="flex flex-col py-2 text-b2 acerSwift:max-macair133:text-b4">
                    <p>{cat.topicTH}</p>
                    <p>{cat.topicEN}</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="border-red-500 rounded-full acerSwift:max-macair133:!p-4  text-red-500 hover:bg-[#f7b1b13b] hover:text-white"
                >
                  <Icon
                    IconComponent={IconTrash}
                    className="stroke-delete acerSwift:max-macair133:!size-3.5"
                  />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-end w-full mt-1">
          <Button variant={"ghost"} onClick={onClose}>
            ยกเลิก
          </Button>
          <Button
            variant={"ghost"}
            className="acerSwift:max-macair133:text-1 acerSwift:max-macair133:text-b3"
          >
            เพิ่มหัวข้อบริการ
          </Button>
          <Button onClick={onClose} className="px-4">
            เสร็จสิ้น
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OneCounterManage;
