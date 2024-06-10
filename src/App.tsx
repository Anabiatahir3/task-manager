import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import RootLayout from "./pages/RootLayout";
import Signup from "./pages/Signup";
import Active from "./pages/Active";
import Completed from "./pages/Completed";
import Users from "./pages/Users";
import AddTodo from "./pages/AddTodo";
import SingleTodo, { loader as editeventLoader } from "./pages/SingleTodo";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/http";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./pages/ProtectedRoute";
import RoleProtectedRoute from "./pages/RoleProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "active", element: <Active /> },
      {
        path: "completed",
        element: <Completed />,
      },
      {
        path: "active/:id",
        element: <SingleTodo />,
        loader: editeventLoader,
      },
      {
        path: "completed/:id",
        element: <SingleTodo />,
      },
      {
        path: "users",
        element: (
          <RoleProtectedRoute>
            <Users />
          </RoleProtectedRoute>
        ),
      },
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
