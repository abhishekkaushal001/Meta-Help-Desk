import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import axios from "axios";
import { IoIosCloudCircle } from "react-icons/io";
import { GoStack } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { GrLineChart } from "react-icons/gr";
import { HiMenuAlt1 } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

interface PageDataType {
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

  const getUser = async () => {
    const user = await prisma?.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });
    return user;
  };

  const getAccesstoken = async () => {
    const user = await getUser();

    const accountData = await prisma?.account.findMany({});
    const userAccount = accountData?.find((acc) => acc.userId === user?.id);

    return userAccount?.access_token;
  };

  const pageData = async () => {
    try {
      const res = await axios.get<PageDataType>(
        `https://graph.facebook.com/v19.0/me/accounts?access_token=${await getAccesstoken()}`
      );

      process.env.PAGE_ACCESS_TOKEN = res.data.data[0].access_token;
      process.env.PAGE_ID = res.data.data[0].id;

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const user = await getUser();
  const pages = await pageData();

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