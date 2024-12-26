import React, { useEffect } from "react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import IconUsers from "../../../public/icons/users.svg";
import Icon from "@/components/Icon";
import { useAppDispatch, useAppSelector } from "@/store";
import { useNotification } from "@/notifications/useNotification";
import Router from "next/router";
import { Route } from "@/config/Route";
import { DEVICE_TYPE, ROLE } from "@/config/Enum";
import { subscribeNotification } from "@/services/subscription/subscription.service";
import { setSubscription } from "@/store/subscription";
import { setLoadingOverlay } from "@/store/loading";
import Loading from "@/components/Loading";
import { createQueue } from "@/services/queue/queue.service";
import { toast } from "@/hooks/use-toast";
import { setQueue } from "@/store/user";

export default function StudentIndex() {
  const { deviceType, isGranted, isPhone, pushSubscription } =
    useNotification();
  const loading = useAppSelector((state) => state.loading.loadingOverlay);
  const topics = useAppSelector((state) => state.topic);
  const user = useAppSelector((state) => state.user.user);
  const queue = useAppSelector((state) => state.user.queue);
  const subscription = useAppSelector((state) => state.subscription);
  const dispatch = useAppDispatch();
  const [selectTopic, setSelectTopic] = useState(0);
  const [note, setNote] = useState<string | undefined>();

  useEffect(() => {
    if (deviceType == DEVICE_TYPE.DESKTOP || isGranted) {
      if (
        user.studentId &&
        subscription.firstName != user.firstNameTH &&
        subscription.lastName != user.lastNameTH
      ) {
        getSubsrciption();
      }
      // if (user.role == ROLE.ADMIN) {
      //   Router.push(Route.AdminIndex);
      // } else if (user.studentId) {
      //   Router.push(Route.StudentIndex);
      // } else if (user.firstNameTH) {
      //   if (queue.no) {
      //     Router.push(Route.StudentQueue);
      //   } else {
      //     Router.push(Route.Login);
      //   }
      // }
    }
  }, [user, queue.no]);

  const getSubsrciption = async () => {
    const res = await subscribeNotification(pushSubscription!);
    if (res) {
      dispatch(setSubscription(res));
    }
  };

  const reverveQueue = async () => {
    if (pushSubscription) {
      dispatch(setLoadingOverlay(true));
      const res = await createQueue({ topic: selectTopic, note });
      if (res) {
        toast({
          title: "Reserve Queue successfully",
          variant: "success",
          duration: 3000,
        });
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
    <div className="m-auto  overflow-y-auto flex flex-col gap-7 acerSwift:max-macair133:gap-6 iphone:max-sm:gap-6 items-center justify-start">
      <div
        className={` flex flex-col  items-center justify-center text-center text-[24px] acerSwift:max-macair133:!text-h1 text-semibold iphone:max-sm:w-[85vw] iphone:max-sm:text-[16px] sm:max-macair133:text-[20px] macair133:text-[24px]`}
      >
        <p className=" font-semibold  text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#ec407a] via-[#a06ee1] to-[#fb8c00]">
          What can we help you with today?
        </p>
      </div>
      <Select onValueChange={(value) => setSelectTopic(parseInt(value))}>
        <SelectTrigger
          className={`iphone:max-sm:w-[85vw] shadow-none !h-9 bg-[#f0f0f0] border-none  iphone:max-sm:text-sm sm:max-macair133:w-[50vw] macair133:w-[40vw] px-4 ${
            selectTopic === 0 ? "py-3 text-default " : "py-2"
          }`}
        >
          <SelectValue placeholder="Select topic" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {topics.map((item) => (
              <SelectItem value={item.id.toString()} key={item.id}>
                <div className="flex items-center gap-4 py-1 acerSwift:max-macair133:gap-4">
                  <div className="flex flex-col text-start text-b2 acerSwift:max-macair133:text-b3">
                    <p>
                      {item.topicTH} (
                      <span className="font-medium">{item.topicEN}</span>)
                    </p>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {selectTopic !== 0 &&
        (() => {
          return (
            <>
              <div className="flex flex-col justify-end items-end gap-1 mx-1">
                <Textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  maxLength={70}
                  className="acerSwift:max-macair133:text-b4"
                  placeholder={`ข้อความเพิ่มเติม (Message)`}
                />
              </div>

              <div className="flex flex-col  items-center justify-center w-full px-6">
                <div className="flex items-center gap-2">
                  <Icon
                    IconComponent={IconUsers}
                    className="!size-5 iphone:max-macair133:!size-4"
                  />
                  <div className="text-start text-b2 iphone:max-macair133:text-b3 ">
                    <p className="font-medium">
                      มีคิวก่อนหน้าคุณ
                      <span className="font-semibold"> (Waiting) </span>
                      <span className="text-h2 iphone:max-sm:text-b1 iphone:max-macair133:text-b2 font-semibold text-default">
                        8 คิว
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })()}

      <Button
        className={`mt-5 ${
          isPhone
            ? " w-[100%] rounded-full bg-primary hover:bg-[#3560b0] mt-5 h-12 text-[15px] font-semibold"
            : "py-6 px-12 text-[15px] bg-primary hover:bg-[#3560b0] font-semibold"
        }`}
        disabled={!selectTopic}
        onClick={reverveQueue}
      >
        {loading ? <Loading /> : "Take a Number"}
      </Button>
    </div>
  );
}
