import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface hook {
  sender: { id: string };
  recipient: { id: string };
  timestamp: number;
  message: {
    mid: string;
    text: string;
  };
  postback: { payload: string };
}

export async function POST(req: NextRequest) {
  let body = await req.json();

  // Check the webhook event is from a Page subscription
  if (body.object === "page") {
    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(async function (entry: any) {
      // Gets the body of the webhook event
      let webhook_event: hook = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event?.sender?.id;
      console.log("Sender PSID: " + sender_psid);

      // Saves the Chat data to database.
      const chat = await prisma.chatData.create({
        data: {
          pageId: webhook_event.recipient.id,
          senderId: webhook_event.sender.id,
          sendBy: "USER",
          message: webhook_event.message.text,
        },
      });

      console.log(chat);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function

      // if (webhook_event.message) {
      //   handleMessage(sender_psid, webhook_event.message);
      // } else if (webhook_event.postback) {
      //   handlePostback(sender_psid, webhook_event.postback);
      // }
    });

    // Return a '200 OK' response to all events
    return NextResponse.json("EVENT_RECEIVED", { status: 200 });
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    return NextResponse.json("", { status: 404 });
  }
}

export async function GET(req: NextRequest) {
  // Parse the query params
  let mode = req.nextUrl.searchParams.get("hub.mode");
  let token = req.nextUrl.searchParams.get("hub.verify_token");
  let challenge = req.nextUrl.searchParams.get("hub.challenge");

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === process.env.MY_VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      const challengeInt = parseInt(challenge!);

      // console.log(challengeInt, typeof challengeInt);

      return NextResponse.json(challengeInt, { status: 200 });
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      return NextResponse.json("", { status: 403 });
    }
  }
}
