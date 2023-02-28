import React, { useContext, useState, useEffect } from "react";
import { authContext } from "context/UserContext";

export const useAppState = () => {
  return useContext(authContext);
};
