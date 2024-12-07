import Icon from "@/components/Icon";
import IconUser from "../../public/icons/user.svg";
import IconAdminMange from "../../public/icons/adminManage.svg";
import IconHistory from "../../public/icons/history.svg";
import IconLogout from "../../public/icons/logout.svg";
import IconChange from "../../public/icons/changeDepart.svg";
import IconList from "../../public/icons/list.svg";
import IconChangeLocation from "../../public/icons/location.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AddAdminModal from "../components/modal/AddAdminModal";
import LogQueueModal from "../components/modal/LogQueueModal";
import RoomManageModal from "../components/modal/RoomManageModal";
import ContactTopicManageModal from "../components/modal/ContactTopicManageModal";
import { Button } from "@/components/ui/button";

export default function Profile() {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center translate-x-3  gap-2"
          >
            <div className="flex flex-col w-fit  py-2 font-normal text-[14px] text-white items-end">
              <p>เนตรนภา สาระแปง</p>
              <p>ผู้ดูแลระบบ</p>
            </div>
            <Icon IconComponent={IconUser} className="!size-10 stroke-white" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-1">
            <AddAdminModal
              triggerText="จัดการผู้ดูแลระบบ"
              icon={IconAdminMange}
              title="จัดการผู้ดูแลระบบ"
            ></AddAdminModal>
            <ContactTopicManageModal
              triggerText="จัดการหัวข้อการบริการ"
              icon={IconAdminMange}
              title="จัดการหัวข้อการบริการ"
            ></ContactTopicManageModal>

            <RoomManageModal
              triggerText="จัดการสถานที่บริการ"
              icon={IconChangeLocation}
              title="จัดการสถานที่บริการ"
            ></RoomManageModal>

            <LogQueueModal
              triggerText="ประวัติการบริการ"
              icon={IconHistory}
              title="ประวัติการบริการ"
            ></LogQueueModal>
            <Button className=" bg-white hover:bg-table-background text-[#333333] justify-start">
              <Icon
                IconComponent={IconChange}
                className=" stroke-[#333333] !size-5 -translate-x-1"
              />
              เปลี่ยนสถานที่ทำงาน
            </Button>
            <Button className=" bg-white hover:bg-[#f7b1b13b] text-[#f04a4a] justify-start">
              <Icon IconComponent={IconLogout} className=" stroke-[#f04a4a]" />
              <p className=" translate-x-1">ออกจากระบบ</p>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
