import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatPage from "../features/chat/pages/ChatPage";
import BannedWordsPage from "@/features/banned-words/pages/BannedWordsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ChatPage />,
  },
  {
    path: "/banned-words",
    element: <BannedWordsPage />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
