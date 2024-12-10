import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import IconUsers from "../../../public/icons/users.svg";
import IconUser from "../../../public/icons/user.svg";
import IconTrash from "../../../public/icons/trash.svg";
import Icon from "@/components/Icon";

type PopupProps = {
  triggerText: string;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
};
const AddAdminModal: React.FC<PopupProps> = ({
  triggerText,
  icon: IconComponent,
  title,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="bg-white hover:bg-table-background text-[#333333] justify-start"
        >
          {IconComponent && (
            <IconComponent className="h-5 w-5 -translate-x-1 stroke-[#333333]" />
          )}
          <span className="ml-1">{triggerText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[45vw] iphone:max-sm:max-w-[95vw]">
        <DialogHeader>
          <DialogTitle className=" text-table-foreground text-start">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div>
          {" "}
          <div className=" py-6 px-2 border-b-2   text-start flex flex-col gap-1">
            เพิ่มผู้ดูแลระบบด้วย CMU account
            <div className="flex gap-3">
              <Input type="email" placeholder="e.g. example@cmu.ac.th" />
              <Button className=" px-5">เพิ่ม</Button>
            </div>
          </div>
          <div
            className="p-0 rounded-lg mt-6 flex flex-col gap-1"
            style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px" }}
          >
            <div className="flex bg-table-background text-table-foreground gap-3 items-center font-medium py-3 px-4 ">
              <Icon IconComponent={IconUsers} /> รายชื่อผู้ดูแลระบบ
            </div>
            <div className=" max-h-[400px] iphone:max-sm:h-[20vh] overflow-y-auto px-5">
              <div className="flex border-b-[1px] border-[#e1e1e1] font-medium text-default justify-between gap-3 items-center py-2  ">
                <div className="flex  gap-3 items-center py-2">
                  <Icon IconComponent={IconUser} className="!size-9" />{" "}
                  <div className="flex flex-col">
                    <p className="text-start">เนตรนภา สาระแปง</p>
                    <p className=" font-normal text-b4 text-table-foreground">
                      งานพัฒนาคุณภาพนักศึกษา
                    </p>
                  </div>
                </div>
                <p className=" text-table-foreground mr-4">คุณ</p>
              </div>
              <div className="flex border-b-[1px] border-[#e1e1e1] font-medium text-default justify-between gap-3 items-center py-2  ">
                <div className="flex  gap-3 items-center py-2">
                  <Icon IconComponent={IconUser} className="!size-9" />{" "}
                  <div className="flex flex-col">
                    <p>สวิช จารึกพูนผล</p>
                    <p className=" font-normal text-b4 text-table-foreground">
                      งานบริการนักศึกษา
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-red-500 rounded-full text-red-500 hover:bg-[#f7b1b13b] hover:text-white"
                >
                  <Icon IconComponent={IconTrash} className="stroke-delete" />
                </Button>
              </div>
              <div className="flex border-b-[1px] border-[#e1e1e1] font-medium text-default justify-between gap-3 items-center py-2  ">
                <div className="flex  gap-3 items-center py-2">
                  <Icon IconComponent={IconUser} className="!size-9" />{" "}
                  <div className="flex flex-col">
                    <p>สวิช จารึกพูนผล</p>
                    <p className=" font-normal text-b4 text-table-foreground">
                      งานบริการนักศึกษา
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-red-500 rounded-full text-red-500 hover:bg-[#f7b1b13b] hover:text-white"
                >
                  <Icon IconComponent={IconTrash} className="stroke-delete" />
                </Button>
              </div>
              <div className="flex border-b-[1px] border-[#e1e1e1] font-medium text-default justify-between gap-3 items-center py-2  ">
                <div className="flex  gap-3 items-center py-2">
                  <Icon IconComponent={IconUser} className="!size-9" />{" "}
                  <div className="flex flex-col">
                    <p>สวิช จารึกพูนผล</p>
                    <p className=" font-normal text-b4 text-table-foreground">
                      งานบริการนักศึกษา
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-red-500 rounded-full text-red-500 hover:bg-[#f7b1b13b] hover:text-white"
                >
                  <Icon IconComponent={IconTrash} className="stroke-delete" />
                </Button>
              </div>
              <div className="flex border-b-[1px] border-[#e1e1e1] font-medium text-default justify-between gap-3 items-center py-2  ">
                <div className="flex  gap-3 items-center py-2">
                  <Icon IconComponent={IconUser} className="!size-9" />{" "}
                  <div className="flex flex-col">
                    <p>สวิช จารึกพูนผล</p>
                    <p className=" font-normal text-b4 text-table-foreground">
                      งานบริการนักศึกษา
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-red-500 rounded-full text-red-500 hover:bg-[#f7b1b13b] hover:text-white"
                >
                  <Icon IconComponent={IconTrash} className="stroke-delete" />
                </Button>
              </div>
              <div className="flex border-b-[1px] border-[#e1e1e1] font-medium text-default justify-between gap-3 items-center py-2  ">
                <div className="flex  gap-3 items-center py-2">
                  <Icon IconComponent={IconUser} className="!size-9" />{" "}
                  <div className="flex flex-col">
                    <p>สวิช จารึกพูนผล</p>
                    <p className=" font-normal text-b4 text-table-foreground">
                      งานบริการนักศึกษา
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-red-500 rounded-full text-red-500 hover:bg-[#f7b1b13b] hover:text-white"
                >
                  <Icon IconComponent={IconTrash} className="stroke-delete" />
                </Button>
              </div>
              <div className="flex border-b-[1px] border-[#e1e1e1] font-medium text-default justify-between gap-3 items-center py-2  ">
                <div className="flex  gap-3 items-center py-2">
                  <Icon IconComponent={IconUser} className="!size-9" />{" "}
                  <div className="flex flex-col">
                    <p>สวิช จารึกพูนผล</p>
                    <p className=" font-normal text-b4 text-table-foreground">
                      งานบริการนักศึกษา
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-red-500 rounded-full text-red-500 hover:bg-[#f7b1b13b] hover:text-white"
                >
                  <Icon IconComponent={IconTrash} className="stroke-delete" />
                </Button>
              </div>
              <div className="flex border-b-[1px] border-[#e1e1e1] font-medium text-default justify-between gap-3 items-center py-2  ">
                <div className="flex  gap-3 items-center py-2">
                  <Icon IconComponent={IconUser} className="!size-9" />{" "}
                  <div className="flex flex-col">
                    <p>สวิช จารึกพูนผล</p>
                    <p className=" font-normal text-b4 text-table-foreground">
                      งานบริการนักศึกษา
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-red-500 rounded-full text-red-500 hover:bg-[#f7b1b13b] hover:text-white"
                >
                  <Icon IconComponent={IconTrash} className="stroke-delete" />
                </Button>
              </div>
              <div className="flex border-b-[1px] border-[#e1e1e1] font-medium text-default justify-between gap-3 items-center py-2  ">
                <div className="flex  gap-3 items-center py-2">
                  <Icon IconComponent={IconUser} className="!size-9" />{" "}
                  <div className="flex flex-col">
                    <p>สวิช จารึกพูนผล</p>
                    <p className=" font-normal text-b4 text-table-foreground">
                      งานบริการนักศึกษา
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-red-500 rounded-full text-red-500 hover:bg-[#f7b1b13b] hover:text-white"
                >
                  <Icon IconComponent={IconTrash} className="stroke-delete" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAdminModal;
