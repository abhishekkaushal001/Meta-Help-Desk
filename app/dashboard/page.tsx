import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaUser, FaUsers } from "react-icons/fa";
import { GoStack } from "react-icons/go";
import { GrLineChart } from "react-icons/gr";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoIosCloudCircle } from "react-icons/io";
import { authOptions } from "../utils/authOptions";
import { getData } from "../webhook/getData";

export interface PageDataType {
  data: [
    {
      access_token: string;
      category: string;
      category_list: [
        {
          id: string;
          name: string;
        }
      ];
      name: string;
      id: string;
      tasks: string[];
    }
  ];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
  };
}

const AgentDashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const pages = await getData();

  return (
    <div className="h-screen w-full flex">
      <aside className="h-full bg-transparent w-fit flex flex-col justify-between">
        <div className="flex flex-col">
          <Link href="">
            <div className="p-7 hover:bg-sky-600">
              <IoIosCloudCircle className="w-7 h-7 text-white" />
            </div>
          </Link>
          <Link href="">
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

      <div className="grid grid-cols-5 w-full">
        <div className="col-span-1 bg-white pb-5">
          <div className="flex align-middle px-3 py-4 border-b-[0.5px] border-gray-200">
            <span className="my-auto">
              <HiMenuAlt1 className="w-5 h-5 text-gray-400" />
            </span>
            <h2 className="font-bold text-xl pl-3">Conversations</h2>
          </div>

          <div className="flex flex-col">
            <div className="">chats</div>
            <div className="">chats</div>
            <div className="">chats</div>
          </div>
        </div>

        <div className="col-span-3 bg-gray-200 border-[.5px] border-gray-200">
          <div className="flex bg-white align-middle px-3 py-4 border-b-[0.5px] border-gray-300">
            <h2 className="font-bold text-xl pl-3">Sender Name</h2>
          </div>
          chats
        </div>

        <div className="col-span-1 bg-white">user details</div>
      </div>
    </div>
  );
};

export default AgentDashboardPage;
