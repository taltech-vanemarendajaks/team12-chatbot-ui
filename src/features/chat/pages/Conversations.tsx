import type { Conversation } from "@/app/models/Conversation";
import { useEffect, useState } from "react"
import { getAllConversations, getMessagesByConversationId, postConversation, postMessage } from "../api/chatApi";

export default function Conversations() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState(0);
  const [messages, setMessages] = useState<any[]>([]); // TODO - message model
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const dbConversations = await getAllConversations();
        setConversations(dbConversations);
        setStatus("");
      } catch {
        setStatus("Error while getting conversations");
      }
    };

    loadConversations();
  }, []);

  const addConversation = async() => {
    const newConversation = await postConversation(title);
    setConversations([...conversations, newConversation]);
    setTitle("");
  }

  const getConversationMessages = async(conversationId: number) => {
    setActiveConversation(conversationId);
    try {
      const dbMessages = await getMessagesByConversationId(conversationId);
      setMessages(dbMessages);
      setStatus("");
    } catch {
      setStatus("Error while getting conversations");
    }
  }

  const addMessage = async() => {
    const newMessage = await postMessage(activeConversation, "USER", message, );
    setMessages([...messages, newMessage]);
    setMessage("");
  }

  if (status === "Loading...") {
    return (<div>Loading...</div>)
  }

  return (
    <div>
      <label>Conversation title</label> <br />
      <input className="conversation-input" value={title} placeholder="Conversation title" onChange={(e) => setTitle(e.target.value)} type="text" /> <br />
      <button className="conversation-btn" disabled={title === ""} onClick={addConversation}>Add conversation</button>

      <br /><br />

      {conversations.map(conversation => 
        <button 
          key={conversation.id} 
          className={conversation.active ? "active-conversation-btn" : "inactive-conversation-btn"} 
          onClick={() => getConversationMessages(conversation.id)}
          >
          <span className={conversation.id === activeConversation ? "current-conversation" : undefined}>{conversation.title}</span>
          <span> ({conversation.messages ? conversation.messages.length : 0})</span>
        </button>
      )}

      {messages.map(message => 
        <div>
          {JSON.stringify(message)}
        </div>
      )}

      {activeConversation > 0 &&
      <div>
        <label>What do you want to ask</label> <br />
        <input className="conversation-input" value={message} placeholder="Message" onChange={(e) => setMessage(e.target.value)} type="text" /> <br />
        <button className="conversation-btn" disabled={message === ""} onClick={addMessage}>Ask</button> <br />
      </div>}

    </div>
  )
}
