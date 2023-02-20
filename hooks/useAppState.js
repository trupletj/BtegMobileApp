import React, { useContext, useState, useEffect } from "react";
import { authContext } from "context/UserContext";

export const useAppState = () => {
  const { services, categories, progress, isAppReady, setIsAppReady } =
    useContext(authContext);

  return { services, categories, progress, isAppReady, setIsAppReady };
};
