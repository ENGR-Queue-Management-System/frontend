import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { Route } from "@/config/Route";
import logoEng from "../../public/images/logoSDShadow.png";
import logoEngColor from "../../public/images/logoSDColor.png";
import cmuLogoWhite from "../../public/images/cmuLogoLogin.png";
import cmuLogoColor from "../../public/images/cmuLogoLoginWhite.png";
import { useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { useNotification } from "@/notifications/useNotification";
import { DEVICE_TYPE } from "@/config/Enum";
import Icon from "@/components/Icon";
import iconFlag from "../../public/icons/flag.svg";
import webpush, { PushSubscription } from "web-push";
import {
  sendQueueNotification,
  testSendNoti,
} from "@/services/subscription/subscription.service";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export default function Home() {
  const { deviceType } = useNotification();
  const user = useAppSelector((state) => state.user);
  const [testSendNotiList, setTestSendNotiList] = useState<any[]>([]);
  const [selectTest, setSelectTest] = useState("");

  useEffect(() => {
    if (!testSendNotiList.length) {
      const test = async () => {
        const res = await testSendNoti();
        if (res) {
          setTestSendNotiList(res);
        }
      };
      test();
    }
  }, []);

  useEffect(() => {
    if (user.email) {
      if (user.studentId) {
        Router.push(Route.StudentIndex);
      } else {
        Router.push(Route.AdminIndex);
      }
    }
  }, [user]);

  const sendPushNotification = async () => {
    const payload = {
      ...testSendNotiList[parseInt(selectTest)],
      message: JSON.stringify({
        title: "Test Notification",
        body: "this is test notification.",
      }),
    };
    const res = await sendQueueNotification(payload);
    if (res) {
      toast({
        title: res.status,
        variant: "success",
        duration: 3000,
      });
    }
  };

  return (
    <div className=" flex items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main
        className={`flex  h-screen w-screen justify-center items-center bg-cover bg-center ${
          [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
            ? "bg-white"
            : "gradient-bg"
        }`}
      >
        <div className="flex h-screen w-screen justify-center items-center inset-0 px-10  ">
          <div
            className={`text-center justify-start items-center flex flex-col 
    iphone:max-sm:bg-transparent iphone:max-sm:shadow-none 
    sm:max-samsungA24:px-24 sm:max-samsungA24:py-12 
    samsungA24:px-28 samsungA24:py-16   acerSwift:max-macair133:py-4
    gap-5  acerSwift:max-macair133:gap-4 rounded-[25px] 
    bg-[rgba(85,85,86,0.25)] shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] 
    ${
      [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
        ? "text-[#3d3d3d]"
        : "text-white"
    }`}
          >
            <Image
              src={
                [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                  ? logoEngColor
                  : logoEng
              }
              alt="logoEng"
              className="samsungA24:w-[10vw] acerSwift:max-macair133:w-[12vw] cursor-not-allowed mb-3 mt-5 macair133:max-samsungA24:w-[15vw] iphone:max-sm:w-[45vw] sm:max-macair133:w-[20vw]"
            />
            <div>
              <p className=" sm:max-samsungA24:text-[28px] acerSwift:max-macair133:text-h1 font-[400] iphone:max-sm:text-[24px] text-[34px]">
                ระบบบัตรคิวอัตโนมัติ
              </p>
              <p className=" sm:max-samsungA24:text-[20px] acerSwift:max-macair133:text-b1 font-[500] iphone:max-sm:text-[18px] text-[28px]">
                Automatic Queuing System
              </p>
            </div>
            <div
              className={`  ${
                [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                  ? " bg-[#F99B25] font-[500] "
                  : "text-white  font-[400]"
              }  w-full text-white mt-2 py-3 px-5 iphone:max-sm:text-[13px] sm:max-samsungA24:text-[15px] acerSwift:max-macair133:text-b4 rounded-md`}
            >
              <p>
                เนื่องจากระบบอยู่ในช่วงทดลองใช้งาน <br />{" "}
                หากท่านพบปัญหาในการใช้งาน <br /> ให้ท่านปัดแอปพลิเคชันทิ้ง
                แล้วลองเข้าใหม่อีกครั้ง
              </p>
            </div>
            <a href={process.env.NEXT_PUBLIC_CMU_OAUTH_URL}>
              <Button
                style={{
                  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.45)",
                }}
                variant="default"
                className={`text-sm  acerSwift:max-macair133:text-b4  acerSwift:max-macair133:!py-5 acerSwift:max-macair133:px-6 font-semibold py-[22px] iphone:max-sm:rounded-full iphone:max-sm:py-[26px] iphone:max-sm:px-14 mt-4 iphone:max-sm:mt-5 w-fit px-10 rounded-[8px] ${
                  [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                    ? "text-[#ffffff] bg-[#605CA4] hover:bg-[#4d498a]"
                    : "text-[#605CA4] bg-white hover:bg-[#eaeaea]"
                }
             `}
              >
                <Image
                  src={
                    [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                      ? cmuLogoColor
                      : cmuLogoWhite
                  }
                  alt="cmulogo"
                  className="w-[42px] mr-2 acerSwift:max-macair133:w-[35px]"
                />
                Sign in CMU account
              </Button>
            </a>
            <div className="flex flex-col mt-2">
              <p className="sm:max-samsungA24:text-[15px] iphone:max-sm:text-[14px] font-[500]  acerSwift:max-macair133:text-b3">
                <span className="font-[500]"> ท่านไม่มี</span> CMU account?{" "}
                <span
                  className={`underline font-[500] cursor-pointer ${
                    [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                      ? "text-[#5868d5]"
                      : "text-white hover:text-[#eaeaea]"
                  } `}
                  onClick={() => Router.push(Route.Login)}
                >
                  คลิกที่นี่
                </span>
              </p>
            </div>
            <Button
              variant="link"
              className={`text-sm font-[500]   acerSwift:max-macair133:text-b4 underline  ${
                [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                  ? "text-[#e18f2b] hover:text-[#cb8a3a]"
                  : "text-[#ffffff] hover:text-[#eaeaea]"
              }
            `}
            >
              <Icon IconComponent={iconFlag} />
              รายงานปัญหา
            </Button>
            <Link href="/admin-dashboard">
              <Button
                variant="link"
                className={`text-sm font-[500] underline text-[#000000]`}
              >
                Admin
              </Button>
            </Link>
            <div className="flex gap-2">
              <Select onValueChange={(value) => setSelectTest(value)}>
                <SelectTrigger className="!w-[50vw] py-2">
                  <SelectValue placeholder="Select Test Notification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {testSendNotiList.map((item, index) => (
                      <SelectItem value={index.toString()} key={index}>
                        <div className="flex items-center py-1">
                          {item.firstName} {item.lastName}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button onClick={sendPushNotification}>Test Notification</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
