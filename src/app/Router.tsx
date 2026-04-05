import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ChatPage from "../features/chat/pages/ChatPage";
import AdminLayout from "../features/admin/layout/AdminLayout";
import StampAnswersPage from "../features/admin/pages/StampAnswersPage";
import BannedWordsPage from "@/features/banned-words/pages/BannedWordsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ChatPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/chatbot" replace />,
      },
      {
        path: "chatbot",
        element: <div>BossBot - Tuleb varsti</div>,
      },
      {
        path: "stamp-answers",
        element: <StampAnswersPage />,
      },
      {
        path: "banned-words",
        element: <BannedWordsPage />,
      },
      {
        path: "documents",
        element: <div>Dokumendid - Tuleb varsti</div>,
      },
      {
        path: "users",
        element: <div>Kasutajad - Tuleb varsti</div>,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;