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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Profile() {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="flex items-center  gap-2">
            <div className="flex flex-col w-fit  py-2 font-normal text-[13px] text-white items-end">
              <p>เนตรนภา สาระแปง</p>
              <p>ผู้ดูแลระบบ</p>
            </div>
            <Icon IconComponent={IconUser} className="!size-10 stroke-white" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-1">
            <Dialog>
              <DialogTrigger asChild>
                <Button className=" bg-white hover:bg-table-background text-[#333333] justify-start">
                  {" "}
                  <Icon
                    IconComponent={IconAdminMange}
                    className=" !size-5 -translate-x-1 stroke-[#333333]"
                  />
                  <p className=" -translate-x-[1px]">จัดการผู้ดูแลระบบ</p>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[50vw]">
                <DialogHeader>
                  <DialogTitle>
                    <div className="font-medium text-default">
                      {" "}
                      จัดการผู้ดูแลระบบ
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    <div
                      className="p-6 rounded-lg mt-3 flex flex-col gap-1"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px" }}
                    >
                      เพิ่มผู้ดูแลระบบด้วย CMU account
                      <div className="flex gap-3">
                      <Input
                        type="email"
                        placeholder="e.g. example@cmu.ac.th"
                      />
                      <Button>เพิ่ม</Button></div>
                    </div>
                   
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Button className=" bg-white hover:bg-table-background text-[#333333] justify-start">
              <Icon
                IconComponent={IconList}
                className=" !size-[18px]  -translate-x-1 stroke-[#333333]"
              />
              <p className=" translate-x-[2px]">จัดการหัวข้อการบริการ</p>
            </Button>
            <Button className=" bg-white hover:bg-table-background text-[#333333] justify-start">
              <Icon
                IconComponent={IconChangeLocation}
                className=" !size-[18px]  -translate-x-1 stroke-[#333333]"
              />
              <p className=" translate-x-[2px]">จัดการสถานที่บริการ</p>
            </Button>
            <Button className=" bg-white hover:bg-table-background text-[#333333] justify-start">
              <Icon
                IconComponent={IconHistory}
                className="  !size-[18px] -translate-x-1 stroke-[#333333]"
              />
              <p className=" translate-x-[2px]"> ประวัติการบริการ </p>
            </Button>
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