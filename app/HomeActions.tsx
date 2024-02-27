"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const HomeActions = ({ page }: { page?: string }) => {
  const { status, data: session } = useSession();

  return (
    <>
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
            Hello {session.user?.name}
          </h3>
          <p className="text-center mt-3">
            Integrated Page: <strong>{page || "Unknown"}</strong>
          </p>

          <div className="mt-3">
            <button className="btn btn-primary w-full mt-5">
              <Link href="/dashboard">Reply To Messages</Link>
            </button>
            <button className="btn btn-error w-full mt-5">
              <Link href="/api/auth/signout">Delete Integration</Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeActions;
