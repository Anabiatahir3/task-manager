import { FaPlus } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createTodo } from "../utils/http";
import { queryClient } from "../utils/http";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const inputStyle =
  "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
const labelStyle = "block text-sm font-medium text-gray-700";

type Todo = {
  name: string;
  description: string;
};

const AddTodo: React.FC = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState<Todo>({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef?.current?.focus();
  }, []);

  const { mutate, error: mutationError } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo added successfully");
      setTodo({ name: "", description: "" }); // Clear the form only on success
      setLoading(false);
      setTimeout(() => {
        navigate("/active");
      }, 1000);
    },
    onError: () => {
      toast.error("An error occurred. Retry adding todo!");
      setLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todo.name.trim() === "") {
      setError("Title can't be empty");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    mutate({ name: todo.name, description: todo.description });
  };

  const handleCancel = () => {
    setTodo({ name: "", description: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setError(null);
    }
    setTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full w-1/3">
      <label className={labelStyle} htmlFor="name">
        Title
      </label>
      <input
        type="text"
        name="name"
        id="name"
        ref={nameRef}
        value={todo.name}
        onChange={handleInputChange}
        className={inputStyle}
      />
      {error && <span className="text-red-500">{error}</span>}
      <label className={labelStyle} htmlFor="description">
        Description
      </label>
      <input
        type="text"
        name="description"
        id="description"
        value={todo.description}
        onChange={handleInputChange}
        className={inputStyle}
      />

      <div className="flex justify-center m-3">
        <button disabled={loading} className="flex justify-center mr-4">
          {loading ? "Adding.." : "Add"}
          <div className="mt-1 ml-2">{!loading && <FaPlus />}</div>
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
