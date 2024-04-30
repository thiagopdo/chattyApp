import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext.jsx";
import { baseUrl, getRequest } from "../utils/services.js";

function useFetchLatestMessage(chat) {
  const { newMessage, notifications } = useContext(ChatContext);
  const [lastestMessage, setLastestMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);

      if (response.error) {
        return console.log("Error", error);
      }

      //getting last message
      const lastMessage = response[response?.length - 1];
      setLastestMessage(lastMessage);
    };

    getMessages();
  }, [chat?._id, newMessage, notifications]);

  return { lastestMessage };
}

export default useFetchLatestMessage;
