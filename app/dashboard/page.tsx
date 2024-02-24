import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../utils/authOptions";
import { getData } from "../webhook/getData";
import Dashboard from "./Dashboard";
import prisma from "@/prisma/client";

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

  const page = await prisma.pageData.findMany({
    where: {
      userEmail: session.user?.email!,
    },
  });

  let pageData;
  if (page.length === 0) {
    pageData = await getData();
  }

  return <Dashboard page={page.length === 0 ? pageData! : page[0]} />;
};

export default AgentDashboardPage;
