// components/TodoList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../Redux/TodoSlice";
import { firestore } from "../service/firebase";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch todos from Firebase
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="card table-responsive my-2 px-2">
      <table className="table table-striped table-bordered">
        <thead>
          <th>Task Name</th>
          <th>Status</th>
          <th>Action</th>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
