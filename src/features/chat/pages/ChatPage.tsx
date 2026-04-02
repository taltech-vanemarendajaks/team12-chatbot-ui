import { useEffect, useState } from "react";
import { getUsers } from "../api/chatApi";
import Conversations from "./Conversations";

export default function ChatPage() {
 const [status, setStatus] = useState("Connecting...");
// Happy path: Show connection status based on API call to getUsers. If successful, show "Connected". If it fails, show "Backend not available".
  useEffect(() => {
    const loadUsers = async () => {
      try {
        await getUsers();
        setStatus("Connected");
      } catch {
        setStatus("Backend not available");
      }
    };

    loadUsers();
  }, []);

  return (
    <div>
      ChatPage - to be implemented. Connection to db: {status} 

      <Conversations/>
    </div>);
}
