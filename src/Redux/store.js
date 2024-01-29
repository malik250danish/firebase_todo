// store.js
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../Redux/TodoSlice";

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;
