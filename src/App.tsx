import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import RootLayout from "./pages/RootLayout";
import Signup from "./pages/Signup";
import Active from "./pages/Active";
import Completed from "./pages/Completed";
import Users from "./pages/Users";
import AddTodo from "./pages/AddTodo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "active", element: <Active /> },
      { path: "completed", element: <Completed /> },
      { path: "users", element: <Users /> },
      { path: "add", element: <AddTodo /> },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);
const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
