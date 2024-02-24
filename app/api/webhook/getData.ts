import prisma from "@/prisma/client";
import axios from "axios";
import { getServerSession } from "next-auth";
import { PageDataType } from "../../dashboard/page";
import { authOptions } from "../../utils/authOptions";

export const getData = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  const accountData = await prisma.account.findMany({});
  const userAccount = accountData?.find((acc) => acc.userId === user?.id);
  const userToken = userAccount?.access_token;

  let data;
  try {
    const res = await axios.get<PageDataType>(
      `https://graph.facebook.com/v19.0/me/accounts?access_token=${userToken}`
    );

    data = res.data;
  } catch (error) {
    console.log(error);
  }

  let page = await prisma.pageData.findFirst({
    where: {
      userId: user?.id,
    },
  });

  if (page) {
    page = await prisma.pageData.update({
      where: {
        id: page.id,
      },
      data: {
        userEmail: user?.email!,
        userAccessToken: userToken,
        pageId: data?.data[0].id,
        pageName: data?.data[0].name,
        pageAccessToken: data?.data[0].access_token,
      },
    });
  } else {
    page = await prisma.pageData.create({
      data: {
        userId: user?.id!,
        userEmail: user?.email!,
        userAccessToken: userToken,
        pageId: data?.data[0].id,
        pageName: data?.data[0].name,
        pageAccessToken: data?.data[0].access_token,
      },
    });
  }

  return page;
};
