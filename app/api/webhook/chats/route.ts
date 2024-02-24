import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const chat = await prisma.chatData.create({
    data: {
      senderId: data.senderId,
      pageId: data.pageId,
      sendBy: "USER",
      message: data.message,
    },
  });

  return NextResponse.json({ chat });
}
