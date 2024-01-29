import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../Redux/TodoSlice";
import { collection, addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { firestore } from "../service/firebase";

const TodoForm = () => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (taskName.trim() === "" || !status) {
      return; // Prevent adding empty tasks or tasks without a status
    }

    try {
      // Save data to Firebase Firestore
      const docRef = await addDoc(collection(firestore, "tasks"), {
        taskName,
        status,
        created: Timestamp.now(),
      });

      // Dispatch the addTodo action
      dispatch(
        addTodo({
          id: docRef.id,
          taskName,
          status,
        })
      );

      // Show success alert
      setSuccessAlert(true);

      // Clear the input fields after submitting
      setTaskName("");
      setStatus("");
    } catch (error) {
      console.error("Error saving todo:", error);

      // Show error alert
      setErrorAlert(true);
    }
  };

  return (
    <form className="card p-2" onSubmit={handleSubmit}>
      {successAlert && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          Task added successfully!
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setSuccessAlert(false)}
          ></button>
        </div>
      )}
      {errorAlert && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Error adding task. Please try again.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setErrorAlert(false)}
          ></button>
        </div>
      )}
      <div className="d-flex">
        <input
          type="text"
          placeholder="Add a new task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="form-control m-2"
        />
        <select
          onChange={(e) => setStatus(e.target.value)}
          className="form-select m-2"
        >
          <option value="" disabled selected>
            Select Status
          </option>
          <option value="in progress">In Progress</option>
          <option value="in Testing">In Testing</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary" type="submit">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
