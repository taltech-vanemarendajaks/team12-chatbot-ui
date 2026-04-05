export const userEndpoints = {
    getUsers: "/api/v1/users",
    getUserById: (id: number) => `/api/v1/users/${id}`,
};


export const conversationEndpoints = {
  getAllConversations: "/api/v1/conversations?userId=1", // TODO: PersonId not hard-coded
  postConversation: `/api/v1/conversations?userId=1`, // TODO: PersonId not hard-coded

  // below --> are they needed or should be deleted?
  getAllActiveConversations: "/api/v1/conversations/active?userId=1", // TODO: PersonId not hard-coded
  getConversationById: (id: number) => `/api/v1/conversations/${id}`, //
};

export const messageEndpoints = {
  getMessagesByConversationId: (conversationId: number) => `/api/v1/messages?conversationId=${conversationId}`,
  postMessage: "/api/v1/messages"
};
