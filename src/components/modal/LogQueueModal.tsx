import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/Icon";
import IconFilter from "../../../public/icons/filter.svg";
import IconSearch from "../../../public/icons/search.svg";
import { th } from "date-fns/locale";

type Props = {
  triggerText: string;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
};
export default function LogQueueModal({
  triggerText,
  icon: IconComponent,
  title,
}: Props) {
  const [date, setDate] = useState<Date>();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const dataDone = [
    {
      id: 1,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "650610795",
      name: "เพ็ญพิชชา ทองคำ",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ขอจัดกิจกรรมหรือโครงการพิเศษ",
      description:
        "This student requested to organize a special project or activity.",
    },
    {
      id: 2,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "660610778",
      name: "พิริยา เนตรค่ายวง",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ฝึกงาน-สหกิจศึกษา",
      description: "This student applied for an internship or co-op program.",
    },
    {
      id: 3,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "650610795",
      name: "เพ็ญพิชชา ทองคำ",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ขอจัดกิจกรรมหรือโครงการพิเศษ",
      description:
        "This student requested to organize a special project or activity.",
    },
    {
      id: 4,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "660610778",
      name: "พิริยา เนตรค่ายวง",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ฝึกงาน-สหกิจศึกษา",
      description: "This student applied for an internship or co-op program.",
    },
    {
      id: 5,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "650610795",
      name: "เพ็ญพิชชา ทองคำ",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ขอจัดกิจกรรมหรือโครงการพิเศษ",
      description:
        "This student requested to organize a special project or activity.",
    },
    {
      id: 6,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "660610778",
      name: "พิริยา เนตรค่ายวง",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ฝึกงาน-สหกิจศึกษา",
      description: "This student applied for an internship or co-op program.",
    },
    {
      id: 7,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "670610704",
      name: "ธนิดา ศิริรส",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ฝึกงาน-สหกิจศึกษา",
      description:
        "This student participated in an internship or co-op program.",
    },
    {
      id: 8,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "670612133",
      name: "สิรวุฒิ ภาคภูมิกมลสิทธิ์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ทุนการศึกษา",
      description:
        "This student applied for financial aid through a scholarship.",
    },
    {
      id: 9,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "660612140",
      name: "ชนะชัย ขำนายหมอ",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ฝึกงาน-สหกิจศึกษา",
      description: "This student requested guidance on an internship program.",
    },
    {
      id: 10,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "640610690",
      name: "ชยธร ปานแปง",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ฝึกงาน-สหกิจศึกษา",
      description:
        "This student sought approval for an internship opportunity.",
    },
    {
      id: 11,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "660610803",
      name: "สุริโย หลุ่มโสม",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ทุนการศึกษา",
      description:
        "This student requested assistance for a scholarship application.",
    },
    {
      id: 12,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "630610750",
      name: "ภูมิภัทร ศรีกระจ่าง",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ขอคำปรึกษาด้านวิชาการ",
      description:
        "This student asked for advice regarding their academic performance.",
    },
    // Adding 50 more items
    {
      id: 13,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "640610657",
      name: "สมชาย ประเสริฐ",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ขอคำปรึกษาด้านวิชาการ",
      description: "This student asked for advice on improving study habits.",
    },
    {
      id: 14,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "640610658",
      name: "กาญจนา ศรีสวัสดิ์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ฝึกงาน-สหกิจศึกษา",
      description: "This student is applying for a summer internship program.",
    },
    {
      id: 15,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "640610659",
      name: "รวิชญ์ เลิศลักษณ์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ทุนการศึกษา",
      description:
        "This student requested financial assistance for tuition fees.",
    },
    {
      id: 16,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "640610660",
      name: "สุทธิดา จิตตราภิรมย์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ขอคำปรึกษาด้านวิชาการ",
      description:
        "This student requested academic guidance for a thesis project.",
    },
    {
      id: 17,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "640610661",
      name: "วีรภัทร สวัสดิ์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ทุนการศึกษา",
      description: "This student applied for a scholarship to study abroad.",
    },
    {
      id: 18,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "640610662",
      name: "อนันต์ พิทยากุล",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ฝึกงาน-สหกิจศึกษา",
      description:
        "This student sought advice on finding internship opportunities.",
    },
    {
      id: 19,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "640610663",
      name: "กิตติพงษ์ คุ้มครอง",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "แจ้งปัญหาด้านการเรียนการสอน",
      description: "This student reported a problem with the course schedule.",
    },
    {
      id: 20,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "640610664",
      name: "พรรณี วิรุฬห์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ขอจัดกิจกรรมหรือโครงการพิเศษ",
      description:
        "This student proposed an idea for a community outreach project.",
    },
    {
      id: 21,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "640610665",
      name: "สิริกุล จันทร์วงศ์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ทุนการศึกษา",
      description:
        "This student requested a scholarship for academic excellence.",
    },
    {
      id: 22,
      date: "21 พ.ย. 2567",
      time: "16:03:32",
      studentId: "640610666",
      name: "ธนัฐพล ศุภรางกูร",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ขอคำปรึกษาด้านวิชาการ",
      description:
        "This student requested advice on selecting courses for next semester.",
    },
  ];

  const categories = [
    {
      topicTH: "ฝึกงาน-สหกิจศึกษา",
      topicEN: "Internship and Cooperative Education",
      room: "งานบริการนักศึกษา",
    },

    {
      topicTH: "ทุนการศึกษา",
      topicEN: "Scholarships",
      room: "งานบริการนักศึกษา",
    },
    {
      topicTH: "ขอคำปรึกษาด้านวิชาการ",
      topicEN: "Academic Consultation",
      room: "งานพัฒนาคุณภาพนักศึกษา",
    },
    {
      topicTH: "แจ้งปัญหาด้านการเรียนการสอน",
      topicEN: "Report Issues with Teaching and Learning",
      room: "งานบริการนักศึกษา",
    },
    {
      topicTH: "ขอจัดกิจกรรมหรือโครงการพิเศษ",
      topicEN: "Request for Special Activities or Projects",
      room: "งานพัฒนาคุณภาพนักศึกษา",
    },
    {
      topicTH: "อื่นๆ",
      topicEN: "Others",
      room: "งานพัฒนาคุณภาพนักศึกษา",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="bg-white hover:bg-table-background text-[#333333] justify-start 4"
        >
          {IconComponent && (
            <IconComponent className="h-5 w-5 -translate-x-1 stroke-[#333333] acerSwift:max-macair133:h-4 acerSwift:max-macair133:w-4" />
          )}
          <span className="ml-1">{triggerText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[100vw] !rounded-none h-[100vh] flex flex-col pb-12 acerSwift:max-macair133:pb-9 acerSwift:max-macair133:py-5"
        type="log"
      >
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col gap-2  text-primary px-4 acerSwift:max-macair133:text-b1">
              {title}
              <p className="text-default/60 font-medium text-b2 acerSwift:max-macair133:text-b3">
                ประวัติการให้บริการย้อนหลัง 30 วัน
              </p>
              <div className="border-t mt-4 acerSwift:max-macair133:mt-3"></div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-hidden h-full flex flex-col gap-4 px-10">
          <div className="flex justify-between">
            <div className="font-semibold text-default flex flex-col acerSwift:max-macair133:text-b3">
              <p>บริการทั้งหมด</p>
              <p className="text-[24px] acerSwift:max-macair133:text-h1 text-table-foreground">
                14 คิว
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="flex w-full max-w-sm items-center gap-2">
                <Input
                  type="search"
                  className="w-[340px] acerSwift:max-macair133:text-b4 acerSwift:max-macair133:!h-8"
                  placeholder="ค้นหา เลขคิว, รหัสนักศึกษา, ชื่อ-นามสกุล"
                />
              </div>

              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outlineDefault"}
                    className={cn(
                      "min-w-44 justify-start text-left font-normal acerSwift:max-macair133:text-b4 acerSwift:max-macair133:!h-8"
                    )}
                  >
                    <CalendarIcon />
                    {date
                      ? format(date, "d MMMM yyyy", { locale: th }).replace(
                          /(\d{4})/,
                          (match) => (parseInt(match) + 543).toString()
                        )
                      : "เลือกวันที่"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    onClear={() => {
                      setDate(undefined);
                      setIsPopoverOpen(false);
                    }}
                    action={() => {
                      const today = new Date();
                      setDate(today);
                      setIsPopoverOpen(false);
                    }}
                    disabled={(date) => {
                      const today = new Date();
                      const last30Day = new Date();
                      last30Day.setDate(today.getDate() - 30);

                      return date > today || date < last30Day;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"default"}
                    className={cn(
                      "w-fit justify-start text-left font-normal acerSwift:max-macair133:!h-8"
                    )}
                  >
                    <Icon
                      IconComponent={IconFilter}
                      className=" !size-[15px] -translate-x-1 acerSwift:max-macair133:-translate-x-0 acerSwift:max-macair133:!size-3.5 "
                    />

                    <span className="acerSwift:max-macair133:text-b3 ">
                      กรอง
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="px-6 py-3 w-auto text-b2 "
                  align="end"
                >
                  <p className="font-medium mb-2 text-primary text-b1 acerSwift:max-macair133:text-b3">
                    กรองรายการติดต่อ
                  </p>

                  {categories.map((cat, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 py-2"
                    >
                      <Checkbox />
                      <div className="flex items-center gap-2 acerSwift:max-macair133:text-b4">
                        <div
                          className={`${
                            cat.topicTH === "อื่นๆ"
                              ? "bg-contactList-others"
                              : cat.topicTH === "ทุนการศึกษา"
                              ? "bg-contactList-scholarship"
                              : cat.topicTH === "ขอคำปรึกษาด้านวิชาการ"
                              ? "bg-contactList-consultation"
                              : cat.topicTH === "แจ้งปัญหาด้านการเรียนการสอน"
                              ? "bg-contactList-report"
                              : cat.topicTH === "ขอจัดกิจกรรมหรือโครงการพิเศษ"
                              ? "bg-contactList-request"
                              : cat.topicTH === "ฝึกงาน-สหกิจศึกษา" &&
                                "bg-contactList-internship"
                          } h-3 w-3 rounded-[100%]`}
                        ></div>
                        <p>{cat.topicTH}</p>
                      </div>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div
            style={{
              boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
            }}
            className="max-h-full rounded-lg overflow-hidden  shadow-shadow-table flex w-full border border-[#E5DDEA]"
          >
            <Table striped={true}>
              <TableHeader className="acerSwift:max-macair133:!h-12 ">
                <TableRow className="sticky text-b2 samsungA24:text-b1 acerSwift:max-macair133:text-b4  font-bold top-0 z-30 ">
                  <TableHead>วันที่</TableHead>
                  <TableHead>เวลาเข้ารับบริการ</TableHead>
                  <TableHead>เลขคิว</TableHead>
                  <TableHead>รหัสนักศึกษา</TableHead>
                  <TableHead>ชื่อ-นามสกุล</TableHead>
                  <TableHead>รายการติดต่อ</TableHead>
                  <TableHead className="w-[50%]">เพิ่มเติม</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="font-normal text-b2 samsungA24:text-b1 acerSwift:max-macair133:text-b4 ">
                {dataDone.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="w-[10%]">{item.date}</TableCell>
                    <TableCell className="w-[12%]">{item.time}</TableCell>
                    <TableCell className="font-medium py-4 w-[8%]">
                      {item.id < 10 ? "A00" : item.id < 100 && "A0"}
                      {item.id}
                    </TableCell>
                    <TableCell className="w-[10%]">{item.studentId}</TableCell>
                    <TableCell className="w-[15%]">{item.name}</TableCell>
                    <TableCell className=" w-[25%]   items-center">
                      <div className="flex items-center gap-2">
                        <div
                          className={`${
                            item.category === "อื่นๆ"
                              ? "bg-contactList-others"
                              : item.category === "ทุนการศึกษา"
                              ? "bg-contactList-scholarship"
                              : item.category === "ขอคำปรึกษาด้านวิชาการ"
                              ? "bg-contactList-consultation"
                              : item.category === "แจ้งปัญหาด้านการเรียนการสอน"
                              ? "bg-contactList-report"
                              : item.category === "ขอจัดกิจกรรมหรือโครงการพิเศษ"
                              ? "bg-contactList-request"
                              : item.category === "ฝึกงาน-สหกิจศึกษา" &&
                                "bg-contactList-internship"
                          } h-3 w-3 rounded-[100%]`}
                        ></div>
                        {item.category}
                      </div>
                    </TableCell>
                    <TableCell className="w-[20%]"></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
