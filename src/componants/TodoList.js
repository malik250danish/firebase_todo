import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../Redux/TodoSlice";
import { firestore } from "../service/firebase";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        await dispatch(fetchData());
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [dispatch]);

  return (
    <div className="card table-responsive my-2 px-2">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          ) : (
            todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
