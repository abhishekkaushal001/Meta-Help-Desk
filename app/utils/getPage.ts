import prisma from "@/prisma/client";
import { getData } from "../api/webhook/getData";

const getPage = async (email: string) => {
  const page = await prisma.pageData.findFirst({
    where: {
      userEmail: email,
    },
  });

  if (!page) {
    const pageData = await getData(email);
    return pageData;
  }

  return page;
};

export default getPage;
