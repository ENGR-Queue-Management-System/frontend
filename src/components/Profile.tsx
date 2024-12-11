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

type ProfileProps = {
  role: "admin" | "student";
};
const Profile: React.FC<ProfileProps> = ({ role }) => {
  const user = useAppSelector((state) => state.user);

  return (
    <>
      {role === "admin" ? (
        <Popover>
          <PopoverTrigger  asChild>
            <Button
              variant="ghost"
              className="flex items-center translate-x-3 hover:bg-transparent  gap-2"
            >
              <div className="flex flex-col w-fit  py-2 font-normal text-[14px] text-white items-end">
                <p>{getUserName(user, 3)}</p>
                <p>{getUserName(user, 1)}</p>
              </div>
              <Icon
                IconComponent={IconUser}
                className="!size-10 stroke-white"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-1">
              <CounterManageModal
                triggerText="จัดการเคาท์เตอร์"
                icon={IconAdminMange}
                title="จัดการเคาท์เตอร์"
              ></CounterManageModal>
              <LogQueueModal
                triggerText="ประวัติการบริการ"
                icon={IconHistory}
                title="ประวัติการบริการ"
              ></LogQueueModal>
              <Button className=" bg-white hover:bg-[#f7b1b13b] text-[#f04a4a] justify-start">
                <Icon
                  IconComponent={IconLogout}
                  className=" stroke-[#f04a4a]"
                />
                <p className=" translate-x-1">ออกจากระบบ</p>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="flex items-center translate-x-3  gap-2">
          <div className="flex flex-col w-fit  py-2 font-normal text-[14px] text-white items-end">
            <p>สวิช จารึกพูนผล</p>
            <p>640610672</p>{" "}
          </div>
          <Icon IconComponent={IconUser} className="!size-10 stroke-white" />
        </div>
      )}
    </>
  );
};

export default Profile;
