import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getMessages,
  updateMessageStatus,
  deleteMessage,
} from "./messageService";

export default function useMessages() {
  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  async function loadMessages() {
    try {
      setLoading(true);

      const data =
        await getMessages();

      setMessages(data);

    } catch (error) {

      console.error(
        "Failed to load messages:",
        error
      );

      toast.error(
        "Failed to load messages."
      );

    } finally {

      setLoading(false);

    }
  }


  useEffect(() => {
    loadMessages();
  }, []);


  async function markAsRead(id) {
    try {

      await updateMessageStatus(
        id,
        "read"
      );

      setMessages((previous) =>
        previous.map((message) =>
          message.id === id
            ? {
                ...message,
                status: "read",
              }
            : message
        )
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to update message."
      );

    }
  }


  async function markAsUnread(id) {
    try {

      await updateMessageStatus(
        id,
        "unread"
      );

      setMessages((previous) =>
        previous.map((message) =>
          message.id === id
            ? {
                ...message,
                status: "unread",
              }
            : message
        )
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to update message."
      );

    }
  }


  async function removeMessage(id) {
    try {

      await deleteMessage(id);

      setMessages((previous) =>
        previous.filter(
          (message) =>
            message.id !== id
        )
      );

      toast.success(
        "Message deleted."
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to delete message."
      );

      throw error;
    }
  }


  return {
    messages,
    loading,
    markAsRead,
    markAsUnread,
    removeMessage,
    refresh: loadMessages,
  };
}