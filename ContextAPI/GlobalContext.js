"use client";
import { createContext, useContext, useEffect, useReducer } from "react";

const GlobalContext = createContext();

const initialState = {
  user: null, // Load user from localStorage, or default to null
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      const updatedUser = action.payload;

      localStorage.setItem("user", JSON.stringify(updatedUser));

      return {
        ...state,
        user: updatedUser,
      };
    case "LOGOUT":
      localStorage.removeItem("user");

      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        dispatch({ type: "SET_USER", payload: JSON.parse(storedUser) });
      }
    }
  }, []);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
