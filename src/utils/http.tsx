import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();
import api from "./helper/ApiConstants";

export async function signupApi(formData: Record<string, any>, method: string) {
  //let url = import.meta.env.VITE_BASE_URL;    // not working idky
  const response = await fetch(`http://localhost:3000/auth/${method}`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const message = await response.json();
    const error = new Error(message.message);
    throw error;
  }

  const { access_token, refresh_token, expiresIn } = await response.json();
  localStorage.setItem("access_token", access_token);
  //localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem("expiresIn", expiresIn);
}

export const logoutUser = async () => {
  try {
    const response = await api.get("/auth/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};
//while getting todos have to set the query parameters as completed or active
export async function getTodos(status: string) {
  try {
    const response = await api.get(`/todo/all?status=${status}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function createTodo(data: any) {
  try {
    const response = await api.post("/todo", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getSingleTodo(id: number) {
  try {
    const response = await api.get(`/todo/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function editTodo(id: number, data: any) {
  try {
    const response = await api.patch(`/todo/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function deleteTodo(id: number) {
  try {
    const response = await api.delete(`/todo/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
