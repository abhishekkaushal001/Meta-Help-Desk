import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import HomeActions from "./HomeActions";
import { getData } from "./api/webhook/getData";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    return redirect("/login");
  }

  let page = await prisma.pageData.findMany({
    where: {
      userEmail: session.user?.email!,
    },
  });

  let pageData;
  if (page.length === 0) {
    pageData = await getData();
  }

  return (
    <div className="h-screen flex place-items-center justify-center">
      <div className="bg-white p-10 rounded-2xl">
        <HomeActions
          page={page.length === 0 ? pageData?.pageName! : page[0].pageName!}
        />
      </div>
    </div>
  );
}
