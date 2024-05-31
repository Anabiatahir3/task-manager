import { FaPlus } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";

type Todo = {
  title: string;
  description: string;
};
const AddTodo: React.FC = () => {
  const [todo, setTodo] = useState<Todo>({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const title = useRef<HTMLInputElement>(null);
  useEffect(() => {
    title?.current?.focus();
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo.title.trim() === "") {
      setError("Title cant be empty");
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setTodo({ title: "", description: "" }); // can directly mutate state now
  };
  const handleCancel = () => {
    setTodo({ title: "", description: "" }); // can directly mutate state now
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name == "title") {
      setError("");
    }
    setTodo((prev) => ({
      ...prev, //spread operator to create a shallow copy of the object so as to not mutate the state directly rather set a new object)approach used for arrays and strings due to stored by reference)
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        ref={title}
        value={todo.title}
        onChange={handleInputChange}
      />
      {error && <p className="text-red-500">{error}</p>}
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={todo.description}
        onChange={handleInputChange}
      />

      <div>
        <button
          disabled={loading}
          className="flex border-2 shadow-sm w-full justify-center"
        >
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
