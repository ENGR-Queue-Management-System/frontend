import React, { useEffect } from "react";
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
import {
  CounterRequestDTO,
  CounterUpdateRequestDTO,
} from "@/services/counter/dto/counter.dto";
import { useAppDispatch, useAppSelector } from "@/store";
import Icon from "../Icon";
import IconList from "../../../public/icons/list.svg";
import { Checkbox } from "../ui/checkbox";
import { z } from "zod";
import { validateEmail } from "@/helpers/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCounter,
  updateCounter,
} from "@/services/counter/counter.service";
import { toast } from "@/hooks/use-toast";
import { isEqual } from "lodash";

const formSchema = z.object({
  counter: z
    .string()
    .min(1, { message: "Counter is required" })
    .regex(/^[1-6]$/, { message: "Counter must be between 1 and 6" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .regex(validateEmail(), "Invalid email"),
  timeClosed: z.string(),
  topics: z
    .array(z.number())
    .min(1, { message: "At least one topic is required" }),
});

type Props = {
  title: string;
  type: "add" | "edit";
  opened: boolean;
  onClose: () => void;
  data?: CounterRequestDTO & { id: number };
};

export default function OneCounterManage({
  title,
  type,
  opened,
  onClose,
  data,
}: Props) {
  const { deviceType, isPhone } = useNotification();
  const topics = useAppSelector((state) => state.topic);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...new CounterRequestDTO() },
  });

  useEffect(() => {
    form.reset();
  }, [onClose]);

  useEffect(() => {
    if (data) {
      form.setValue("counter", data.counter);
      form.setValue("email", data.email);
      form.setValue("timeClosed", data.timeClosed);
      form.setValue("topics", [...data.topics]);
    }
  }, [data]);

  const onCreateCounter = async (value: CounterRequestDTO) => {
    const res = await createCounter(value);
    if (res) {
      // toast({
      //   title: "Create Counter successfully",
      //   variant: "success",
      //   duration: 3000,
      // });
      onClose();
    }
  };

  const onUpdateCounter = async (value: CounterUpdateRequestDTO) => {
    if (data) {
      const payload: CounterUpdateRequestDTO = {};
      if (value.counter != data.counter) {
        payload.counter = value.counter;
      }
      if (value.email != data.email) {
        payload.email = value.email;
      }
      if (value.timeClosed != data.timeClosed) {
        payload.timeClosed = value.timeClosed;
      }
      if (!isEqual(value.topics, data.topics)) {
        payload.topics = value.topics;
      }
      const res = await updateCounter(data?.id!, payload);
      // if (res) {
      //   toast({
      //     title: `Update Counter ${data?.counter!} successfully`,
      //     variant: "success",
      //     duration: 3000,
      //   });
      //   onClose();
      //   form.reset(new CounterRequestDTO());
      // }
    }
  };

  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent
        classNameClose={`${
          [DEVICE_TYPE.IOS].includes(deviceType!) ? "pt-12" : ""
        }`}
        className={` ${
          isPhone
            ? "w-full h-full px-3"
            : "md:max-w-[40vw] macair133:max-w-[50vw] h-fit "
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              type == "add" ? onCreateCounter : onUpdateCounter
            )}
            className="flex flex-col gap-6"
          >
            <div
              className={`flex flex-col max-h-[65vh] acerSwift:max-macair133:max-h-[435px] iphone:max-sm:max-h-[86vh] gap-5 acerSwift:max-macair133:gap-3`}
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
                  <FormField
                    control={form.control}
                    name="counter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex">
                          <p className="text-b2 acerSwift:max-macair133:text-b4">
                            เลขเคาน์เตอร์{" "}
                            <span className="text-secondary">
                              (กรอกเลขระหว่าง 1 ถึง 6)
                            </span>{" "}
                            <span className="text-delete">*</span>
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-8 iphone:max-sm:text-b2"
                            placeholder="e.g. 5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex">
                          <p className="text-b2 acerSwift:max-macair133:text-b4">
                            บุคคลประจำเคาน์เตอร์{" "}
                            <span className="text-secondary font-medium">
                              (CMU Account)
                            </span>{" "}
                            <span className="text-delete">*</span>
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-8 iphone:max-sm:text-b2"
                            placeholder="e.g. example@cmu.ac.th"
                          ></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="timeClosed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex">
                          <p className="text-b2 acerSwift:max-macair133:text-b4 mb-1">
                            ปิดรับคิวอัตโนมัติ{" "}
                            <span className="text-delete">*</span>
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="time"
                            className="w-[50%] acerSwift:max-macair133:w-fit py-2 px-4 border rounded-md text-gray-700 iphone:max-sm:text-b2"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="topics"
                  render={() => (
                    <FormItem>
                      <div
                        style={{
                          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
                        }}
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
                          <FormField
                            key={topic.id}
                            control={form.control}
                            name="topics"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={topic.id}
                                  className="flex border-b-[1px] mx-5 border-[#e1e1e1] last:border-none px-2 font-medium text-default justify-between gap-3 items-center py-2 acerSwift:max-macair133:py-1.5"
                                >
                                  <div className="flex items-center gap-5 ">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          topic.id
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange(
                                                [
                                                  ...field.value,
                                                  topic.id,
                                                ].sort()
                                              )
                                            : field.onChange(
                                                field.value
                                                  ?.filter(
                                                    (value) =>
                                                      value !== topic.id
                                                  )
                                                  .sort()
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="flex flex-col py-2 text-b2 acerSwift:max-macair133:text-b4">
                                      <p className="mb-1 text-primary">
                                        {topic.topicTH}
                                      </p>
                                      <p className="text-describe">
                                        {topic.topicEN}
                                      </p>
                                    </FormLabel>
                                  </div>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-3 justify-end w-full mt-1 acerSwift:max-macair133:mt-0">
                <Button type="reset" variant={"ghost"} onClick={onClose}>
                  ยกเลิก
                </Button>
                <Button
                  type="submit"
                  className="px-4"
                  disabled={
                    type == "edit" &&
                    isEqual(data, { id: data?.id, ...form.watch() })
                  }
                >
                  เสร็จสิ้น
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
