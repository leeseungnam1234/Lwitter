import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
  useState,
} from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const initialTodos = [];

const todoReducer = (state, action) => {
  switch (action.type) {
    case "LOAD":
      return action.todos;
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(0);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const loadTodos = async () => {
      if (user) {
        const docRef = doc(db, "todoLists", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const loadedTodos = docSnap.data().todos;
          dispatch({ type: "LOAD", todos: loadedTodos });
          nextId.current = loadedTodos.length + 1;
        }
      }
    };

    loadTodos();
  }, [user]);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export default TodoProvider;

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error("Cannot find TodoStateContext");
  }
  return context;
}
export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error("Cannot find TodoDispatchContext");
  }
  return context;
}
export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error("Cannot find TodoNextIdContext");
  }
  return context;
}
