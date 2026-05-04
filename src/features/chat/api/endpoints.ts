export const userEndpoints = {
    getUsers: "/api/v1/users",
    getUserById: (id: number) => `/api/v1/users/${id}`,
};


export const conversationEndpoints = {
  getAllConversations: "/api/v1/conversations",
  postConversation: `/api/v1/conversations`,

  // below --> are they needed or should be deleted?
  getAllActiveConversations: "/api/v1/conversations/active",
  getConversationById: (id: number) => `/api/v1/conversations/${id}`,
};

export const messageEndpoints = {
  getMessagesByConversationId: (conversationId: number) => `/api/v1/messages?conversationId=${conversationId}`,
  postMessage: "/api/v1/messages"
};