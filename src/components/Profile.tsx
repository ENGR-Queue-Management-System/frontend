import Icon from "@/components/Icon";
import IconUser from "../../public/icons/user.svg";
import IconAdminMange from "../../public/icons/adminManage.svg";
import IconHistory from "../../public/icons/history.svg";
import IconLogout from "../../public/icons/logout.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function Profile() {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="flex items-center  gap-2">
            <div className="flex flex-col w-fit gap-[2px] py-2 font-medium text-b2 text-white items-end">
              <p>เนตรนภา สาระแปง</p>
              <p>ผู้ดูแลระบบ</p>
            </div>
            <Icon IconComponent={IconUser} className="!size-12" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-1">
            <Button className=" bg-white hover:bg-table-background text-[#333333] justify-start">
              {" "}
              <Icon IconComponent={IconAdminMange} className=" !size-5 stroke-[#333333]" />
              จัดการผู้ดูแลระบบ
            </Button>
            <Button className=" bg-white hover:bg-table-background text-[#333333] justify-start">
            
              จัดการหัวข้อการบริการ
            </Button>
            <Button className=" bg-white hover:bg-table-background text-[#333333] justify-start">
              จัดการสถานที่บริการ
            </Button>
            <Button className=" bg-white hover:bg-table-background text-[#333333] justify-start">
            <Icon IconComponent={IconHistory} className="  !size-5 stroke-[#333333]" />
              ประวัติการบริการ
            </Button>
            <Button className=" bg-white hover:bg-table-background text-[#333333] justify-start">
              เปลี่ยนสถานที่ทำงาน
            </Button>
            <Button className=" bg-white hover:bg-[#f7b1b13b] text-[#f04a4a] justify-start">
            <Icon IconComponent={IconLogout} className=" stroke-[#f04a4a]" />
              ออกจากระบบ
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
