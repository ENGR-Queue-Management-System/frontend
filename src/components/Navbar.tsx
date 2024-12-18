import Profile from "./Profile";
import Image from "next/image";
import logoSDWhite from "../../public/images/logoSDMinimalWhite.png";
import { useNotification } from "@/notifications/useNotification";
import { DEVICE_TYPE } from "@/config/Enum";
import { useAppSelector } from "@/store";
import { Route } from "@/config/Route";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const { deviceType } = useNotification();
  const location = usePathname();
  const user = useAppSelector((state) => state.user);
  return (
    <div
      className={`${
        deviceType === DEVICE_TYPE.IOS ? "pt-16" : ""
      } min-h-fit acerSwift:max-macair133:min-h-[58px]  bg-gradient-to-r  from-[#009999] to-[#006666] border-b border-[#e0e0e0] text-secondary px-6 inline-flex w-full justify-between items-center z-50 border-none top-0`}
      style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex items-center gap-2 -ml-1">
        <Image
          className="z-50 w-[120px] -ml-8 acerSwift:max-macair133:w-[100px]"
          src={logoSDWhite}
          alt="loginImage"
        />
        <div className="flex flex-col  w-fit gap-0 font-medium  text-b2 acerSwift:max-macair133:text-b4 text-white">
          <p className="-ml-8">
            {user.email && !user.studentId ? "ระบบจัดการคิว " : "ระบบรับบัตรคิว "}
            <span className="iphone:max-sm:hidden">
              คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่
            </span>
          </p>
          {user.email && !user.studentId ? (
            <p className=" -ml-8">
              Queue Management
            </p>
          ) : (
            <p className=" -ml-8">
              Ticket Queue
            </p>
          )}
        </div>
      </div>
      {![Route.Login].includes(location) && <Profile />}
    </div>
  );
};

export default Navbar;
