import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getData } from "./getData";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  let body = await req.json();

  // Check the webhook event is from a Page subscription
  if (body.object === "page") {
    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function (entry: any) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event?.sender?.id;
      console.log("Sender PSID: " + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
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

// Handles messages events
function handleMessage(sender_psid: any, received_message: any) {
  let response;

  // Check if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message
    response = {
      text: `You sent the message: "${received_message.text}". Now send me an image!`,
    };
  } else if (received_message.attachments) {
    // Gets the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Is this the right picture?",
              subtitle: "Tap a button to answer.",
              image_url: attachment_url,
              buttons: [
                {
                  type: "postback",
                  title: "Yes!",
                  payload: "yes",
                },
                {
                  type: "postback",
                  title: "No!",
                  payload: "no",
                },
              ],
            },
          ],
        },
      },
    };
  }

  // Sends the response message
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid: any, received_postback: any) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === "yes") {
    response = { text: "Thanks!" };
  } else if (payload === "no") {
    response = { text: "Oops, try sending another image." };
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
async function callSendAPI(sender_psid: any, response: any) {
  // check for the session to send message.
  const session = await getServerSession();
  if (!session) {
    return;
  }

  // Construct the message body
  let request_body = {
    recipient: {
      id: parseInt(sender_psid),
    },
    message: response,
  };

  // Get the Page Access Token
  const pageData = await getData();
  const accessToken = pageData?.data[0].access_token;
  console.log(accessToken);

  // Send the HTTP request to the Messenger Platform
  axios
    .post(`https://graph.facebook.com/v19.0/me/messages`, request_body, {
      params: { access_token: accessToken },
    })
    .then(() => console.log("message sent!"))
    .catch((err) => console.error("Unable to send message:" + err));

  // request(
  //   {
  //     uri: "https://graph.facebook.com/v19.0/me/messages",
  //     qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
  //     method: "POST",
  //     json: request_body,
  //   },
  //   (err, res, body) => {
  //     if (!err) {
  //       console.log("message sent!");
  //     } else {
  //       console.error("Unable to send message:" + err);
  //     }
  //   }
  // );
}
