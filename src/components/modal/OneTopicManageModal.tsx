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
import { useAppDispatch } from "@/store";
import Icon from "../Icon";
import IconList from "../../../public/icons/list.svg";
import { Checkbox } from "../ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { isEqual } from "lodash";
import { TopicRequestDTO } from "@/services/topic/dto/topic.dto";
import { createTopic, updateTopic } from "@/services/topic/topic.service";
import { addTopic, updateTopicData } from "@/store/topic";

const formSchema = z.object({
  topicTH: z.string().min(1, { message: "TopicTH is required" }),
  topicEN: z.string().min(1, { message: "TopicEN is required" }),
  code: z
    .string()
    .regex(/^[A-Z]$/, { message: "Code must be a single letter" }),
});

type Props = {
  title: string;
  type: "add" | "edit";
  opened: boolean;
  onClose: () => void;
  data?: TopicRequestDTO & { id: number };
};

export default function OneTopicManageModal({
  title,
  type,
  opened,
  onClose,
  data,
}: Props) {
  const { deviceType, isPhone } = useNotification();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...new TopicRequestDTO() },
  });

  useEffect(() => {
    form.reset();
  }, [onClose]);

  useEffect(() => {
    if (data) {
      form.setValue("topicTH", data.topicTH);
      form.setValue("topicEN", data.topicEN);
      form.setValue("code", data.code);
    }
  }, [data]);

  const onCreateTopic = async (value: TopicRequestDTO) => {
    const res = await createTopic(value);
    if (res) {
      dispatch(addTopic(res));
      toast({
        title: "Create Topic successfully",
        variant: "success",
        duration: 3000,
      });
      onClose();
    }
  };

  const onUpdateTopic = async (value: TopicRequestDTO) => {
    if (data) {
      const payload: Partial<TopicRequestDTO> = {};
      if (value.topicTH != data.topicTH) {
        payload.topicTH = value.topicTH;
      }
      if (value.topicEN != data.topicEN) {
        payload.topicEN = value.topicEN;
      }
      if (value.code != data.code) {
        payload.code = value.code;
      }
      const res = await updateTopic(data.id, payload);
      if (res) {
        dispatch(updateTopicData(res));
        toast({
          title: `Update Topic successfully`,
          variant: "success",
          duration: 3000,
        });
        onClose();
        form.reset(new TopicRequestDTO());
      }
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              type == "add" ? onCreateTopic : onUpdateTopic
            )}
          >
            <div className="flex flex-col gap-4 pb-4">
              <div
                // style={{
                //   boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
                // }}
                className=" gap-4 rounded-lg text-b2  text-start flex flex-col "
              >
                <FormField
                  control={form.control}
                  name="topicTH"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid w-full max-w-full items-center gap-1.5">
                        <FormLabel>
                          <p className="text-b2 acerSwift:max-macair133:text-b4 font-medium">
                            หัวข้อภาษาไทย
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="iphone:max-sm:text-b2"
                            placeholder="เช่น ขอคำปรึกษาด้านวิชาการ"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="topicEN"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid w-full max-w-full items-center gap-1.5">
                        <FormLabel>
                          <p className="text-b2 acerSwift:max-macair133:text-b4 font-medium">
                            หัวข้อภาษาอังกฤษ
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="iphone:max-sm:text-b2"
                            placeholder="e.g. Academic Consultation"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid w-full max-w-full items-center gap-1.5">
                        <FormLabel>
                          <p className="text-b2 acerSwift:max-macair133:text-b4 font-medium">
                            โค้ดสำหรับหัวข้อบริการ{" "}
                            <span className="text-secondary font-normal iphone:max-sm:hidden">
                              (กรอกตัวอักษรภาษาอังกฤษระหว่าง A ถึง Z)
                            </span>
                            <span className="text-secondary font-normal ipad11:hidden">
                              <br />
                              (กรอกตัวอักษรภาษาอังกฤษระหว่าง A ถึง Z)
                            </span>
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            max={1}
                            onChange={(event) =>
                              field.onChange(event.target.value.toUpperCase())
                            }
                            className="iphone:max-sm:text-b2"
                            placeholder="e.g. S"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end text-default">
              <Button type="reset" variant="ghost" onClick={onClose}>
                ยกเลิก
              </Button>
              <Button
                type="submit"
                disabled={
                  type == "edit" &&
                  isEqual(data, { id: data?.id, ...form.watch() })
                }
              >
                เสร็จสิ้น
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
