import { PageData } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { HiMenuAlt1 } from "react-icons/hi";
import { MdRefresh } from "react-icons/md";
import useChats from "../utils/hooks/useChats";

const ChatPage = ({ page }: { page: PageData }) => {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [client, setClient] = useState("");

  const { data, isLoading, error, isFetched } = useChats(page);

  const getNamechars = (name: string): string => {
    const nameArr = name.split(" ").map((n) => n.charAt(0));
    return nameArr[0] + nameArr[1];
  };

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
              <div
                className={
                  user
                    ? "py-4 px-3 flex flex-col border-y-[1px] border-gray-300 bg-gray-100"
                    : "py-4 px-3 flex flex-col border-y-[1px] border-gray-300  bg-white hover:bg-gray-100"
                }
              >
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

      <div className="col-span-3 bg-stone-200 border-x-[.5px] border-gray-300">
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

        <div className="h-[560px] flex flex-col-reverse overflow-y-scroll py-3 px-2">
          {data?.data
            .find((d) => d.id === user)
            ?.messages.data.map((msg) => (
              <>
                {msg.from.id === client && (
                  <div className="flex py-3 px-4 align-bottom min-w-fit">
                    <span className="p-2 rounded-full bg-gray-800 mt-auto">
                      <FaUser className="w-5 h-5 text-white" />
                    </span>
                    <div className="chat chat-start pl-2">
                      <div className="chat-bubble min-w-fit bg-white text-gray-900 font-medium">
                        {msg.message}
                      </div>
                    </div>
                  </div>
                )}
                {msg.from.id !== client && (
                  <div className="flex justify-end py-3 px-4 align-bottom min-w-fit">
                    <div className="chat chat-end pr-2">
                      <div className="chat-bubble font-medium text-white min-w-fit">
                        {msg.message}
                      </div>
                    </div>
                    <span className="p-2 rounded-full bg-white mt-auto">
                      <FaUser className="w-5 h-5 text-black" />
                    </span>
                  </div>
                )}
              </>
            ))}
        </div>

        <div className="flex px-4">
          <input
            type="text"
            placeholder={
              user
                ? `Message ${
                    data?.data.find((d) => d.id === user)?.participants.data[0]
                      .name
                  }`
                : "Message"
            }
            className="input input-bordered input-primary w-full"
          />
        </div>
      </div>

      <div className="col-span-1 bg-white h-screen overflow-hidden">
        <div className="h-[40%] flex flex-col py-3 w-full place-items-center bg-white bordr-b-[0.5px] border-gray-300">
          {user && (
            <div className="avatar online placeholder mt-7">
              <div className="bg-neutral text-neutral-content rounded-full w-20">
                <span className="text-4xl">
                  {getNamechars(
                    data?.data.find((d) => d.id === user)?.participants.data[0]
                      .name!
                  )}
                </span>
              </div>
            </div>
          )}
          {!user && (
            <div className="avatar placeholder mt-7">
              <div className="bg-gray-100 text-neutral-content rounded-full w-20"></div>
            </div>
          )}
          <div className="">
            {user && (
              <h4 className="text-2xl mt-3 font-medium">
                {
                  data?.data.find((d) => d.id === user)?.participants.data[0]
                    .name
                }
              </h4>
            )}
            {!user && (
              <div className="mt-4 bg-gray-100 w-40 rounded-xl h-8"></div>
            )}
          </div>

          {user && (
            <>
              <div className="mt-1">
                <p className="text-sm font-medium text-gray-400">
                  &#9679; offline
                </p>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <button className="btn btn-sm">Call</button>
                <button className="btn btn-sm">Profile</button>
              </div>
            </>
          )}
        </div>

        <div className="bg-blue-50 h-full px-2 py-4">
          {user && (
            <div className="bg-white rounded-lg p-3 border-[0.5px] border-gray-300">
              <h2 className="font-semibold mb-2">Customer details</h2>
              <div className="flex justify-between text-sm py-1">
                <p className="text-gray-400">Email</p>
                <p className="text-xs w-1/2 text-balance overflow-hidden text-right font-semibold text-gray-800">
                  {data?.data
                    .find((d) => d.id === user)
                    ?.participants.data[0].email.slice(0, 12)}
                  ...
                </p>
              </div>
              <div className="flex justify-between text-sm py-1">
                <p className="text-gray-400">First Name</p>
                <p className="w-1/2 text-balance overflow-hidden text-right font-semibold text-gray-800">
                  {
                    data?.data
                      .find((d) => d.id === user)
                      ?.participants.data[0].name.split(" ")[0]
                  }
                </p>
              </div>
              <div className="flex justify-between text-sm py-1">
                <p className="text-gray-400">Last Name</p>
                <p className="w-1/2 text-balance overflow-hidden text-right font-semibold text-gray-800">
                  {
                    data?.data
                      .find((d) => d.id === user)
                      ?.participants.data[0].name.split(" ")[1]
                  }
                </p>
              </div>
              <Link href="">
                <p className="text-xs font-semibold text-blue-500 pt-2 ">
                  View more details
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
