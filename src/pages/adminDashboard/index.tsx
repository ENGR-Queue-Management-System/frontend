import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IconSpeech from "../../../public/icons/speechBubble.svg";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminIndex() {
  const data = [
    {
      id: 5,
      studentId: "650610795",
      name: "เพ็ญพิชชา ทองคำ",
      category: "ขอจัดกิจกรรมหรือโครงการพิเศษ",
      description:
        "This student requested to organize a special project or activity.",
    },
    {
      id: 6,
      studentId: "660610778",
      name: "พิริยา เนตรค่ายวง",
      category: "ฝึกงาน-สหกิจศึกษา",
      description: "This student applied for an internship or co-op program.",
    },
    {
      id: 7,
      studentId: "670610704",
      name: "ธนิดา ศิริรส",
      category: "ฝึกงาน-สหกิจศึกษา",
      description:
        "This student participated in an internship or co-op program.",
    },
    {
      id: 8,
      studentId: "670612133",
      name: "สิรวุฒิ ภาคภูมิกมลสิทธิ์",
      category: "ทุนการศึกษา",
      description:
        "This student applied for financial aid through a scholarship.",
    },
    {
      id: 9,
      studentId: "660612140",
      name: "ชนะชัย ขำนายหมอ",
      category: "ฝึกงาน-สหกิจศึกษา",
      description: "This student requested guidance on an internship program.",
    },
    {
      id: 10,
      studentId: "640610690",
      name: "ชยธร ปานแปง",
      category: "ฝึกงาน-สหกิจศึกษา",
      description:
        "This student sought approval for an internship opportunity.",
    },
    {
      id: 11,
      studentId: "660610803",
      name: "สุริโย หลุ่มโสม",
      category: "ทุนการศึกษา",
      description:
        "This student requested assistance for a scholarship application.",
    },
    {
      id: 12,
      studentId: "630610750",
      name: "ภูมิภัทร ศรีกระจ่าง",
      category: "ขอคำปรึกษาด้านวิชาการ",
      description:
        "This student asked for advice regarding their academic performance.",
    },
    // Adding 50 more items
    {
      id: 13,
      studentId: "640610657",
      name: "สมชาย ประเสริฐ",
      category: "ขอคำปรึกษาด้านวิชาการ",
      description: "This student asked for advice on improving study habits.",
    },
    {
      id: 14,
      studentId: "640610658",
      name: "กาญจนา ศรีสวัสดิ์",
      category: "ฝึกงาน-สหกิจศึกษา",
      description: "This student is applying for a summer internship program.",
    },
    {
      id: 15,
      studentId: "640610659",
      name: "รวิชญ์ เลิศลักษณ์",
      category: "ทุนการศึกษา",
      description:
        "This student requested financial assistance for tuition fees.",
    },
    {
      id: 16,
      studentId: "640610660",
      name: "สุทธิดา จิตตราภิรมย์",
      category: "ขอคำปรึกษาด้านวิชาการ",
      description:
        "This student requested academic guidance for a thesis project.",
    },
    {
      id: 17,
      studentId: "640610661",
      name: "วีรภัทร สวัสดิ์",
      category: "ทุนการศึกษา",
      description: "This student applied for a scholarship to study abroad.",
    },
    {
      id: 18,
      studentId: "640610662",
      name: "อนันต์ พิทยากุล",
      category: "ฝึกงาน-สหกิจศึกษา",
      description:
        "This student sought advice on finding internship opportunities.",
    },
    {
      id: 19,
      studentId: "640610663",
      name: "กิตติพงษ์ คุ้มครอง",
      category: "แจ้งปัญหาด้านการเรียนการสอน",
      description: "This student reported a problem with the course schedule.",
    },
    {
      id: 20,
      studentId: "640610664",
      name: "พรรณี วิรุฬห์",
      category: "ขอจัดกิจกรรมหรือโครงการพิเศษ",
      description:
        "This student proposed an idea for a community outreach project.",
    },
    {
      id: 21,
      studentId: "640610665",
      name: "สิริกุล จันทร์วงศ์",
      category: "ทุนการศึกษา",
      description:
        "This student requested a scholarship for academic excellence.",
    },
    {
      id: 22,
      studentId: "640610666",
      name: "ธนัฐพล ศุภรางกูร",
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
      category: "อื่นๆ",
      description:
        "ขอคำปรึกษาเรื่องทั่วไปครับ เพราะมีหลายเรื่องที่อยากรู้เพิ่มเติม",
    },
    {
      id: 2,
      studentId: "640610652",
      name: "พันธุ์ธัช หมื่นปราบ",
      category: "ทุนการศึกษา",
      description:
        "ยื่นขอทุนการศึกษาครับ อยากได้รับการสนับสนุนเพื่อการเรียนต่อ",
    },
    {
      id: 3,
      studentId: "640610627",
      name: "ฐิตายุ ฟุ้งธรรม",
      category: "ขอคำปรึกษาด้านวิชาการ",
      description: "ต้องการคำปรึกษาเกี่ยวกับการ path เรียน ME ครับ",
    },
    {
      id: 4,
      studentId: "630612184",
      name: "พีระ อรุณรัตน์",
      category: "แจ้งปัญหาด้านการเรียนการสอน",
      description:
        "มีปัญหาบางอย่างเกี่ยวกับการเรียนการสอนที่อยากแจ้งครับ เพื่อให้ปรับปรุง",
    },
  ];

  return (
    <div className="flex flex-col overflow-hidden">
      <Navbar />
      <div className="px-12 py-3">
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
              className="w-[60%] rounded-lg max-h-[39vw]  overflow-clip overflow-y-auto border border-[#E5DDEA] shadow-shadow-table"
              style={{
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Table>
                <TableHeader>
                  <TableRow className="sticky top-0 z-30">
                    <TableHead className="w-[100px]">เลขคิว</TableHead>
                    <TableHead>รหัสนักศึกษา</TableHead>
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
            <div className="bg-red-400 h-[39vw] w-[40%]"></div>
          </TabsContent>
          <TabsContent
            value="called"
            className="flex-1 overflow-hidden -mt-[0.5]"
          >
            <div className="w-full rounded-lg max-h-[39vw] overflow-clip overflow-y-auto border border-[#E5DDEA]">
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
