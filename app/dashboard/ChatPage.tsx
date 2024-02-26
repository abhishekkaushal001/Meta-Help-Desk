import { PageData } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiMenuAlt1 } from "react-icons/hi";
import { MdRefresh } from "react-icons/md";
import useChats from "../utils/hooks/useChats";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";

const ChatPage = ({ page }: { page: PageData }) => {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [client, setClient] = useState("");

  const { data, isLoading, error, isFetched } = useChats(page);

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
            {isLoading && (
              <span className="loading loading-spinner loading-md"></span>
            )}
            {isFetched && (
              <Link href="" onClick={async () => router.refresh()}>
                {<MdRefresh className="w-6 h-6 text-gray-700" />}
              </Link>
            )}
          </span>
        </div>

        <div className="flex flex-col">
          {data?.data.map((data) => (
            <Link
              key={data.id}
              href=""
              onClick={() => {
                setUser(data.id);
                setClient(data.participants.data[0].id);
              }}
            >
              <div className="py-4 px-3 bg-gray-100 flex flex-col border-y-[1px] border-gray-300">
                <p className="text-base text-gray-900 font-medium pl-1">
                  {data.participants.data[0].name}
                </p>
                <p className="text-xs text-gray-600 pt-1 pl-4">
                  &rarr; {data.messages.data[0].message.slice(0, 20)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="col-span-3 bg-gray-200 border-[.5px] border-gray-200">
        <div className="flex bg-white align-middle px-3 py-4 border-b-[0.5px] border-gray-300">
          {!user && (
            <h2 className="font-bold text-xl pl-3 text-gray-300">Messages</h2>
          )}
          {user && (
            <h2 className="font-bold text-xl pl-3">
              {data?.data.find((d) => d.id === user)?.participants.data[0].name}
            </h2>
          )}
        </div>

        <div className="h-[560px] overflow-y-scroll py-3">
          {data?.data
            .find((d) => d.id === user)
            ?.messages.data.map((msg) => (
              <>
                {msg.from.id === client && (
                  <div className="flex py-3 px-4 align-bottom min-w-fit">
                    <span className="p-2 rounded-full bg-gray-100 mt-auto">
                      <FaUser className="w-5 h-5 text-black" />
                    </span>
                    <div className="chat chat-start pl-2">
                      <div className="chat-bubble min-w-fit">{msg.message}</div>
                    </div>
                  </div>
                )}
                {msg.from.id !== client && (
                  <div className="flex justify-end py-3 px-4 align-bottom min-w-fit">
                    <div className="chat chat-end pr-2">
                      <div className="chat-bubble chat-bubble-primary min-w-fit">
                        {msg.message}
                      </div>
                    </div>
                    <span className="p-2 rounded-full bg-gray-100 mt-auto">
                      <FaUser className="w-5 h-5 text-black" />
                    </span>
                  </div>
                )}
              </>
            ))}
        </div>

        <div className="px-4">
          <input
            type="text"
            placeholder={`Message ${
              data?.data.find((d) => d.id === user)?.participants.data[0].name
            }`}
            className="input input-bordered input-primary w-full"
          />
        </div>
      </div>

      <div className="col-span-1 bg-white">user details</div>
    </div>
  );
};

export default ChatPage;
