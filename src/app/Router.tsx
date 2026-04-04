import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChatPage } from "../features/chat/pages/ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ChatPage />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
