import Profile from "./Profile";
import Image from "next/image";
import logoSDColor from "../../public/images/logoSDMiColor.png";
import { useNotification } from "@/notifications/useNotification";
import { DEVICE_TYPE, ROLE } from "@/config/Enum";
import { useAppSelector } from "@/store";
import { Route } from "@/config/Route";
import { usePathname } from "next/navigation";
import Router from "next/router";
import Icon from "./Icon";
import { IconLeft } from "react-day-picker";
import { motion } from "framer-motion";

export default function Navbar() {
  const { deviceType, isPhone } = useNotification();
  const location = usePathname();
  const user = useAppSelector((state) => state.user.user);
  return (
    <motion.div
      initial={isPhone ? { x: "100%" } : false}
      animate={isPhone ? { x: 0 } : false}
      exit={isPhone ? { x: "-100%" } : undefined}
      transition={
        isPhone ? { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } : undefined
      }
      className={`${
        [DEVICE_TYPE.IOS].includes(deviceType!) ? "pt-[52px]" : ""
      } min-h-fit ipadmini:max-acerSwift:pt-5 acerSwift:max-macair133:min-h-[58px] ${
        isPhone ? " !px-3 !bg-white/5 !backdrop-blur-xl border-b-[1px]" : "gradient-bg-navbar"

      }    px-5 inline-flex w-full justify-between items-center   `}
      style={{
        boxShadow: !isPhone ? "0px 0px 4px 0px rgba(0, 0, 0, 0.3)" : "none",
      }}
      
    >
      <div className="flex items-center gap-2  mr-4">
        {[Route.Login].includes(location) && isPhone && (
          <Icon
            IconComponent={IconLeft}
            classNameDiv="cursor-pointer p-2 rounded-full"
            className="text-default z-50"
            onClick={() => Router.back()}
          />
        )}
        <Image className=" w-[40px] py-3 " src={logoSDColor} alt="loginImage" />
        <div
          className={`flex flex-col  w-fit gap-0 font-medium text-[14px]  ${
            isPhone ? "text-[12px]" : "text-[14px]"
          } acerSwift:max-macair133:text-b4 text-default`}
        >
          <p className=" ">
            {user.role == ROLE.ADMIN ? "ระบบจัดการคิว " : "รับบัตรคิว "}
          </p>
          {user.role == ROLE.ADMIN ? (
            <p className="  font-semibold">Queue Management</p>
          ) : (
            <p className="  font-medium">Ticket Queue</p>
          )}
        </div>
      </div>
      {![Route.Login].includes(location) && <Profile />}
    </motion.div>
  );
}
