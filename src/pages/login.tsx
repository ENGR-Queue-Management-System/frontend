import { Button } from "@/components/ui/button";
import Router from "next/router";
import { Route } from "@/config/Route";
import { useAppDispatch, useAppSelector } from "@/store";
import { useNotification } from "@/notifications/useNotification";
import { useForm } from "react-hook-form";
import { reserveNotLogin } from "@/services/authentication/authentication.service";
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
import { ReserveRequestDTO } from "@/services/authentication/dto/authentication.dto";
import { toast } from "@/hooks/use-toast";
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
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/Icon";
import { useEffect } from "react";
import { getTopics } from "@/services/topic/topic.service";
import { setTopics } from "@/store/topic";
import { setQueue } from "@/store/user";
import { subscribeNotification } from "@/services/subscription/subscription.service";
import { setSubscription } from "@/store/subscription";
import Navbar from "@/components/Navbar";

export default function Login() {
  const { deviceType, isPhone, pushSubscription } = useNotification();
  const loading = useAppSelector((state) => state.loading.loadingOverlay);
  const counters = useAppSelector((state) =>
    state.counter.filter(({ status }) => status == true)
  );
  const topicIds = counters.flatMap(({ topic }) => topic.map((t) => t.id));
  const topics = useAppSelector((state) =>
    state.topic.filter(({ id }) => topicIds.includes(id))
  );
  const dispatch = useAppDispatch();
  const form = useForm({
    defaultValues: new ReserveRequestDTO(),
  });

  useEffect(() => {
    const fetchTopics = async () => {
      const res = await getTopics();
      if (res) {
        dispatch(setTopics(res));
      }
    };

    if (!topics.length) {
      fetchTopics();
    }
  }, []);

  const onBlurHandler = async (fieldName: any) => {
    await form.trigger(fieldName);
  };

  const onClickLogin = async (data: ReserveRequestDTO) => {
    if (pushSubscription) {
      dispatch(setLoadingOverlay(true));
      const res = await reserveNotLogin({
        ...data,
        topic: parseInt(data.topic as any),
      });
      if (res) {
        localStorage.setItem("token", res.token);
        toast({
          title: "Reserve Successfully",
          variant: "success",
          duration: 3000,
        });
        dispatch(
          setUser({
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
      className="flex bg-[#fafafa] flex-col h-screen  w-full overflow-y-auto  justify-start items-center"
      initial={isPhone ? { x: "100%" }: false} 
      animate={isPhone ?{ x: 0 }: false} 
      exit={isPhone ? { x: "-100%" } : undefined}
      transition={ isPhone ? { duration: 0.25, ease: "easeInOut" }: undefined} 
    >
      <div className="h-full justify-center gap-16 flex flex-col">
      <div className="flex flex-col h-fit items-center  justify-center text-center text-[24px] font-medium iphone:max-sm:w-[85vw] iphone:max-sm:text-[24px] sm:max-macair133:text-[26px] macair133:text-[32px]">
        <p className=" font-semibold  text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#ec407a] via-[#a06ee1] to-[#fb8c00] bg-clip-text text-transparent">
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
            {...form.register("firstName", {
              required: "first name is required",
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
                    className="w-full font-normal iphone:max-sm:rounded-xl iphone:max-sm:text-[13px] bg-[#f0f0f0] border-none iphone:max-sm:h-9"
                    placeholder="e.g. สมหมาย"
                    {...field}
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
              required: "last name is required",
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
                    className="w-full font-normal iphone:max-sm:rounded-xl iphone:max-sm:text-[13px] bg-[#f0f0f0] border-none iphone:max-sm:h-9"
                    placeholder="e.g. เรียนดี"
                    {...field}
                    onBlur={() => onBlurHandler("lastName")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            {...form.register("topic", {
              required: true,
              validate: (value) => Number(value) > 0 || "invalid topic",
            })}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">
                  หัวข้อ (Topic) <p className="text-red-600">*</p>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ? field.value.toString() : undefined}
                >
                  <FormControl>
                    <SelectTrigger
                      className={`iphone:max-sm:w-[85vw] shadow-none !h-9 bg-[#f0f0f0] border-none  iphone:max-sm:text-sm sm:max-macair133:w-[50vw] macair133:w-[40vw] px-4 ${
                        form.getValues().topic === 0
                          ? "py-3 text-default "
                          : "py-2"
                      }`}
                      onBlur={() => onBlurHandler("topic")}
                    >
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {topics.map((item) => (
                        <SelectItem value={item.id.toString()} key={item.id}>
                          <div className="flex items-center gap-4 py-1">
                            <div
                              className={` h-3 w-3 rounded-[100%] iphone:max-sm:hidden`}
                            ></div>
                            <div className="flex flex-col text-start text-b2">
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
          {form.watch().topic !== 0 && (
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
                            11 Queues
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
                  ? " w-[100%] rounded-full bg-primary hover:bg-[#3560b0] mt-5 h-12 text-[15px] font-semibold"
                  : "py-6 px-12 text-[15px] bg-primary hover:bg-[#3560b0] font-semibold"
              }`}
              disabled={loading}
              variant="default"
            >
              {loading ? <Loading /> : "Take a Number"}
            </Button>
            {!isPhone && (
              <Button
                className="text-default"
                variant="link"
                onClick={() => Router.back()}
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
