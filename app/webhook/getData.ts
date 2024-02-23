import axios from "axios";
import { getServerSession } from "next-auth";
import { PageDataType } from "../dashboard/page";
import { authOptions } from "../utils/authOptions";
import prisma from "@/prisma/client";

export const getData = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return;

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

  const page = await pageData();

  return page;
};
