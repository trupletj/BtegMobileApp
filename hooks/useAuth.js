import React, { useContext } from "react";
import { authContext } from "context/UserContext";

export const useAuth = () => {
  const ctx = useContext(authContext);
  return { ...ctx };
};
