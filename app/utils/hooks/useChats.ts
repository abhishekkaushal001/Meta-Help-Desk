import { PageData } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Chat {
  data: [
    {
      participants: {
        data: [
          {
            name: string;
            email: string;
            id: string;
          }
        ];
      };
      messages: {
        data: [
          {
            id: string;
            from: {
              name: string;
              email: string;
              id: string;
            };
            to: {
              data: [
                {
                  name: string;
                  email: string;
                  id: string;
                }
              ];
            };
            message: string;
          }
        ];
        paging: {
          cursors: {
            before: string;
            after: string;
          };
        };
      };
      id: string;
    }
  ];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
  };
}

const useChats = (page: PageData) => {
  return useQuery<Chat, Error>({
    queryKey: ["chats"],
    queryFn: () =>
      axios
        .get<Chat>(
          `https://graph.facebook.com/v19.0/${page.pageId}/conversations`,
          {
            params: {
              fields: "participants,messages{id,from,to,message}",
              access_token: page.pageAccessToken,
            },
          }
        )
        .then((res) => res.data),
  });
};

export default useChats;
