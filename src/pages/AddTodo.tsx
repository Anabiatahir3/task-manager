import { FaPlus } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";

const inputStyle =
  "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
const labelStyle = "block text-sm font-medium text-gray-700";

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
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setTodo({ title: "", description: "" }); // can directly mutate state now as this will not cause any problem for us
  };
  const handleCancel = () => {
    setTodo({ title: "", description: "" });
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
    <form onSubmit={handleSubmit} className="flex flex-col h-full w-1/3">
      <label className={labelStyle} htmlFor="title">
        Title
      </label>
      <input
        type="text"
        name="title"
        id="title"
        ref={title}
        value={todo.title}
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
