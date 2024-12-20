import Navbar from "@/components/Navbar";
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
import { subscribeNotification } from "@/services/subscription/subscription.service";
import { setSubscription } from "@/store/subscription";
import { useNotification } from "@/notifications/useNotification";
import { urlBase64ToUint8Array } from "@/lib/utils";
import Router from "next/router";
import { Route } from "@/config/Route";
import { DEVICE_TYPE } from "@/config/Enum";

export default function StudentIndex() {
  const { deviceType, isGranted, onSubscribe, onError } = useNotification();
  const topics = useAppSelector((state) => state.topic);
  const user = useAppSelector((state) => state.user);
  const subscription = useAppSelector((state) => state.subscription);
  const dispatch = useAppDispatch();
  const [selectTopic, setSelectTopic] = useState(0);

  useEffect(() => {
    if (deviceType == DEVICE_TYPE.DESKTOP || isGranted) {
      if (
        user.studentId &&
        subscription.firstName != user.firstNameTH &&
        subscription.lastName != user.lastNameTH
      ) {
        getSubscription();
      }
      if (user.email && !user.studentId) {
        Router.push(Route.AdminIndex);
      } else if (user.email && user.studentId) {
        Router.push(Route.StudentIndex);
      } else if (user.firstNameTH) {
        Router.push(`${Route.StudentQueue}`);
      }
    }
  }, [user]);

  const getSubscription = async () => {
    await navigator.serviceWorker.register("/service-worker.js");
    navigator.serviceWorker.ready
      .then((registration: ServiceWorkerRegistration) => {
        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
          ),
        });
      })
      .then(async (subscription) => {
        const res = await subscribeNotification(subscription);
        if (res) {
          dispatch(setSubscription(res));
        }
        onSubscribe();
      })
      .catch((e) => onError(e));
  };

  return (
    <div className="m-auto overflow-y-auto flex flex-col gap-7 acerSwift:max-macair133:gap-6 iphone:max-sm:gap-6 items-center justify-start">
      <div
        className={` flex flex-col items-center justify-center text-center text-[24px] acerSwift:max-macair133:!text-h1 text-semibold iphone:max-sm:w-[85vw] iphone:max-sm:text-[16px] sm:max-macair133:text-[20px] macair133:text-[24px]`}
      >
        <p>วันนี้เราสามารถช่วยอะไรนศ.ได้บ้าง แจ้งมาได้เลยนะคะ</p>
        <p className="text-bold iphone:max-sm:w-[250px]">
          What can we help you with today? Let us know to get started
        </p>
      </div>
      <Select onValueChange={(value) => setSelectTopic(parseInt(value))}>
        <SelectTrigger
          className={`iphone:max-sm:w-[85vw] iphone:max-sm:h-32 iphone:max-sm:text-sm sm:max-macair133:w-[50vw] macair133:w-[40vw] px-6 ${
            selectTopic === 0
              ? "py-3 text-primary iphone:max-sm:h-12"
              : "py-2 iphone:max-sm:h-18"
          }`}
        >
          <SelectValue placeholder="เลือกเรื่องที่ต้องการจะให้เราช่วยเหลือ" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {topics.map((item) => (
              <SelectItem value={item.id.toString()} key={item.id}>
                <div className="flex items-center gap-4 py-1 acerSwift:max-macair133:gap-4">
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
                    } h-3 w-3 acerSwift:max-macair133:h-2.5 acerSwift:max-macair133:w-2.5 rounded-[100%] iphone:max-sm:hidden`}
                  ></div>
                  <div className="flex flex-col text-start text-b2 acerSwift:max-macair133:text-b3">
                    <p>
                      {item.topicTH} (
                      <span className="font-medium ">{item.topicEN}</span>)
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
                      มีคิวก่อนหน้าคุณ{" "}
                      <span className="font-semibold">(Waiting) </span>
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
        className="flex flex-col items-centern gap-0 p-8 py-7 rounded-xl acerSwift:max-macair133:text-b3"
        disabled={selectTopic === 0}
      >
        <p>รับบัตรคิว</p>
        <p>Take a number</p>
      </Button>
    </div>
  );
}
