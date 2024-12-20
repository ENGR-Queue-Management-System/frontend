import Icon from "@/components/Icon";
import IconUser from "../../public/icons/user.svg";
import IconAdminMange from "../../public/icons/adminManage.svg";
import IconHistory from "../../public/icons/history.svg";
import IconLogout from "../../public/icons/logout.svg";
import IconChange from "../../public/icons/changeDepart.svg";
import IconList from "../../public/icons/list.svg";
import IconPlus from "../../public/icons/plus.svg";
import IconChangeLocation from "../../public/icons/location.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LogQueueModal from "../components/modal/LogQueueModal";
import RoomManageModal from "../components/modal/RoomManageModal";
import CounterManageModal from "../components/modal/CounterManageModal";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store";
import { getUserName } from "@/helpers/function";
import { useState } from "react";
import AddCounterModal from "./modal/AddCounterModal";
import Link from "next/link";
import ContactTopicManageModal from "./modal/ContactTopicManageModal";

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center translate-x-3 hover:bg-transparent  gap-2"
          >
            <div className="flex flex-col w-fit  py-2 font-normal text-[14px] text-white items-end acerSwift:max-macair133:text-b4">
              <p>{getUserName(user, 3)}</p>
              {user.studentId ? (
                <p>{user.studentId}</p>
              ) : user.email ? (
                <p className=" acerSwift:max-macair133:-mt-1">ผู้ดูแลระบบ</p>
              ) : (
                <></>
              )}
            </div>
            <Icon
              IconComponent={IconUser}
              className="!size-10 stroke-white  acerSwift:max-macair133:!size-9"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mr-14">
          <div className="flex flex-col gap-1">
            {/* {!user.student && user.email && (
              <> */}
                  <ContactTopicManageModal
                triggerText="จัดการหัวข้อการบริการ"
                icon={IconAdminMange}
                title="จัดการหัวข้อการบริการ"
              ></ContactTopicManageModal>
            <CounterManageModal
              triggerText="จัดการเคาน์เตอร์"
              icon={IconAdminMange}
              title="จัดการเคาน์เตอร์"
            ></CounterManageModal>
            <LogQueueModal
              triggerText="ประวัติการบริการ"
              icon={IconHistory}
              title="ประวัติการบริการ"
            ></LogQueueModal>
            {/* </>
            )} */}
            <Link href="/student-dashboard">
              <Button variant="ghost">Student dashboard</Button>
            </Link>
            <Link href="/admin-dashboard">
              <Button variant="ghost">Admin dashboard</Button>
            </Link>
            <Button className=" bg-white hover:bg-[#f7b1b13b] text-[#f04a4a] justify-start">
              <Icon IconComponent={IconLogout} className=" stroke-[#f04a4a]" />
              <p className=" translate-x-1">ออกจากระบบ</p>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Profile;
