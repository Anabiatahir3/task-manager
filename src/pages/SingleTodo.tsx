import React, { useState, useEffect } from "react";
import { useParams, redirect, useNavigate } from "react-router-dom";
import { queryClient, getSingleTodo, editTodo } from "../utils/http";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
const SingleTodo = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => getSingleTodo(+id!),
  });

  const { mutate } = useMutation({
    mutationFn: () => editTodo(+id!, formValues),
    onSuccess: () => {
      toast.success("Todo edited successfully");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      navigate(-1); //moving back one page in history stack
    },
    onError: () => {
      toast.error("Unable to edit Todo");
    },
  });

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    status: "",
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (data) {
      setFormValues({
        name: data.name,
        description: data.description,
        status: data.status,
      });
      setInitialValues({
        name: data.name,
        description: data.description,
        status: data.status,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  function handleSubmit(event: any) {
    event.preventDefault();
    console.log("data", formValues);
    mutate(id, formValues);
  }
  const isFormChanged = () => {
    return (
      formValues.name !== initialValues.name ||
      formValues.description !== initialValues.description ||
      formValues.status !== initialValues.status
    );
  };

  if (isError) {
    return <p>Error loading data</p>;
  }
  if (isLoading) {
    return <p>Retrieving data...</p>;
  }

  if (data) {
    return (
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formValues.name}
            onChange={handleChange}
          />
        </div>
        <div className="control">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={formValues.description}
            onChange={handleChange}
          />
        </div>
        <div className="control">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formValues.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="form-controls">
          <button disabled={!isFormChanged()}>Edit</button>
          <button type="button" onClick={() => setFormValues(initialValues)}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
  return null;
};

export default SingleTodo;

export function loader({ params }) {
  const id = +params.id;
  return queryClient.fetchQuery({
    queryKey: ["todo", params.id],
    queryFn: () => getSingleTodo(id),
  });
}
