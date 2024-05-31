import { FaPlus } from "react-icons/fa";
import { useRef, useEffect } from "react";
const AddTodo: React.FC = () => {
  const title = useRef<HTMLInputElement>(null);
  const desc = useRef<HTMLInputElement>(null);
  useEffect(() => {
    title?.current?.focus();
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(title.current?.value, desc.current?.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" name="title" id="title" ref={title} />

      <label htmlFor="description">Description</label>
      <input type="text" name="description" id="description" ref={desc} />

      <div>
        <button className="flex border-2 shadow-sm w-full justify-center">
          Add
          <div className="mt-1 ml-2">
            <FaPlus />
          </div>
        </button>
        <button>Cancel</button>
      </div>
    </form>
  );
};

export default AddTodo;
