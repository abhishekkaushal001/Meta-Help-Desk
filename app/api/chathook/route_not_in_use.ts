import { authOptions } from "@/app/utils/authOptions";
import prisma from "@/prisma/client";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect("/login", { status: 400 });
  }

  const page = await prisma.pageData.findFirst({
    where: {
      userEmail: session.user?.email!,
    },
  });

  const chats = await prisma.chatData.findMany({
    where: {
      pageId: page?.pageId!,
    },
  });

  return NextResponse.json(chats);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect("/login", { status: 400 });
  }

  const data = await req.json();
  const page = await prisma.pageData.findFirst({
    where: {
      userEmail: session.user?.email!,
    },
  });

  const response = {
    text: data.message,
  };

  const success = await callSendAPI(
    data.senderId,
    response,
    page?.pageAccessToken!
  );

  if (!success) {
    return NextResponse.json({ error: "Message falied." }, { status: 500 });
  }

  await prisma.chatData.create({
    data: {
      senderId: page?.pageId!,
      pageId: page?.pageId!,
      sendBy: "ME",
      message: data.message,
    },
  });

  return NextResponse.json({});
}

async function callSendAPI(
  sender_psid: any,
  response: any,
  accessToken: string
) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: parseInt(sender_psid),
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  return axios
    .post(`https://graph.facebook.com/v19.0/me/messages`, request_body, {
      params: { access_token: accessToken },
    })
    .then(() => {
      console.log("message sent!");
      return true;
    })
    .catch((err) => {
      console.error("Unable to send message:" + err);
      return false;
    });
}
