"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex place-items-center justify-center">
      <div className="bg-white p-10 rounded-2xl">
        <h2 className="font-bold px-12 mt-3">Facebook Page Integration</h2>
        <button className="btn btn-primary px-8 w-full mt-10">
          <Link href="/">Connect Page</Link>
        </button>
      </div>
    </div>
  );
}
