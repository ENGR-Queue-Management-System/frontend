import { DEVICE_TYPE } from "@/config/Enum";
import { useNotification } from "@/notifications/useNotification";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logoSDMinimal from "../../public/images/logoSDMiColor.png";
import logoEngColor from "../../public/images/logoSDColor.png";
import iconEx from "../../public/icons/exclaimation.svg";
import iconBell from "../../public/icons/bell.svg";
import Icon from "./Icon";

export default function SubscribeNotification() {
  const { deviceType, isPhone, handleSubscribe } = useNotification();
  return (
    <div
      className={` ${
        isPhone
          ? "flex-col flex !h-full w-full"
          : "flex h-screen  w-screen justify-center text-center items-center overflow-hidden"
      }  `}
    >
      <div
        className={`${
          isPhone
            ? "hidden"
            : "gradient-try-big text-[1.8vw] font-medium text-default flex flex-col h-screen w-[55%] text-start justify-center  pl-[4vw]"
        }`}
      >
        <Image
          src={isPhone ? logoEngColor : logoEngColor}
          alt="logoEng"
          className={`samsungA24:w-[10vw] ${
            isPhone ? " mt-[50px] mb-4 " : "-ml-1 mt-5 mb-3"
          } acerSwift:max-macair133:w-[12vw] cursor-not-allowed macair133:max-samsungA24:w-[11vw] iphone:max-sm:hidden sm:max-macair133:w-[20vw]`}
        />
        <p className="mt-3">Welcome to </p>
        <p className=" -mt-[2px]">Automatic Queuing System</p>
        <div>
          <p className=" mt-6 leading-6  sm:max-samsungA24:text-[14px] acerSwift:max-macair133:text-[16px] font-[500] iphone:max-sm:text-[12px] text-[16px]">
            Student Development Room <br />
            Faculty of Engineering, Chiang Mai University
          </p>
        </div>
      </div>

      <div
        className={` ${
          isPhone
            ? " !w-full !h-screen  !justify-end !items-start pb-12 !text-start gradient-try"
            : "w-[45%]"
        } flex flex-col  justify-center text-center items-center`}
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
              !isPhone
                ? " mt-[40px] fixed top-3 left-6   w-[12vw] "
                : "hidden"
            } `}
          />{" "}
          <div className={` ${isPhone ? "" : ""}`}>
            <Icon
              IconComponent={iconBell}
              className={`text-default size-16 stroke-[1.2px] mb-3 ${
                isPhone ? "-ml-2" : " "
              }`}
            />
          </div>
          <p
            className={`${
              isPhone
                ? "text-default text-start font-semibold text-[3vh]  "
                : "text-default font-medium text-center text-[1.4vw]"
            } `}
          >
            {" "}
            Get notified!
          </p>{" "}
          <p
            className={`${
              isPhone
                ? "text-[#969696] text-start font-medium text-[2.2vh] "
                : "hidden"
            } `}
          >
            {" "}
            Automatic Queuing System
          </p>
          <p
            className={`my-4  ${
              isPhone ? "text-[13px] " : "text-[16px] text-center"
            } text-default font-medium`}
          >
            Don’t miss your queue! Allow notifications, and we’ll send you a
            friendly alert as soon as your queue arrives.
          </p>
          <div
            className={`flex gap-3  items-center justify-center  ${
              isPhone ? " w-[100%] mt-2" : "w-[100%] mt-8"
            } acerSwift:max-macair133:w-[40vw] p-4 acerSwift:max-macair133:p-3 rounded-md bg-[#f63131]/15`}
          >
            <Icon IconComponent={iconEx} className="text-[#f63131]" />
            <p className="iphone:max-sm:text-[13px] text-[14px] acerSwift:max-macair133:text-b3 text-[#f63131] font-bold text-start w-full ">
              Notifications Required <br />
              <p className="font-medium mt-[2px]">
                If you do not allow notifications, you won’t be able to access
                the system.
              </p>
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
              style={{
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.45)",
              }}
              className={`mt-5 ${
                isPhone
                  ? " w-[100%] rounded-full bg-[#1db9bc] hover:bg-[#189b9d] mt-5 h-12 text-[15px] font-semibold"
                  : "py-6 px-12 text-[15px] bg-[#1db9bc] hover:bg-[#189b9d] font-semibold"
              }`}
              onClick={handleSubscribe}
            >
              Allow Notification
            </Button>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
