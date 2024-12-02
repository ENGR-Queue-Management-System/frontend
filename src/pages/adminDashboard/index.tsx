import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import IconSpeech from "../../../public/icons/speechBubble.svg?react";
// import IconLocation from "../../public/icons/location.svg?react";

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

export default function AdminIndex() {
  const data = [
    {
      id: 5,
      studentId: "650610795",
      name: "เพ็ญพิชชา ทองคำ",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ขอจัดกิจกรรมหรือโครงการพิเศษ",
      description:
        "This student requested to organize a special project or activity.",
    },
    {
      id: 6,
      studentId: "660610778",
      name: "พิริยา เนตรค่ายวง",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ฝึกงาน-สหกิจศึกษา",
      description: "This student applied for an internship or co-op program.",
    },
    {
      id: 7,
      studentId: "670610704",
      name: "ธนิดา ศิริรส",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ฝึกงาน-สหกิจศึกษา",
      description:
        "This student participated in an internship or co-op program.",
    },
    {
      id: 8,
      studentId: "670612133",
      name: "สิรวุฒิ ภาคภูมิกมลสิทธิ์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ทุนการศึกษา",
      description:
        "This student applied for financial aid through a scholarship.",
    },
    {
      id: 9,
      studentId: "660612140",
      name: "ชนะชัย ขำนายหมอ",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ฝึกงาน-สหกิจศึกษา",
      description: "This student requested guidance on an internship program.",
    },
    {
      id: 10,
      studentId: "640610690",
      name: "ชยธร ปานแปง",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ฝึกงาน-สหกิจศึกษา",
      description:
        "This student sought approval for an internship opportunity.",
    },
    {
      id: 11,
      studentId: "660610803",
      name: "สุริโย หลุ่มโสม",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ทุนการศึกษา",
      description:
        "This student requested assistance for a scholarship application.",
    },
    {
      id: 12,
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
      studentId: "640610657",
      name: "สมชาย ประเสริฐ",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ขอคำปรึกษาด้านวิชาการ",
      description: "This student asked for advice on improving study habits.",
    },
    {
      id: 14,
      studentId: "640610658",
      name: "กาญจนา ศรีสวัสดิ์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ฝึกงาน-สหกิจศึกษา",
      description: "This student is applying for a summer internship program.",
    },
    {
      id: 15,
      studentId: "640610659",
      name: "รวิชญ์ เลิศลักษณ์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ทุนการศึกษา",
      description:
        "This student requested financial assistance for tuition fees.",
    },
    {
      id: 16,
      studentId: "640610660",
      name: "สุทธิดา จิตตราภิรมย์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ขอคำปรึกษาด้านวิชาการ",
      description:
        "This student requested academic guidance for a thesis project.",
    },
    {
      id: 17,
      studentId: "640610661",
      name: "วีรภัทร สวัสดิ์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ทุนการศึกษา",
      description: "This student applied for a scholarship to study abroad.",
    },
    {
      id: 18,
      studentId: "640610662",
      name: "อนันต์ พิทยากุล",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ฝึกงาน-สหกิจศึกษา",
      description:
        "This student sought advice on finding internship opportunities.",
    },
    {
      id: 19,
      studentId: "640610663",
      name: "กิตติพงษ์ คุ้มครอง",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "แจ้งปัญหาด้านการเรียนการสอน",
      description: "This student reported a problem with the course schedule.",
    },
    {
      id: 20,
      studentId: "640610664",
      name: "พรรณี วิรุฬห์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ขอจัดกิจกรรมหรือโครงการพิเศษ",
      description:
        "This student proposed an idea for a community outreach project.",
    },
    {
      id: 21,
      studentId: "640610665",
      name: "สิริกุล จันทร์วงศ์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ทุนการศึกษา",
      description:
        "This student requested a scholarship for academic excellence.",
    },
    {
      id: 22,
      studentId: "640610666",
      name: "ธนัฐพล ศุภรางกูร",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ขอคำปรึกษาด้านวิชาการ",
      description:
        "This student requested advice on selecting courses for next semester.",
    },
  ];

  const dataDone = [
    {
      id: 1,
      studentId: "640610656",
      name: "ภัทรกณ ตาคำ",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "อื่นๆ",
      description:
        "ขอคำปรึกษาเรื่องทั่วไปครับ เพราะมีหลายเรื่องที่อยากรู้เพิ่มเติม",
    },
    {
      id: 2,
      studentId: "640610652",
      name: "พันธุ์ธัช หมื่นปราบ",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ทุนการศึกษา",
      description:
        "ยื่นขอทุนการศึกษาครับ อยากได้รับการสนับสนุนเพื่อการเรียนต่อ",
    },
    {
      id: 3,
      studentId: "640610627",
      name: "ฐิตายุ ฟุ้งธรรม",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ขอคำปรึกษาด้านวิชาการ",
      description: "ต้องการคำปรึกษาเกี่ยวกับการ path เรียน ME ครับ",
    },
    {
      id: 4,
      studentId: "630612184",
      name: "พีระ อรุณรัตน์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "แจ้งปัญหาด้านการเรียนการสอน",
      description:
        "มีปัญหาบางอย่างเกี่ยวกับการเรียนการสอนที่อยากแจ้งครับ เพื่อให้ปรับปรุง",
    },
  ];

  return (
    <div className="flex flex-col overflow-hidden">
      <Navbar />
      <div className="px-12 py-2">
        <Tabs defaultValue="incoming">
          <TabsList>
            <TabsTrigger value="incoming">
              รอเรียกคิว ({data.length})
            </TabsTrigger>
            <TabsTrigger value="called">คิวที่เรียกไปแล้ว (13)</TabsTrigger>
          </TabsList>
          <TabsContent
            value="incoming"
            className="flex gap-5 flex-1 overflow-hidden "
          >
            <div
              className="w-[80%] rounded-lg max-h-[40vw]  overflow-clip overflow-y-auto border border-[#E5DDEA] shadow-shadow-table mt-1"
              style={{
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Table>
                <TableHeader>
                  <TableRow className="sticky top-0 z-30">
                    <TableHead className="w-[100px]">เลขคิว</TableHead>
                    <TableHead>รหัสนักศึกษา</TableHead>
                    <TableHead>ห้องติดต่อ</TableHead>
                    <TableHead>ชื่อ-นามสกุล</TableHead>
                    <TableHead>รายการติดต่อ</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.id < 10 ? "00" : item.id < 100 && "0"}
                        {item.id}
                      </TableCell>
                      <TableCell>{item.studentId}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="flex gap-2 items-center">
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
                      </TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col gap-5 h-[40.5vw] w-[40%] text-[15px] font-medium p-1">
              <div
                className="flex bg-white rounded-lg border border-[#E5DDEA] text-[15px] px-6 py-4 justify-between items-center"
                style={{
                  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div>
                  <div className="flex-col">
                    <p>รับคิวนักศึกษา</p>
                    <p className="text-primary text-[13px] ">
                      ห้องงานพัฒนาคุณภาพนักศึกษา
                    </p>
                  </div>
                </div>
                <Switch />
              </div>
              <div
                className="flex gap-5 flex-col h-full bg-white rounded-lg border border-[#E5DDEA] text-[14px] px-6 py-4 justify-start items-center"
                style={{
                  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="flex  flex-col flex-1 w-full text-[14px]">
                  <div className="flex justify-between w-full pb-4 border-b">
                    <p>21 พ.ย. 2567</p>
                    <p>16:10:12</p>
                  </div>
                  <div className="flex flex-col gap-6  justify-center items-center h-full">
                    <p className="text-[24px] ">คิวที่กำลังให้บริการ </p>
                    <div className="w-36 h-36 border-[3px] border-primary text-primary rounded-[100%] flex items-center justify-center font-semibold text-[40px]">
                      004
                    </div>

                    <div className="text-center gap-2 text-[20px] text-secondary">
                      <div className="flex gap-2 items-center text-black">
                        <div
                          className={`${
                            dataDone[3].category === "อื่นๆ"
                              ? "bg-contactList-others"
                              : dataDone[3].category === "ทุนการศึกษา"
                              ? "bg-contactList-scholarship"
                              : dataDone[3].category === "ขอคำปรึกษาด้านวิชาการ"
                              ? "bg-contactList-consultation"
                              : dataDone[3].category ===
                                "แจ้งปัญหาด้านการเรียนการสอน"
                              ? "bg-contactList-report"
                              : dataDone[3].category ===
                                "ขอจัดกิจกรรมหรือโครงการพิเศษ"
                              ? "bg-contactList-request"
                              : dataDone[3].category === "ฝึกงาน-สหกิจศึกษา" &&
                                "bg-contactList-internship"
                          } h-3 w-3 rounded-[100%]`}
                        ></div>
                        {dataDone[3].category}
                      </div>
                      <div className="mt-4">
                        <p>{dataDone[3].studentId}</p>
                        <p>{dataDone[3].name}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-5 w-full">
                  <Button
                    variant="secondary"
                    className="w-full py-6 text-[16px]"
                  >
                    เรียกซ้ำ
                  </Button>
                  <Button className="w-full py-6 text-[16px]">คิวถัดไป</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="called"
            className="flex-1 overflow-hidden -mt-[0.5] h-full"
          >
            <div
              className="w-full rounded-lg  overflow-clip overflow-y-auto border border-[#E5DDEA] mt-1"
              style={{
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">เลขคิว</TableHead>
                    <TableHead>รหัสนักศึกษา</TableHead>
                    <TableHead>ชื่อ-นามสกุล</TableHead>
                    <TableHead>รายการติดต่อ</TableHead>
                    <TableHead className="w-[50%]">
                      รายละเอียดเพิ่มเติม
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataDone.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.id < 10 ? "00" : item.id < 100 && "0"}
                        {item.id}
                      </TableCell>
                      <TableCell>{item.studentId}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="flex gap-2 items-center">
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
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
