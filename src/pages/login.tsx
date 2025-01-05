import { Button } from "@/components/ui/button";
import Router from "next/router";
import { Route } from "@/config/Route";
import { useAppDispatch, useAppSelector } from "@/store";
import { useNotification } from "@/notifications/useNotification";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Loading from "@/components/Loading";
import { validateEngThai } from "@/helpers/validation";
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
import { toast } from "@/hooks/use-toast";
import { setLoadingOverlay } from "@/store/loading";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/Icon";
import { setQueue } from "@/store/user";
import { subscribeNotification } from "@/services/subscription/subscription.service";
import { setSubscription } from "@/store/subscription";
import { ROLE } from "@/config/Enum";
import { useEffect } from "react";
import { QueueRequestDTO } from "@/services/queue/dto/queue.dto";
import { createQueue } from "@/services/queue/queue.service";

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .regex(validateEngThai(), "Invalid first name"),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .regex(validateEngThai(), "Invalid last name"),
  topic: z.number().min(1, { message: "Please select a valid topic" }),
  note: z.string().max(70, "Note cannot exceed 70 characters").optional(),
});

export default function Login() {
  const { deviceType, isPhone, pushSubscription } = useNotification();
  const loading = useAppSelector((state) => state.loading.loadingOverlay);
  const user = useAppSelector((state) => state.user.user);
  const counters = useAppSelector((state) =>
    state.counter.filter(({ status }) => status == true)
  );
  const topics = counters.flatMap(({ topics }) => topics);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: new QueueRequestDTO(),
  });
  const selectedTopic = form.watch("topic");

  useEffect(() => {
    if (user.firstNameTH) {
      form.setValue("firstName", user.firstNameTH);
      form.setValue("lastName", user.lastNameTH);
    }
  }, [user]);

  const onBlurHandler = async (fieldName: keyof QueueRequestDTO) => {
    await form.trigger(fieldName);
  };

  const onClickLogin = async (data: QueueRequestDTO) => {
    if (pushSubscription) {
      dispatch(setLoadingOverlay(true));
      const res = await createQueue(data);
      if (res) {
        localStorage.setItem("token", res.token);
        toast({
          title: "Reserve Successfully",
          variant: "success",
          duration: 3000,
        });
        dispatch(
          setUser({
            role: ROLE.STUDENT,
            firstNameTH: res.queue.firstName,
            lastNameTH: res.queue.lastName,
          })
        );
        dispatch(setQueue({ ...res.queue, waiting: res.waiting }));
        const resSub = await subscribeNotification(pushSubscription);
        if (resSub) {
          dispatch(setSubscription(res));
        }
        Router.push(Route.StudentQueue);
      }
      dispatch(setLoadingOverlay(false));
    }
  };

  return (
    <motion.div
      className="flex bg-[#fafafa] flex-col h-screen w-full overflow-y-auto justify-start items-center"
      initial={isPhone ? { x: "100%" } : false}
      animate={isPhone ? { x: 0 } : false}
      exit={isPhone ? { x: "-100%" } : undefined}
      transition={
        isPhone ? { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } : undefined
      }
    >
      <div className="h-full justify-center gap-16 flex flex-col">
        <div className="flex flex-col h-fit items-center  justify-center text-center text-[24px] font-medium iphone:max-sm:w-[85vw] iphone:max-sm:text-[24px] sm:max-macair133:text-[26px] macair133:text-[32px]">
          <p className=" font-semibold  text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#ec407a] via-[#a06ee1] to-[#fb8c00] bg-clip-text text-transparent ">
            What can we help you with today?
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onClickLogin)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">
                    ชื่อ (Firstname) <p className="text-red-600">*</p>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full font-normal iphone:max-sm:rounded-xl iphone:max-sm:text-[13px] bg-[#f0f0f0] border-none iphone:max-sm:h-9"
                      placeholder="e.g. สมหมาย"
                      onBlur={() => onBlurHandler("firstName")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">
                    นามสกุล (Lastname) <p className="text-red-600">*</p>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full font-normal iphone:max-sm:rounded-xl iphone:max-sm:text-[13px] bg-[#f0f0f0] border-none iphone:max-sm:h-9"
                      placeholder="e.g. เรียนดี"
                      onBlur={() => onBlurHandler("lastName")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">
                    หัวข้อ (Topic) <p className="text-red-600">*</p>
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value ? field.value.toString() : undefined}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`iphone:max-sm:w-[85vw] shadow-none !h-9 iphone:max-sm:!h-fit iphone:max-sm:py-1 bg-[#f0f0f0] border-none  iphone:max-sm:text-sm sm:max-macair133:w-[50vw] macair133:w-[40vw] px-4 ${
                          form.getValues().topic === 0
                            ? "py-3 text-default "
                            : "py-2"
                        }`}
                        onBlur={() => onBlurHandler("topic")}
                      >
                        <SelectValue placeholder="Select topic" className="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {topics.map((item) => (
                          <SelectItem value={item.id.toString()} key={item.id}>
                            <div className="flex items-center gap-4 py-1">
                              {/* <div
                                className={` h-3 w-3 rounded-[100%] iphone:max-sm:hidden`}
                              ></div> */}
                              <div className="flex flex-col text-start text-b2 iphone:max-sm:text-b4 ">
                                <p>
                                  {item.topicTH} (
                                  <span className="font-medium">
                                    {item.topicEN}
                                  </span>
                                  )
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {!!selectedTopic && (
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col justify-end items-end gap-1">
                      <FormControl>
                        <Textarea
                          {...field}
                          maxLength={70}
                          placeholder={`ข้อความเพิ่มเติม (Message)`}
                        />
                      </FormControl>
                    </div>
                    <div className="flex flex-col  items-center justify-center w-full px-6">
                      <div className="flex items-center mt-2 gap-2">
                        <Icon IconComponent={IconUsers} className="!size-5" />
                        <div className="text-start text-default text-b2 iphone:max-sm:text-b3">
                          <p className="font-medium">
                            <span className="font-semibold"> Waiting </span>
                            <span className="text-b2 iphone:max-sm:text-b3 font-medium text-primary">
                              {topics.find(({ id }) => id == selectedTopic)
                                ?.waiting || 0}{" "}
                              Queues
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            )}
            <div className="flex flex-col justify-center gap-5 mt-10">
              <Button
                type="submit"
                className={`mt-5 ${
                  isPhone
                    ? `w-[100%] rounded-full bg-primary hover:bg-[#3560b0] ${
                        selectedTopic ? "-mt-5" : "mt-5"
                      } h-[58px] text-[13px] font-[500] text-white`
                    : "py-6 px-12 text-[15px] bg-primary hover:bg-[#3560b0] font-semibold"
                }`}
                disabled={loading}
                variant="default"
              >
                {loading ? (
                  <Loading />
                ) : (
                  <div className="text-center">
                    <p>รับบัตรคิว</p>
                    <p>Take a Number</p>
                  </div>
                )}
              </Button>
              {!isPhone && (
                <Button
                  className="text-default"
                  variant="link"
                  onClick={() => {
                    dispatch(setUser({}));
                    Router.push(Route.Index);
                  }}
                >
                  Back
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}
