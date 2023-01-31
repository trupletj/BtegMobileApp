import React, { useContext } from "react";
import { authContext } from "context/UserContext";

export const useAuth = () => {
  return useContext(authContext);
};
