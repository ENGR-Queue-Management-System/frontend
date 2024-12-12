import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Route } from "@/config/Route";
import { useRouter } from "next/navigation";
import logoSD from "../../public/images/logoSD.png";
import cmuLogoWhite from "../../public/images/cmuLogoLogin.png";
import Icon from "@/components/Icon";
import { useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import IconClock from "../../public/icons/clock.svg";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.email) {
      if (user.studentId) {
        router.push(Route.StudentIndex);
      } else {
        router.push(Route.AdminIndex);
      }
    }
  }, [user]);

  const [time, setTime] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Bangkok",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const currentTime = new Intl.DateTimeFormat("en-US", options).format(
        new Date()
      );
      setTime(currentTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Bangkok",
        weekday: "short",
        day: "numeric",
        month: "short",
      };
      const currentDate = new Intl.DateTimeFormat("en-EN", options).format(
        new Date()
      );
      setDateTime(currentDate);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const QueueCallTable = ({ queueData }) => {
    return (
      <div className="w-full    overflow-clip   h-fit ">
        <Table className="w-full" striped={true}>
          <TableHeader>
            <TableRow className="sticky text-b2 samsungA24:text-b1 font-bold top-0 z-30">
              <TableHead className="  bg-[#001F3F] text-[3vh] text-center border-r-[2px] border-[#f2f2f2] p-3 py-4 text-[#8ff5a7]">
                หมายเลขคิวที่เรียก <br /> (Called Queue)
              </TableHead>
              <TableHead className=" bg-[#001F3F] text-[3vh] text-center text-[#8ff5a7] p-3">
                เคาท์เตอร์ <br /> (Counter)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-normal text-center text-b2 samsungA24:text-b1">
            {queueData && queueData.length > 0 ? (
              queueData.map((item: any) => (
                <TableRow key={item.queueNumber}>
                  <TableCell className="font-semibold bg-[#0b2634] flex flex-col text-white text-[20vh] ">
                    {item.queueNumber}
                    <p className="text-[3.8vh]  -mt-8 my-10">วรพิชชา เมืองยศ</p>
                  </TableCell>
                  <TableCell className=" font-semibold text-[20vh]">
                    {item.counter}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-4">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };

  const QueueCalledTable = ({ calledQueueData }) => {
    return (
      <div
        className="w-full  overflow-clip  h-fit"
        style={{
          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="overflow-y-auto max-h-[81vh]">
          <Table className="w-full" striped={true}>
            <TableHeader>
              <TableRow className="sticky text-b2 samsungA24:text-b1 font-bold top-0 z-30">
                <TableHead
                  className="bg-blue-700 text-[2.5vh] text-center text-white p-3"
                  colSpan={2}
                >
                  คิวที่เรียกไปแล้ว <br /> (Previous Queue)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="font-normal text-center text-b2 samsungA24:text-b1">
              {calledQueueData && calledQueueData.length > 0 ? (
                calledQueueData.map((item) => (
                  <TableRow key={item.queueNumber}>
                    <TableCell className="font-semibold text-[5vh] py-4">
                      {item.queueNumber}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-4">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };

  const NumberOfService = () => {
    return (
      <div
        className="w-full rounded-lg   overflow-hidden  border-[#001F3F] border-2 h-fit "
        style={{
          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table className="w-full" striped={true}>
          <TableHeader>
            <TableRow className="sticky text-b2 samsungA24:text-b1 font-bold top-0 z-30">
              <TableHead className="  bg-blue-600 text-[4vh] text-center border-r-2 p-3 text-white">
                นศ.ทั้งหมด
              </TableHead>
              <TableHead className=" bg-blue-600 text-[4vh] text-center text-white p-3">
                รอรับบริการ
              </TableHead>
              <TableHead className=" bg-blue-600 text-[4vh] text-center text-white p-3">
                ให้บริการแล้ว
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-normal text-center text-b2 samsungA24:text-b1">
            <TableRow>
              <TableCell className="font-normal text-[12vh] py-4">
                120
              </TableCell>
              <TableCell className=" font-normal text-[12vh]">80</TableCell>
              <TableCell className=" font-normal text-[12vh]">40</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  };

  const queueData = [{ queueNumber: "A081", counter: "A" }];

  const calledQueueData = [
    { queueNumber: "A080" },
    { queueNumber: "B021" },
    { queueNumber: "B020" },
    { queueNumber: "A079" },
    { queueNumber: "C025" },
    { queueNumber: "A078" },
    { queueNumber: "A077" },
    { queueNumber: "A076" },
  ];

  return (
    <div className="flex overflow-y-hidden min-h-screen  bg-[#ffffff] w-full flex-col bg-cover bg-center">
      <div
        style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
        className="flex min-h-[11vh] bg-[#000000] border-b border-[#000000] justify-between w-full items-center px-10"
      >
        <div className="flex gap-6">
          <div className="flex flex-col text-white text-[2.4vh] gap-[2px] ">
            <p className="font-medium">ห้องงานพัฒนาคุณภาพนักศึกษา</p>
            <p className="font-semibold">Student Development Room</p>
          </div>
        </div>
      </div>
      <div className="flex-grow bg-slate-400">
        <div className="flex h-full overflow-hidden">
          <div className="flex bg-teal-400 h-full  w-[70%]  flex-col   ">
            <QueueCallTable queueData={queueData} />
            <div className="h-full px-10 w-full">วิธีรับบัตรคิวพร้อมแจ้งเตือน</div>
          </div>
          <div className="w-[30%]   ">
            <QueueCalledTable calledQueueData={calledQueueData} />
          </div>
        </div>
      </div>
      <div className="flex max-h-[10vh]   py-0  border-[#ffffff] justify-between w-full items-center ">
      
        <div className="flex  items-center justify-center gap-10 bg-[#000000] pr-10  text-end w-[70%]  ">
        <p className="text-white text-[5.2vh] font-medium">{dateTime} </p>
        <p className="text-white text-[5.2vh] font-medium">{time}</p>
         
        </div>{" "}
        <div className="flex items-end justify-end gap-10 bg-[#000000] pr-10  border-l-2 text-end w-[30%]  ">
        <p className="text-yellow-300 text-[5.2vh] font-medium">
            Waiting: 30 Queues
          </p>
        </div>
      </div>
    </div>
  );
}
