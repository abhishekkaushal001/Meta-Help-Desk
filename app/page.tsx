import { getServerSession } from "next-auth";
import HomeActions from "./HomeActions";
import getPage from "./utils/getPage";

export default async function Home() {
  const session = await getServerSession();

  let page;
  if (session) {
    page = await getPage(session.user?.email!);
  }

  return (
    <div className="h-screen flex place-items-center justify-center">
      <div className="bg-white p-10 rounded-2xl">
        <HomeActions page={page?.pageName!} />
      </div>
    </div>
  );
}
