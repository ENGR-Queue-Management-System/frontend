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
import iconEx from "../../public/icons/exclaimation.svg";
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
    <div
      className={` flex flex-row ${
        [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!) 
          ? "flex-col "
          : ""
      } h-full w-full`}
    >
      <div
        className={`  ${
          [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!) 
            ? " w-full  !justify-center  !items-center !text-center"
            : "gradient-bg rounded-tr-xl !w-[40%] rounded-br-xl items-center inset-0 px-10 flex h-screen"
        }    `}
      >
        <div
          className={`
    ${
      [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!) 
        ? "text-[#3d3d3d] flex flex-col !justify-center !items-center !text-center"
        : "text-start text-white pl-12 justify-start items-start flex flex-col "
    }`}
        >
          <Image
            src={
              [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
           
                ? logoEngColor
                : logoEng
            }
            alt="logoEng"
            className={`samsungA24:w-[10vw] ${
              [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!) 
                ? "mt-8 "
                : "-ml-3"
            } acerSwift:max-macair133:w-[12vw] cursor-not-allowed mb-3 mt-5 macair133:max-samsungA24:w-[15vw] iphone:max-sm:w-[40vw] sm:max-macair133:w-[20vw]`}
          />
          <div>
            <p className=" mt-3 sm:max-samsungA24:text-[28px] acerSwift:max-macair133:text-h1 font-[400] iphone:max-sm:text-[24px] text-[34px]">
              ระบบบัตรคิวอัตโนมัติ
            </p>
            <p className="  sm:max-samsungA24:text-[20px] acerSwift:max-macair133:text-b1 font-[500] iphone:max-sm:text-[18px] text-[28px]">
              Automatic Queuing System
            </p>
          </div>
          <div>
            <p className=" mt-4 sm:max-samsungA24:text-[16px] acerSwift:max-macair133:text-[16px] font-[500] iphone:max-sm:text-[12px] text-[16px]">
              Student Development Room <br />
              Faculty of Engineering, Chiang Mai University
            </p>
          </div>
        </div>
      </div>
      <div className={` ${
          [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!) 
            ? " w-full  !"
            : "w-[60%]"
        } flex flex-col bg-white justify-center text-center items-center`}>
        {" "}
        <div className={`flex gap-3  items-center justify-center w-[65%] ${
          [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!) 
            ? " w-[90%] mt-5"
            : "w-[65%]"
        } acerSwift:max-macair133:w-[40vw] p-4 acerSwift:max-macair133:p-3 rounded-md bg-[#FFC107]/40`}>
          <Icon IconComponent={iconEx} className="text-[#856404]" />
          <p className="iphone:max-sm:text-[12px] text-[14px] acerSwift:max-macair133:text-b3 text-[#856404] font-bold text-start w-full ">
            The system is currently in testing. <br />
            <p className="font-medium mt-[2px]">
              If you experience any issues, please remove the app from your home
              screen and add it again.
            </p>
          </p>
        </div>
        <a href={process.env.NEXT_PUBLIC_CMU_OAUTH_URL}>
          <Button
            style={{
              boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.45)",
            }}
            variant="default"
            className={`text-sm   acerSwift:max-macair133:text-b4  acerSwift:max-macair133:!py-5 acerSwift:max-macair133:px-6 font-semibold py-[22px] iphone:max-sm:rounded-full iphone:max-sm:py-[26px] iphone:max-sm:px-14 mt-10 iphone:max-sm:mt-5 w-fit px-10 rounded-[8px] ${
              [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!) ||
              true
                ? "text-[#ffffff] bg-[#5868d5] hover:bg-[#5868d5]"
                : "text-[#ffffff] bg-[#5868d5] hover:bg-[#5868d5]"
            }
             `}
          >
            <Image
              src={
                [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!) ||
                true
                  ? cmuLogoColor
                  : cmuLogoColor
              }
              alt="cmulogo"
              className="w-[42px] mr-2 acerSwift:max-macair133:w-[35px]"
            />
            Sign in CMU account
          </Button>
        </a>
        <div className="flex flex-col mt-8">
          <p className="sm:max-samsungA24:text-[15px]  iphone:max-sm:text-[14px] font-[500]  acerSwift:max-macair133:text-b3">
            <span className="font-[500] text-default"> ท่านไม่มี</span> CMU
            account?{" "}
            <span
              className={`underline font-[500] cursor-pointer ${
                [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!) ||
                true
                  ? "text-[#5868d5] hover:text-[#303d91]"
                  : "text-[#5868d5] hover:text-[#303d91]"
              } `}
              onClick={() => Router.push(Route.Login)}
            >
              คลิกที่นี่
            </span>
          </p>
          <Button
            variant="link"
            className={`text-sm font-[600]   acerSwift:max-macair133:text-b4 underline  ${
              [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!) ||
              true
                ? "text-[#856404] hover:text-[#856404] mt-4"
                : "text-[#856404] hover:text-[#856404] mt-10 "
            }
            `}
          >
            <Icon IconComponent={iconFlag} />
            Issue Report
          </Button>
        </div>
        <Link href="/admin-dashboard">
          <Button
            variant="link"
            className={`text-sm font-[500] mt-5 underline text-[#000000]`}
          >
            Admin
          </Button>
        </Link>
        <div className="flex gap-2">
          <Select onValueChange={(value) => setSelectTest(value)}>
            <SelectTrigger className="!w-[30vw] py-2">
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
          <Button onClick={sendPushNotification}>Test</Button>
        </div>
      </div>
    </div>
  );
}
