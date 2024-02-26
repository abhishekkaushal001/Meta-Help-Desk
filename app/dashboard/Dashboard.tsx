"use client";

import { PageData } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import { GoStack } from "react-icons/go";
import { GrLineChart } from "react-icons/gr";
import { IoIosCloudCircle } from "react-icons/io";
import ChatPage from "./ChatPage";
import DashboardBlankPage from "./DashboardBlankPage";

const Dashboard = ({ page }: { page: PageData }) => {
  const [showChats, setShowChats] = useState(false);

  return (
    <div className="h-screen w-full flex">
      <aside className="h-full bg-transparent w-fit flex flex-col justify-between">
        <div className="flex flex-col">
          <Link href="">
            <div className="p-7 hover:bg-sky-600">
              <IoIosCloudCircle className="w-7 h-7 text-white" />
            </div>
          </Link>
          <Link href="" onClick={() => setShowChats(!showChats)}>
            <div className="p-7 hover:bg-sky-600">
              <GoStack className="w-6 h-6 text-white" />
            </div>
          </Link>
          <Link href="">
            <div className="p-7 hover:bg-sky-600">
              <FaUsers className="w-6 h-6 text-white" />
            </div>
          </Link>
          <Link href="">
            <div className="p-7 hover:bg-sky-600">
              <GrLineChart className="w-6 h-6 text-white" />
            </div>
          </Link>
        </div>

        <Link href="/">
          <div className="rounded-full overflow-hidden bg-white w-fit mx-auto p-2 my-5">
            <FaUser className="w-5 h-5 text-gray-600" />
          </div>
        </Link>
      </aside>

      {!showChats && <DashboardBlankPage page={page} />}

      {showChats && <ChatPage page={page} />}
    </div>
  );
};

export default Dashboard;
