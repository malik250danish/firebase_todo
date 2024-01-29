// Redux/TodoSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { firestore } from "../service/firebase";
import { getDocs } from "firebase/firestore";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      // Add a todo to the state
      state.push(action.payload);
    },
    setTodos: (state, action) => {
      // Set todos from Firebase data
      return action.payload; // Assuming payload is an array of todos
    },
    deleteTodo: (state, action) => {
      // Delete a todo from the state
      return state.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, updatedTodo } = action.payload;
      const existingTodoIndex = state.findIndex((todo) => todo.id === id);
      if (existingTodoIndex !== -1) {
        state[existingTodoIndex] = {
          ...state[existingTodoIndex],
          ...updatedTodo,
        };
      }
    },

    // Add other reducers as needed
  },
});

export const { addTodo, setTodos, deleteTodo, updateTodo } = todoSlice.actions;

// Asynchronous action creator to fetch data from Firebase
export const fetchData = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "tasks"));
    const todos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setTodos(todos));
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};
// Asynchronous action creator to delete a todo from Firebase
export const deleteTodoAsync = (todoId) => async (dispatch) => {
  try {
    const todoRef = doc(collection(firestore, "tasks"), todoId);
    await deleteDoc(todoRef);
    dispatch(deleteTodo(todoId));
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};
// Asynchronous action creator to edit/update a todo in Firebase
export const editTodoAsync = (todoId, updatedTodo) => async (dispatch) => {
  try {
    const todoRef = doc(collection(firestore, "tasks"), todoId);
    await updateDoc(todoRef, updatedTodo);
    dispatch(updateTodo({ id: todoId, updatedTodo }));
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};
export default todoSlice.reducer;
