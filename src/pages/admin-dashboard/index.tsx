import Navbar from "@/components/Navbar";
import Icon from "@/components/Icon";
import IconNext from "../../../public/icons/next.svg";
import IconRecall from "../../../public/icons/repeat.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import IconSpeech from "../../../public/icons/speechBubble.svg";
// import IconLocation from "../../public/icons/location.svg";
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
    {
      id: 4,
      studentId: "630612184",
      name: "พีระ อรุณรัตน์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "แจ้งปัญหาด้านการเรียนการสอน",
      description:
        "มีปัญหาบางอย่างเกี่ยวกับการเรียนการสอนที่อยากแจ้งครับ เพื่อให้ปรับปรุง",
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
    {
      id: 4,
      studentId: "630612184",
      name: "พีระ อรุณรัตน์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "แจ้งปัญหาด้านการเรียนการสอน",
      description:
        "มีปัญหาบางอย่างเกี่ยวกับการเรียนการสอนที่อยากแจ้งครับ เพื่อให้ปรับปรุง",
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
    {
      id: 4,
      studentId: "630612184",
      name: "พีระ อรุณรัตน์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "แจ้งปัญหาด้านการเรียนการสอน",
      description:
        "มีปัญหาบางอย่างเกี่ยวกับการเรียนการสอนที่อยากแจ้งครับ เพื่อให้ปรับปรุง",
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
    {
      id: 4,
      studentId: "630612184",
      name: "พีระ อรุณรัตน์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "แจ้งปัญหาด้านการเรียนการสอน",
      description:
        "มีปัญหาบางอย่างเกี่ยวกับการเรียนการสอนที่อยากแจ้งครับ เพื่อให้ปรับปรุง",
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
    {
      id: 4,
      studentId: "630612184",
      name: "พีระ อรุณรัตน์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "แจ้งปัญหาด้านการเรียนการสอน",
      description:
        "มีปัญหาบางอย่างเกี่ยวกับการเรียนการสอนที่อยากแจ้งครับ เพื่อให้ปรับปรุง",
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
    {
      id: 4,
      studentId: "630612184",
      name: "พีระ อรุณรัตน์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "แจ้งปัญหาด้านการเรียนการสอน",
      description:
        "มีปัญหาบางอย่างเกี่ยวกับการเรียนการสอนที่อยากแจ้งครับ เพื่อให้ปรับปรุง",
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
    {
      id: 4,
      studentId: "630612184",
      name: "พีระ อรุณรัตน์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "แจ้งปัญหาด้านการเรียนการสอน",
      description:
        "มีปัญหาบางอย่างเกี่ยวกับการเรียนการสอนที่อยากแจ้งครับ เพื่อให้ปรับปรุง",
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
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Navbar />
      <div className="px-4 flex flex-col h-full w-full overflow-hidden bg-[#f9f9f9] pt-3 ">
        <Tabs className="flex flex-col !w-full !h-full" defaultValue="incoming">
          <TabsList className="!w-full">
            <TabsTrigger value="incoming">
              รอเรียกคิว ({data.length})
            </TabsTrigger>
            <TabsTrigger value="called">คิวที่เรียกไปแล้ว (13)</TabsTrigger>
          </TabsList>
          <TabsContent
            value="incoming"
            className="flex  gap-4 max-h-full overflow-hidden"
          >
            <div
              className="w-[60%] h-full rounded-lg overflow-clip overflow-y-auto border border-[#E5DDEA] shadow-shadow-table"
              style={{
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Table striped={true}>
                <TableHeader>
                  <TableRow className="sticky text-b2  samsungA24:text-b1 font-bold top-0 z-30">
                    <TableHead>เลขคิว</TableHead>
                    <TableHead>รหัสนักศึกษา</TableHead>

                    <TableHead>ชื่อ-นามสกุล</TableHead>
                    <TableHead>รายการติดต่อ</TableHead>
                    <TableHead>เพิ่มเติม</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className=" font-normal text-b2 samsungA24:text-b1">
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium py-4">
                        {item.id < 10 ? "00" : item.id < 100 && "0"}
                        {item.id}
                      </TableCell>
                      <TableCell>{item.studentId}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="flex gap-2  translate-y-[6px] items-center">
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
            <div className="flex flex-col gap-4 max-h-full w-[40%] text-[15px] font-medium">
              <div
                className="flex bg-white rounded-lg border border-[#E5DDEA] text-[15px] px-6 py-3 justify-between items-center"
                style={{
                  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div>
                  <div className="flex-col">
                    <p className="text-[16px]">รับคิวนักศึกษา</p>
                    <p className="text-primary text-[13px] ">
                      ห้องงานพัฒนาคุณภาพนักศึกษา
                    </p>
                  </div>
                </div>
                <Switch />
              </div>
              <div
                className="flex  flex-col h-full bg-white rounded-lg overflow-auto border border-[#E5DDEA] px-6 py-4  "
                style={{
                  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="flex flex-col  justify-between  items-center h-full">
                  <div className="flex justify-center flex-col items-center mt-7">
                    <p className="text-[20px] samsungA24:text-[23px] font-normal ">
                      คิวที่คุณกำลังให้บริการ{" "}
                    </p>
                    <p className="text-primary  text-[16px] samsungA24:text-[20px] ">
                      ห้องงานพัฒนาคุณภาพนักศึกษา
                    </p>
                    <div className=" samsungA24:mt-3 ipad11:max-samsungA24:mt-2 mb-1 border-primary text-primary rounded-[100%] flex items-center justify-center samsungA24:text-[70px] font-medium text-[50px]">
                      004
                    </div>
                    <div className="text-center items-center justify-center flex flex-col  samsungA24:text-[22px] text-[18px] text-primary">
                      <div className="mt-2">
                        <p className="font-medium">
                          {dataDone[3].studentId} - {dataDone[3].name}
                        </p>
                      </div>
                      <div className="flex  gap-2 mt-3 samsungA24:text-[18px] text-[16px] items-center text-[#333333]">
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
                    </div>{" "}
                  </div>{" "}
                  <div className="flex flex-col items-end justify-end gap-2 w-full">
                    <div className=" pt-4 pb-5 px-6 rounded-2xl samsungA24:text-[20px] text-[16px]  !w-full flex flex-col bg-table-background">
                      <div className="gap-2 flex flex-col">
                        <p className=" text-table-foreground mb-1 font-medium">
                          {" "}
                          คิวถัดไปเลขคิว 005
                        </p>
                        
                        <p className=" text-[14px] samsungA24:text-[18px]">
                          650610795 - เพ็ญพิชชา ทองคำ
                        </p>
                        <div className="flex text-[14px] samsungA24:text-[18px] items-center gap-3">
                          <div
                            className={`${
                              dataDone[3].category === "อื่นๆ"
                                ? "bg-contactList-others"
                                : dataDone[3].category === "ทุนการศึกษา"
                                ? "bg-contactList-scholarship"
                                : dataDone[3].category ===
                                  "ขอคำปรึกษาด้านวิชาการ"
                                ? "bg-contactList-consultation"
                                : dataDone[3].category ===
                                  "แจ้งปัญหาด้านการเรียนการสอน"
                                ? "bg-contactList-report"
                                : dataDone[3].category ===
                                  "ขอจัดกิจกรรมหรือโครงการพิเศษ"
                                ? "bg-contactList-request"
                                : dataDone[3].category ===
                                    "ฝึกงาน-สหกิจศึกษา" &&
                                  "bg-contactList-internship"
                            } h-3 w-3 rounded-[100%]`}
                          ></div>
                          {dataDone[3].category}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col w-full gap-4">
                    <Button className="w-full items-center flex samsungA24:h-14 h-12">
                      <p className="samsungA24:text-[18px]">คิวถัดไป</p>
                      <Icon IconComponent={IconNext} className="!size-5" />
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full samsungA24:h-14 h-12 text-[14px] samsungA24:text-[18px]"
                    >
                      เรียกซ้ำ
                      <Icon IconComponent={IconRecall} className="!size-5" />
                    </Button></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="called"
            className="flex -mt-[32px]  gap-4 max-h-full overflow-hidden"
          >
            <div
              className="w-full rounded-lg   overflow-clip overflow-y-auto border border-[#E5DDEA] "
              style={{
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Table striped={true}>
                <TableHeader>
                  <TableRow className="sticky text-b2 samsungA24:text-b1 font-bold top-0 z-30">
                    <TableHead className="w-[100px]">เลขคิว</TableHead>
                    <TableHead>รหัสนักศึกษา</TableHead>
                    <TableHead>ชื่อ-นามสกุล</TableHead>
                    <TableHead>รายการติดต่อ</TableHead>
                    <TableHead className="w-[50%]">เพิ่มเติม</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className=" font-normal text-b2 samsungA24:text-b1">
                  {dataDone.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium py-4 ">
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
                      <TableCell></TableCell>
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