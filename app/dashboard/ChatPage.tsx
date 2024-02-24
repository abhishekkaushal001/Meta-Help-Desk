import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiMenuAlt1 } from "react-icons/hi";
import { MdRefresh } from "react-icons/md";

const ChatPage = () => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-5 w-full">
      <div className="col-span-1 bg-white pb-5">
        <div className="flex align-middle justify-between px-3 py-4 border-b-[0.5px] border-gray-200">
          <div className="flex align-middle">
            <span className="my-auto">
              <HiMenuAlt1 className="w-5 h-5 text-gray-400" />
            </span>
            <h2 className="font-bold text-xl pl-3">Conversations</h2>
          </div>
          <span className="my-auto">
            <Link href="" onClick={() => router.refresh()}>
              {<MdRefresh className="w-6 h-6 text-gray-700" />}
            </Link>
          </span>
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
  );
};

export default ChatPage;
