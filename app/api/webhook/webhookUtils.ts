import axios from "axios";

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
  // Construct the message body
  let request_body = {
    recipient: {
      id: parseInt(sender_psid),
    },
    message: response,
  };

  // Get the Page Access Token
  const accessToken = process.env.PAGE_ACCESS_TOKEN;
  console.log(accessToken, "TOEKN");

  // Send the HTTP request to the Messenger Platform
  axios
    .post(`https://graph.facebook.com/v19.0/me/messages`, request_body, {
      params: { access_token: accessToken },
    })
    .then(() => console.log("message sent!"))
    .catch((err) => console.error("Unable to send message:" + err));
}
