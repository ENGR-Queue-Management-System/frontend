import Profile from "./Profile";
import Image from "next/image";
import logoSDWhite from "../../public/images/logoSDMinimalWhite.png";
import { useNotification } from "@/notifications/useNotification";

type NavbarProps = {
  role1: "admin" | "student";
};

const Navbar: React.FC<NavbarProps> = ({ role1 }) => {

    const { deviceType } = useNotification();
  return (
    <div
      className="min-h-[66px] bg-gradient-to-r from-[#009999] to-[#006666] border-b border-[#e0e0e0] text-secondary px-6 inline-flex w-full justify-between items-center z-50 border-none"
      style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex items-center gap-2 -ml-1">
        <Image className="z-50 w-[120px] -ml-8" src={logoSDWhite} alt="loginImage" />
        <div className="flex flex-col w-fit gap-0 font-medium text-[14px] text-white">
          <p className="-ml-8">
            {role1 === "admin" ? "ระบบจัดการคิว" : "ระบบรับบัตรคิว"}
            <span className="iphone:max-sm:hidden">
              {" "}
              คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่
            </span>
          </p>
          {role1 === "admin" ? (
            <p className="iphone:max-sm:hidden -ml-8">
              Queue Management - Engineering CMU
            </p>
          ) : (
            <p className="iphone:max-sm:hidden -ml-8">
              Ticket Queue - Engineering CMU
            </p>
          )}
        </div>
      </div>
      <Profile  />
    </div>
  );
};

export default Navbar;
