import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import axios from "axios";

const AgentDashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const getAccesstoken = async () => {
    const user = await prisma?.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });

    const accountData = await prisma?.account.findMany({});
    const userAccount = accountData?.find((acc) => acc.userId === user?.id);

    return userAccount?.access_token;
  };

  const pageData = async () => {
    try {
      const res = await axios.get(
        `https://graph.facebook.com/me/accounts?access_token=${await getAccesstoken()}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const data = await pageData();

  return (
    <div className="h-screen flex place-items-center justify-center">
      <div className="bg-white rounded-2xl p-12 max-w-[70%] text-wrap">
        {JSON.stringify(data)}
      </div>
    </div>
  );
};

export default AgentDashboardPage;
