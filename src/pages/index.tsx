import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Route } from "@/config/Route";
import logoEngColor from "../../public/images/logoSDColor.png";
import logoSDMinimal from "../../public/images/logoSDMiColor.png";
import cmuLogoColor from "../../public/images/cmuLogoLoginWhite.png";
import { useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNotification } from "@/notifications/useNotification";
import { DEVICE_TYPE, ROLE } from "@/config/Enum";
import Icon from "@/components/Icon";
import iconLogin from "../../public/icons/confetti.svg";
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
import { getUserName } from "@/helpers/function";
import Router, { useRouter } from "next/router";


type PopupProps = {
  showLink?: boolean;
};
export default function Home({showLink}: PopupProps) {
  const { deviceType, isPhone } = useNotification();
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const queue = useAppSelector((state) => state.user.queue);
  const [testSendNotiList, setTestSendNotiList] = useState<any[]>([]);
  const [selectTest, setSelectTest] = useState("");
  const [prevPath, setPrevPath] = useState("");

  useEffect(() => setPrevPath(router.asPath), [router.asPath]);

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
    if (user.role) {
      if (user.role == ROLE.ADMIN) {
        Router.push(Route.AdminIndex);
      } else if (queue) {
        Router.push(Route.StudentQueue);
      } else {
        Router.push(Route.StudentIndex);
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

  
  useEffect(() => { console.log(showLink) }, [showLink]); 
  

  return (
    <motion.div
      initial={
        isPhone ? { x: prevPath == Route.Login ? "-100%" : "100%" } : false
      }
      animate={isPhone ? { x: 0 } : false}
      exit={isPhone ? { x: "-100%" } : undefined}
      transition={
        isPhone ? { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] } : undefined
      }
      className={`flex flex-row ${isPhone ? "flex-col" : ""} h-full w-full`}
    >
      <div
        className={`${
          isPhone
            ? "hidden"
            : "gradient-try-big  !w-[55%] pl-[4vw]  items-center  flex h-screen"
        }`}
      >
        <div
          className={`${
            isPhone
              ? "text-[#3d3d3d] flex flex-col mt-12 !justify-center !items-center !text-center"
              : "text-start text-default gap-3 justify-start items-start flex flex-col "
          }`}
        >
          <Image
            src={isPhone ? logoEngColor : logoEngColor}
            alt="logoEng"
            className={`samsungA24:w-[10vw] ${
              isPhone ? " mt-[50px] " : "-ml-1 mb-3"
            } acerSwift:max-macair133:w-[12vw] cursor-not-allowed  macair133:max-samsungA24:w-[14vw] iphone:max-sm:w-[40vw] sm:max-macair133:w-[20vw]`}
          />
          <div>
            <p className=" mt-3 sm:max-samsungA24:text-[28px] acerSwift:max-macair133:text-h1 font-[400] iphone:max-sm:text-[24px] text-[34px]">
              ระบบบัตรคิวอัตโนมัติ
            </p>
            <p className=" -mt-[2px]  sm:max-samsungA24:text-[20px] acerSwift:max-macair133:text-b1 font-[500] iphone:max-sm:text-[18px] text-[28px]">
              Automatic Queuing System
            </p>
          </div>
          <div>
            <p className=" mt-6 leading-6 sm:max-samsungA24:text-[16px] acerSwift:max-macair133:text-[16px] font-[500] iphone:max-sm:text-[12px] text-[16px]">
              Student Development Room <br />
              Faculty of Engineering, Chiang Mai University
            </p>
          </div>
        </div>
      </div>
      <div
        className={`${
          isPhone
            ? "!w-full !h-screen  !justify-end !items-start pb-12 !text-start gradient-try"
            : "w-[45%] flex flex-col  justify-center text-start items-center "
        }`}
      >
        <div
          className={`flex flex-col ${
            isPhone
              ? "w-[100%]  h-full px-8 justify-end items-start text-start"
              : "w-[80%] justify-center  text-start"
          } `}
        >
          <Image
            src={isPhone ? logoSDMinimal : ""}
            alt="logoEng"
            className={` ${
              isPhone ? " mt-[40px] fixed top-4 left-6   w-[12vw] " : "hidden"
            } `}
          />
          <div className={` ${isPhone ? "" : "flex  w-full items-center"}`}>
            <Icon
              IconComponent={iconLogin}
              className={`text-default size-16 stroke-[1.2px] mb-3 ${
                isPhone ? "-ml-2" : " "
              }`}
            />
          </div>
          <p
            className={`${
              isPhone
                ? "text-default text-start font-semibold text-[3vh]  "
                : "text-default font-semibold text-[1.8vw]"
            } `}
          >
            Welcome!
          </p>
          <p
            className={`${
              isPhone || true
                ? "text-[#969696] text-start font-medium text-[2.2vh] "
                : "hidden"
            } `}
          >
            Sign in to Queuing System
          </p>

          <p
            className={`my-8 acerSwift:max-macair133:my-4 ${
              isPhone ? "text-b3" : "text-b1"
            } text-default font-medium acerSwift:max-macair133:text-b2`}
          >
            Let's take a number and wait comfortably without needing to be at
            the front. Get notified when it's your turn, ensuring a smooth and
            stress-free experience.
          </p>
          <div
            className={`flex gap-3  items-center justify-center  ${
              isPhone
                ? " w-[100%] mt-2"
                : "w-[100%] -mt-2"
            } p-4 acerSwift:max-macair133:p-3 rounded-md bg-[#FFC107]/20`}
          >
            <Icon IconComponent={iconEx} className="text-[#856404]" />
            <p className="iphone:max-sm:text-b3 text-[14px] acerSwift:max-macair133:text-b3 text-[#856404] font-bold text-start w-full">
              The system is currently in testing. <br />
              <span className="font-medium mt-[2px]">
                If you experience any issues, please remove the app from your
                home screen and add it again.
              </span>
            </p>
          </div>
          <div
            className={`${
              isPhone
                ? " w-[100%] mt-2"
                : "flex flex-col !text-center !items-center !justify-center w-[100%] mt-6"
            }`}
          >
            <Button
              onClick={() =>
                Router.push(process.env.NEXT_PUBLIC_CMU_ENTRAID_URL!)
              }
              style={{
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.45)",
              }}
              variant="default"
              className={`mt-3 ${
                isPhone
                  ? " w-[100%]  bg-[#5868d5] text-white hover:bg-[#4958b8] mt-5 h-12 text-[15px] font-semibold rounded-full"
                  : "acerSwift:max-macair133:py-5 bg-[#5868d5] min-w-fit w-[50%] hover:bg-[#4958b8] text-white py-6 px-6 rounded-lg text-[15px] font-semibold"
              }`}
            >
              <Image
                src={isPhone ? cmuLogoColor : cmuLogoColor}
                alt="cmulogo"
                className="w-[42px] mr-2 acerSwift:max-macair133:w-[35px] "
              />
              Sign in CMU account
            </Button>
            <div className="flex flex-col !text-center !items-center !justify-center w-[100%] mt-6">
              {/* {showLink &&  */}
              <p className="sm:max-samsungA24:text-[15px]  text-[15px] iphone:max-sm:text-[14px] font-[500]  acerSwift:max-macair133:text-b3">
                <span className="font-[500] text-default"> Don't have</span> CMU
                account?{" "}
                <span
                  className={`underline font-[500] cursor-pointer ${
                    isPhone
                      ? "text-[#4e87d6] hover:text-[#3d6eb2]"
                      : "text-[#4e87d6] hover:text-[#3d6eb2]"
                  } `}
                  onClick={() => Router.push(Route.Login)}
                >
                  Click here
                </span>
              </p>
              {/* } */}
              {/* <Button
                variant="link"
                className={`text-sm font-[600]   acerSwift:max-macair133:text-b4 underline  ${
                  isPhone
                    ? "text-[#856404] hover:text-[#856404] mt-4"
                    : "text-[#856404] hover:text-[#856404] mt-10 "
                }
            `}
              >
                <Icon IconComponent={iconFlag} />
                Issue Report
              </Button> */}
            </div>
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
                        {getUserName(item)}
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
    </motion.div>
  );
}
