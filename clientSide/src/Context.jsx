import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [post, setPost] = useState([]);

  return (
    <AppContext.Provider value={{ post, setPost }}>
      {children}
    </AppContext.Provider>
  );
};

export const usePost = () => {
  return useContext(AppContext);
};
