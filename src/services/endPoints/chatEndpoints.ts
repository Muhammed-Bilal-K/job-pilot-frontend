const ChatRoute = {
  listConversation: (userId: string) =>
    `/api/v5/chat/conversation/user/${userId}`,
  getMessagesList: (id: string) => `/api/v5/chat/message/${id}`,
  sendMessageBySeperate: "/api/v5/chat/message/create",
  CreateConversation: "/api/v5/chat/conversation/create",
  getNotification: (id: string) =>
    `/api/v5/chat/notification/get-messages/${id}`,
  makeJobAppliedStatus : '/api/v5/chat/notification/create-message/',
};

export default ChatRoute;
