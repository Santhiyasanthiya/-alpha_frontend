import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(() => {
    // Load username from localStorage if available
    return localStorage.getItem("username") || "";
  });

  // Keep localStorage in sync whenever username changes
  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}

      
    </UserContext.Provider>



  );
};
