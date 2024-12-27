import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNotification } from "@/notifications/useNotification";
import { DEVICE_TYPE } from "@/config/Enum";
import { useForm } from "react-hook-form";
import { CounterUpdateRequestDTO } from "@/services/counter/dto/counter.dto";
import { useAppSelector } from "@/store";
import Icon from "../Icon";
import IconList from "../../../public/icons/list.svg";
import { Checkbox } from "../ui/checkbox";

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
  const { deviceType, isPhone } = useNotification();
  const topics = useAppSelector((state) => state.topic);
  const form = useForm({
    defaultValues: new CounterUpdateRequestDTO(),
  });

  const onCreateCounter = async () => {};

  const onUpdateCounter = async () => {};

  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent
        classNameClose={`${
          [DEVICE_TYPE.IOS].includes(deviceType!) ? "pt-12" : ""
        }`}
        className={` ${
          isPhone
            ? "w-full max-h-full"
            : "md:max-w-[40vw] macair133:max-w-[50vw] h-fit"
        } p-6 mb-1 acerSwift:max-macair133:p-5 flex flex-col acerSwift:max-macair133:gap-4`}
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
            className={`flex flex-col w-full gap-4 h-full acerSwift:max-macair133:gap-2.5 acerSwift:max-macair133:max-h-[390px] overflow-y-auto p-1`}
          >
            <div
              style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
              className={`flex ${
                isPhone ? "h-fit" : ""
              } rounded-md flex-col w-full p-5 gap-5 acerSwift:max-macair133:p-4 acerSwift:max-macair133:gap-3 justify-start `}
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(
                    type == "add" ? onCreateCounter : onUpdateCounter
                  )}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-b2 acerSwift:max-macair133:text-b4">
                      เลขเคาน์เตอร์{" "}
                      <span className="text-secondary">
                        (กรอกเลขระหว่าง 1 ถึง 6)
                      </span>{" "}
                      <span className="text-delete">*</span>
                    </p>
                    <Input
                      className="h-8 iphone:max-sm:text-b2"
                      placeholder="e.g. 5"
                    ></Input>
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
                      className="h-8 iphone:max-sm:text-b2"
                      placeholder="e.g. example@cmu.ac.th"
                    ></Input>
                  </div>
                  <div className="w-full max-w-sm ">
                    <p className="text-b2 acerSwift:max-macair133:text-b4 mb-1">
                      ปิดรับคิวอัตโนมัติ <span className="text-delete">*</span>
                    </p>
                    <Input
                      type="time"
                      className="w-[50%] acerSwift:max-macair133:w-fit py-2 px-4 border rounded-md text-gray-700 iphone:max-sm:text-b2"
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
                </form>
              </Form>
            </div>

            <div
              style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
              className="rounded-md flex flex-1 flex-col h-full"
            >
              <div className="sticky flex top-0  bg-table-background text-table-foreground gap-3 px-5 items-center justify-between font-medium py-3">
                <div className="flex gap-3 text-b2 items-center acerSwift:max-macair133:text-b3">
                  <Icon
                    IconComponent={IconList}
                    className="acerSwift:max-macair133:!size-4 size-5"
                  />
                  หัวข้อบริการ
                </div>

                <div className="text-b2 text-red-500 acerSwift:max-macair133:text-b4">
                  เลือกอย่างน้อย 1 รายการ
                </div>
              </div>

              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className="flex border-b-[1px] mx-5 border-[#e1e1e1] last:border-none px-2 font-medium text-default justify-between gap-3 items-center py-2 acerSwift:max-macair133:py-1.5"
                >
                  <div className="flex items-center gap-5 ">
                    <Checkbox id="terms1" />
                    <div className="flex flex-col py-2 text-b2 acerSwift:max-macair133:text-b4">
                      <p>{topic.topicTH}</p>
                      <p>{topic.topicEN}</p>
                    </div>
                  </div>

                  {/* <Button
                  variant="outline"
                  className="border-red-500 rounded-full acerSwift:max-macair133:!p-3.5  text-red-500 hover:bg-[#f7b1b13b] hover:text-white"
                >
                  <Icon
                    IconComponent={IconTrash}
                    className="stroke-delete acerSwift:max-macair133:!size-3.5"
                  />
                </Button> */}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 justify-end w-full mt-1 acerSwift:max-macair133:mt-0">
            <Button variant={"ghost"} onClick={onClose}>
              ยกเลิก
            </Button>
            <Button type="submit" className="px-4">
              เสร็จสิ้น
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
