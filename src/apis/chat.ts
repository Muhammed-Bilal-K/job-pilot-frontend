import Message from "../@types/interfaces/chat/message";
import { Api4 } from "../services/api";
import chatRoutes from "../services/endPoints/chatEndpoints";

interface ICConversation {
  senderId: string,
  recieverId: string,
}

const getHeaders = (token: string) => ({
  headers: {
    Authorization: token,
  },
});

export const listConversation = async (id: string) => {
  try {
    const res = await Api4.get(chatRoutes.listConversation(id));
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getMessagesList = async (id: string) => {
  try {
    const res = await Api4.get(chatRoutes.getMessagesList(id));
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const sendMessageBySeperate = async (message: Message) => {
  try {
    const res = await Api4.post(chatRoutes.sendMessageBySeperate, { ...message } );
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const CreateConversation = async (allData : ICConversation) => {
  try {
    const res = await Api4.post(chatRoutes.CreateConversation,{ ...allData});
    return res.data;
  } catch (error) {
    console.error("Error creating company details:", error);
    throw new Error("Error creating company details:");
  }
};

export const getAllNotification = async (id : string) => {
  try {
    const res = await Api4.get(chatRoutes.getNotification(id));
    return res.data;
  } catch (error) {
    console.error("Error creating company details:", error);
    throw new Error("Error no notification");
  }
};