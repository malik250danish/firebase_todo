import React from "react";
import TodoForm from "../componants/TodoForm";
import TodoList from "../componants/TodoList";

function Home() {
  return (
    <>
      <div className="container p-2">
        <h3 className="text-center my-3">Todo App</h3>
        <TodoForm />
        <TodoList />
      </div>
    </>
  );
}

export default Home;
