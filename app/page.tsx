import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import HomeActions from "./HomeActions";
import { getData } from "./webhook/getData";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    return redirect("/login");
  }

  const page = await getData();

  return (
    <div className="h-screen flex place-items-center justify-center">
      <div className="bg-white p-10 rounded-2xl">
        <HomeActions page={page?.pageName!} />
      </div>
    </div>
  );
}
