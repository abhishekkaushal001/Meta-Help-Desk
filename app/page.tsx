"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { status, data: session } = useSession();

  return (
    <div className="h-screen flex place-items-center justify-center">
      <div className="bg-white p-10 rounded-2xl">
        {status === "loading" && (
          <span className="loading loading-dots loading-lg"></span>
        )}

        {status === "unauthenticated" && (
          <div className="">
            <h2 className="font-bold px-12 mt-3">Facebook Page Integration</h2>
            <button className="btn btn-primary px-8 w-full mt-10">
              <Link href="/api/auth/signin">Connect Facebook Page</Link>
            </button>
          </div>
        )}

        {status === "authenticated" && (
          <div className="">
            <h3 className="text-center font-bold mt-3 text-xl">
              Hello {session.user?.name} !!
            </h3>
            <div className="mt-5">
              <button className="btn btn-primary w-full mt-5">
                <Link href={``}>Reply To Messages</Link>
              </button>
              <button className="btn btn-error w-full mt-5">
                <Link href="/api/auth/signout">Delete Integration</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
