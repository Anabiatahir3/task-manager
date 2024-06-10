import { AuthContext } from "../store/authContext";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../utils/http";
import { toast } from "react-toastify";
import Todo from "../components/Todo";
import { TodoType } from "../types/TodoType";
import { Link } from "react-router-dom";

const Active: React.FC = () => {
  const queryParam = "active";
  const {
    data = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["todos", queryParam],
    queryFn: () => getTodos(queryParam), // Corrected this line
  });

  if (isError) {
    return (
      <>
        <p>Error</p>
      </>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data.length === 0) {
    return <p>No active todos</p>;
  }

  return (
    <ul>
      {data.map((item: TodoType) => (
        <li key={item.id} className="mb-4 p-2">
          <Link to={`${item.id}`}>
            <Todo {...item} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Active;
