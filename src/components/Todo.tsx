import React from "react";
import { TodoType } from "../types/TodoType";
import { deleteTodo } from "../utils/http";
import { toast } from "react-toastify";

const Todo: React.FC<TodoType> = ({
  id,
  name,
  description,
  status,
  createdAt,
}) => {
  async function handleDelete(id: number) {
    try {
      await deleteTodo(id);
      toast.success("todo deleted successfully");
    } catch (error) {
      toast.error("unable to delete todo");
    }
  }
  return (
    <div className="text-white font-bold bg-gray-500">
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{status}</p>
      <p>{createdAt}</p>

      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
};

export default Todo;
