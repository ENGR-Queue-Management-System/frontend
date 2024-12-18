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
import { useRouter } from "next/navigation";
import { Route } from "@/config/Route";
import { DEVICE_TYPE } from "@/config/Enum";

export default function StudentIndex() {
  const { deviceType, isGranted, onSubscribe, onError } = useNotification();
  const user = useAppSelector((state) => state.user);
  const subscription = useAppSelector((state) => state.subscription);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selectTopic, setSelectTopic] = useState("");

  useEffect(() => {
    if (deviceType == DEVICE_TYPE.DESKTOP || isGranted) {
      if (user.studentId && subscription.studentId != user.studentId) {
        getSubscription();
      }
      if (user.email) {
        router.push(Route.AdminIndex);
      } else if (user.firstNameTH) {
        router.push(Route.StudentIndex);
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

  const categories = [
    {
      id: 1,
      topicTH: "ฝึกงาน-สหกิจศึกษา",
      topicEN: "Internship and Cooperative",
      room: "งานบริการนักศึกษา",
    },

    {
      id: 2,
      topicTH: "ทุนการศึกษา",
      topicEN: "Scholarships",
      room: "งานบริการนักศึกษา",
    },
    {
      id: 3,
      topicTH: "ขอคำปรึกษาด้านวิชาการ",
      topicEN: "Academic Consultation",
      room: "งานพัฒนาคุณภาพนักศึกษา",
    },
    {
      id: 4,
      topicTH: "แจ้งปัญหาด้านการเรียนการสอน",
      topicEN: "Report Issues with Teaching and Learning",
      room: "งานบริการนักศึกษา",
    },
    {
      id: 5,
      topicTH: "ขอจัดกิจกรรมหรือโครงการพิเศษ",
      topicEN: "Request for Special Activities or Projects",
      room: "งานพัฒนาคุณภาพนักศึกษา",
    },
    {
      id: 6,
      topicTH: "อื่นๆ",
      topicEN: "Others",
      room: "งานพัฒนาคุณภาพนักศึกษา",
    },
  ];

  return (
    <div className="m-auto overflow-y-auto flex flex-col gap-7 iphone:max-sm:gap-6 items-center justify-start">
      <div
        className={` flex flex-col items-center justify-center text-center text-[24px] text-semibold iphone:max-sm:w-[85vw] iphone:max-sm:text-[16px] sm:max-macair133:text-[20px] macair133:text-[24px]`}
      >
        <p>วันนี้เราสามารถช่วยอะไรนศ.ได้บ้าง แจ้งมาได้เลยนะคะ</p>
        <p className="text-bold iphone:max-sm:w-[250px]">
          What can we help you with today? Let us know to get started
        </p>
      </div>
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
                  placeholder={`ข้อความเพิ่มเติมถึง${room} (Message to ${
                    room === "งานบริการนักศึกษา"
                      ? "Engineering Student Services Unit"
                      : "Engineering Student Development Unit"
                  })`}
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

      <Button
        className="flex flex-col items-centern gap-0 p-8 py-7 rounded-xl"
        disabled={selectTopic === ""}
      >
        <p>รับบัตรคิว</p>
        <p>Take a number</p>
      </Button>
    </div>
  );
}
