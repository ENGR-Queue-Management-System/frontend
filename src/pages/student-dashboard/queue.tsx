import Navbar from "@/components/Navbar";
import Icon from "@/components/Icon";
import IconNext from "../../../public/icons/next.svg";
import IconRecall from "../../../public/icons/repeat.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import IconSpeech from "../../../public/icons/speechBubble.svg";
import IconLocation from "../../../public/icons/location.svg";
import IconUsers from "../../../public/icons/users.svg";
import IconCalendar from "../../../public/icons/calender.svg";
import IconClock from "../../../public/icons/clock.svg";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function StudentIndex() {
  return (
    <div className="flex flex-col h-screen iphone:max-sm:h-fit w-screen overflow-hidden text-default">
      <Navbar role1="student" />

      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col gap-3 h-fit w-[35%] iphone:max-sm:w-[100%] text-[15px] font-medium ">
          <div
            className="flex iphone:max-sm:overflow-clip flex-col m h-full bg-white rounded-lg border border-[#E5DDEA] overflow-clip"
            style={{
              boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex items-center gap-3 bg-primary  text-white px-6 py-3">
              <Icon IconComponent={IconLocation} className="!size-6" />
              <p>
                ห้องงานพัฒนาคุณภาพนักศึกษา <br /> Student Development Room
              </p>
            </div>
            <div className="flex flex-col gap-7 justify-between items-center px-6 py-6">
              <div className="flex justify-start flex-col gap-3 items-center samsungA24:mt-7 samsungA24:gap-5">
                <div className="text-center ">
                  <p className="text-[20px] samsungA24:text-[23px] font-normal">
                    หมายเลขคิวของคุณ{" "}
                  </p>
                  <p className="text-[18px] samsungA24:text-[23px] font-normal ">
                    Your queue number
                  </p>
                </div>

                <div className="samsungA24:mt-3 iphone:max-sm:mt-3 ipad11:max-samsungA24:mt-0 mb-1 border-primary text-primary rounded-[100%] flex items-center justify-center samsungA24:text-[100px] iphone:max-sm:text-[40px] font-medium text-[52px] h-fit">
                  A016
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div
                    className={`bg-contactList-scholarship 
                      h-3 w-3 rounded-[100%] iphone:max-sm:hidden mt-1`}
                  ></div>
                  <div className="">
                    <p>ทุนการศึกษา (scholarship)</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between w-full px-6">
                <div className="flex items-center gap-3">
                  <Icon IconComponent={IconUsers} className="!size-6" />
                  <div className="text-start">
                    <p className="font-medium">มีคิวก่อนหน้าคุณ</p>{" "}
                    <p>Waiting</p>
                  </div>
                </div>
                <p className="text-[20px] font-semibold">11 Queues</p>
              </div>

              <div className="border-t-2 border-dashed w-full"></div>
              <div className="flex flex-col text-center text-describe text-b4">
                <p>ขอสงวนสิทธิในการข้ามคิว กรณีที่นักศึกษาไม่แสดงตน</p>
                <p>
                  We reserve the right to skip your queue if you do not show up.
                </p>
              </div>
              <div className="flex items-center justify-between w-full text-describe px-6">
                <div className="flex items-center gap-3">
                  <Icon IconComponent={IconCalendar} className="!size-5" />

                  <p className="font-medium">21 พ.ย. 2567</p>
                </div>
                <div className="flex items-center gap-3">
                  <Icon IconComponent={IconClock} className="!size-5" />

                  <p className="font-medium">16:08:58</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="text-[16px] text-delete font-semibold hover:bg-delete/10 w-fit"
              >
                Leave the Queues
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
