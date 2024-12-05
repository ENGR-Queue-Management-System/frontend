import Profile from "./Profile";
import Image from "next/image";
import logoEng from "../../public/images/logoEng2.png";
import { useState } from "react";


export default function Navbar() {
  const role = "admin";
  return (
    <div
      className="min-h-[70px] bg-gradient-to-r from-[#009999] to-[#006666] border-b border-[#e0e0e0] text-secondary px-6 inline-flex w-full justify-between items-center z-50 border-none"
      style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex items-center gap-2 -ml-1">
        <Image className=" z-50 w-[60px]" src={logoEng} alt="loginImage" />
        <div className="flex flex-col w-fit gap-0 font-medium text-b2 text-white">
          {role === "admin" ? (
            <p>ระบบจัดการคิว คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่</p>
          ) : (
            <p>ระบบรับบัตรคิว คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่</p>
          )}
          {role === "admin" ? (
            <p>Queue Management - Engineering CMU</p>
          ) : (
            <p>Ticket Queue - Engineering CMU</p>
          )}
        </div>
      </div>
      <Profile />
    </div>
  );
}
