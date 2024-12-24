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

export default function Navbar() {
  const { deviceType, isPhone } = useNotification();
  const location = usePathname();
  const user = useAppSelector((state) => state.user.user);
  return (
    <div
      className={`${
        [DEVICE_TYPE.IOS].includes(deviceType!)
          ? "pt-[52px] gradient-bg-navbar "
          : "gradient-bg-navbar"
      } min-h-fit ipadmini:max-acerSwift:pt-5 acerSwift:max-macair133:min-h-[58px]  border-b border-[#e0e0e0] text-secondary px-5 inline-flex w-full justify-between items-center z-50 border-none top-0`}
      style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.3)" }}
    >
      <div className="flex items-center gap-2 -ml-1">
        {[Route.Login].includes(location) && isPhone && (
          <Icon
            IconComponent={IconLeft}
            classNameDiv="cursor-pointer p-2 rounded-full"
            className="text-default z-50"
            onClick={() => Router.back()}
          />
        )}
        <Image
          className=" w-[110px] -ml-8 acerSwift:max-macair133:w-[100px]"
          src={logoSDColor}
          alt="loginImage"
        />
        <div className="flex flex-col  w-fit gap-0 font-medium text-[14px]  iphone-max:sm:text-[13px] acerSwift:max-macair133:text-b4 text-default">
          <p className="-ml-8 ">
            {user.role == ROLE.ADMIN ? "ระบบจัดการคิว " : "รับบัตรคิว "}
          </p>
          {user.role == ROLE.ADMIN ? (
            <p className=" -ml-8 font-semibold">Queue Management</p>
          ) : (
            <p className=" -ml-8 font-semibold">Ticket Queue</p>
          )}
        </div>
      </div>
      {![Route.Login].includes(location) && <Profile />}
    </div>
  );
}
