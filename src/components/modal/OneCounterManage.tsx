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
import { Checkbox } from "@/components/ui/checkbox";
import { TimePickerInput } from "../ui/time-picker-input";
import { Period } from "../ui/time-picker-utils";
import { useNotification } from "@/notifications/useNotification";
import { DEVICE_TYPE } from "@/config/Enum";

type Props = {
  title: string;
  type: "add" | "edit";
  opened: boolean;
  onClose: () => void;
};

export default function OneCounterManage({
  title,
  type,
  opened,
  onClose,
}: Props) {
  const { deviceType } = useNotification();
  const [inputValues, setInputValues] = useState({
    topicTH: "",
    topicEN: "",
    room: "",
  });

  const [period, setPeriod] = useState<Period>("PM");
  const [date, setDate] = useState<Date | null>(null);

  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);

  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent
        classNameClose={`${
          [DEVICE_TYPE.IOS].includes(deviceType!) ? "pt-12" : ""
        }`}
        className={` ${
          [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
            ? "w-full h-full"
            : "md:max-w-[40vw] max-w-[50vw]"
        } p-6 mb-1 h-fit acerSwift:max-macair133:p-5 flex flex-col acerSwift:max-macair133:gap-4`}
      >
        <DialogHeader
          className={`${
            [DEVICE_TYPE.IOS].includes(deviceType!) ? "pt-12" : ""
          }`}
        >
          <DialogTitle className="text-table-foreground mb-3 acerSwift:max-macair133:text-b1 acerSwift:max-macair133:mb-1">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div
          className={`flex flex-col  max-h-[65vh] acerSwift:max-macair133:max-h-[435px] gap-5 acerSwift:max-macair133:gap-3`}
        >
          <div
            className={`flex flex-col w-full gap-4 h-full acerSwift:max-macair133:gap-2.5`}
          >
            <div
              style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
              className={`flex ${
                [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!) ||
                true
                  ? " h-fit "
                  : ""
              } rounded-md flex-col w-full p-5 gap-5 acerSwift:max-macair133:p-4 acerSwift:max-macair133:gap-3 justify-start `}
            >
              <div className="flex flex-col gap-1">
                <p className="text-b2 acerSwift:max-macair133:text-b4">
                  เลขเคาน์เตอร์{" "}
                  <span className="text-secondary">
                    (กรอกเลขระหว่าง 1 ถึง 6)
                  </span>{" "}
                  <span className="text-delete">*</span>
                </p>
                <Input className="h-8 " placeholder="e.g. 5"></Input>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-b2 acerSwift:max-macair133:text-b4">
                  บุคคลประจำเคาน์เตอร์{" "}
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
                <p className="text-b2 acerSwift:max-macair133:text-b4 mb-1">
                  ปิดรับคิวอัตโนมัติ <span className="text-delete">*</span>
                </p>
                <Input
                  type="time"
                  className="w-[50%] acerSwift:max-macair133:w-fit py-2 px-4 border rounded-md text-gray-700"
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
          </div>
        </div>

        <div className="flex gap-3 justify-end w-full mt-1 acerSwift:max-macair133:mt-0">
          <Button variant={"ghost"} onClick={onClose}>
            ยกเลิก
          </Button>
          <Button onClick={onClose} className="px-4">
            เสร็จสิ้น
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
