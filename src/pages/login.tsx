import { Button } from "@/components/ui/button";
import { Route } from "@/config/Route";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { useNotification } from "@/notifications/useNotification";
import { useForm } from "react-hook-form";
import { login } from "@/services/authentication/authentication.service";
import { Input } from "@/components/ui/input";
import Loading from "@/components/Loading";
import { checkTokenExpired, validateEngThai } from "@/helpers/validation";
import { setUser } from "@/store/user";
import IconUsers from "../../public/icons/users.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginRequestDTO } from "@/services/authentication/dto/authentication.dto";
import { useToast } from "@/hooks/use-toast";
import { setLoadingOverlay } from "@/store/loading";
import { DEVICE_TYPE } from "@/config/Enum";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/Icon";

export default function Login() {
  const { deviceType } = useNotification();
  const loading = useAppSelector((state) => state.loading.loadingOverlay);
  const [selectTopic, setSelectTopic] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const onBlurHandler = async (fieldName: any) => {
    await form.trigger(fieldName);
  };

  const categories = [
    {
      id: 1,
      topicTH: "ฝึกงาน-สหกิจศึกษา",
      topicEN: "Internship and Cooperative",
      room: "Counter A",
    },

    {
      id: 2,
      topicTH: "ทุนการศึกษา",
      topicEN: "Scholarships",
      room: "Counter A",
    },
    {
      id: 3,
      topicTH: "ขอคำปรึกษาด้านวิชาการ",
      topicEN: "Academic Consultation",
      room: "Counter B",
    },
    {
      id: 4,
      topicTH: "แจ้งปัญหาด้านการเรียนการสอน",
      topicEN: "Report Issues with Teaching and Learning",
      room: "Counter B",
    },
    {
      id: 5,
      topicTH: "ขอจัดกิจกรรมหรือโครงการพิเศษ",
      topicEN: "Request for Special Activities or Projects",
      room: "Counter C",
    },
    {
      id: 6,
      topicTH: "อื่นๆ",
      topicEN: "Others",
      room: "Counter A",
    },
  ];

  const onClickLogin = async (data: LoginRequestDTO) => {
    dispatch(setLoadingOverlay(true));
    const res = await login(data);
    if (res) {
      localStorage.setItem("token", res.token);
      const decodeToken = await checkTokenExpired(res.token, true);
      dispatch(setUser(decodeToken));
      toast({
        title: "Login Successfully",
        // description: "",
        duration: 3,
      });
      router.push(Route.StudentIndex);
    }
    dispatch(setLoadingOverlay(false));
  };

  return (
    <div className="flex flex-col h-full w-full overscroll-y-auto z-0  gap-10  justify-center items-center">
      <div
        className={` flex flex-col items-center text-[#262626] justify-center text-center text-[24px] text-semibold iphone:max-sm:w-[85vw] iphone:max-sm:text-[16px] sm:max-macair133:text-[20px] macair133:text-[24px]`}
      >
        <p className="font-[500]">วันนี้เราสามารถช่วยอะไรคุณได้บ้าง</p>
        <p className="font-[500] ">
          What can we help you with today? <br /> Let us know to get started
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onClickLogin)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            {...form.register("firstName", {
              required: true,
              pattern: {
                value: validateEngThai(),
                message: "invalid first name",
              },
            })}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">
                  ชื่อ (Firstname) <p className="text-red-600">*</p>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. สมหมาย"
                    {...field}
                    className={` ${
                      deviceType === DEVICE_TYPE.IOS ? "w-[90vw]" : "w-[40vw]"
                    }`}
                    onBlur={() => onBlurHandler("firstName")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            {...form.register("lastName", {
              required: true,
              pattern: {
                value: validateEngThai(),
                message: "invalid last name",
              },
            })}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">
                  นามสกุล (Lastname) <p className="text-red-600">*</p>
                </FormLabel>
                <FormControl>
                  <Input
                    className={` ${
                      deviceType === DEVICE_TYPE.IOS ? "w-[90vw]" : "w-[40vw]"
                    }`}
                    placeholder="e.g. เรียนดี"
                    {...field}
                    onBlur={() => onBlurHandler("lastName")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Select onValueChange={(value) => setSelectTopic(value)}>
            <SelectTrigger
              className={`iphone:max-sm:w-[85vw] iphone:max-sm:h-32 iphone:max-sm:text-sm sm:max-macair133:w-[50vw] macair133:w-[40vw] px-6 ${
                selectTopic === ""
                  ? "py-3 text-primary iphone:max-sm:h-12"
                  : "py-2 iphone:max-sm:h-18"
              }`}
            >
              <SelectValue placeholder="เลือกเรื่องที่ต้องการจะให้เราช่วยเหลือ" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((item) => (
                  <SelectItem value={item.topicTH} key={item.id}>
                    <div className="flex items-center gap-4 py-1">
                      <div
                        className={`${
                          item.topicTH === "อื่นๆ"
                            ? "bg-contactList-others"
                            : item.topicTH === "ทุนการศึกษา"
                            ? "bg-contactList-scholarship"
                            : item.topicTH === "ขอคำปรึกษาด้านวิชาการ"
                            ? "bg-contactList-consultation"
                            : item.topicTH === "แจ้งปัญหาด้านการเรียนการสอน"
                            ? "bg-contactList-report"
                            : item.topicTH === "ขอจัดกิจกรรมหรือโครงการพิเศษ"
                            ? "bg-contactList-request"
                            : item.topicTH === "ฝึกงาน-สหกิจศึกษา" &&
                              "bg-contactList-internship"
                        } h-3 w-3 rounded-[100%] iphone:max-sm:hidden`}
                      ></div>
                      <div className="flex flex-col text-start text-b2">
                        <p>
                          {item.topicTH} (
                          <span className="font-medium">{item.topicEN}</span>)
                        </p>
                        <p className="text-b3 text-primary">{item.room}</p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectTopic !== "" &&
            (() => {
              const room = categories.find(
                (item) => item.topicTH === selectTopic
              )?.room;

              return (
                <>
                  <div className="flex flex-col justify-end items-end gap-1">
                    <Textarea
                      maxLength={70}
                      placeholder={`ข้อความเพิ่มเติมถึง ${room} (Message to ${room})`}
                    />
                  </div>

                  <div className="flex flex-col  items-center justify-center w-full px-6">
                    <p className="text-b2 text-primary font-medium">{room}</p>
                    <div className="flex items-center gap-2">
                      <Icon IconComponent={IconUsers} className="!size-5" />
                      <div className="text-start text-b2 iphone:max-sm:text-b3">
                        <p className="font-medium">
                          มีคิวก่อนหน้าคุณ{" "}
                          <span className="font-semibold">(Waiting) </span>
                          <span className="text-h2 iphone:max-sm:text-b1 font-semibold text-default">
                            {room === "งานบริการนักศึกษา" ? "11 คิว" : "8 คิว"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}

          <div className="justify-center flex gap-10 mt-10">
            <Button variant="secondary" onClick={() => router.back()}>
              Back
            </Button>
            <Button type="submit" disabled={loading} variant="default">
              {loading ? <Loading /> : "Take a number"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
