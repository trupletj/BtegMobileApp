import React, { useState, useEffect, useContext, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetwork } from "hooks/useNetwork";
import * as api from "./api";

export const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isConnected = useNetwork();
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  useEffect(() => {
    const getSessionFromStorage = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const token = await AsyncStorage.getItem("token");
        if (user && token) {
          setUser(JSON.parse(user));
          setToken(token);
          if (isConnected) {
            checkSession();
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    const checkIfHasLoggedIn = async () => {
      try {
        const value = await AsyncStorage.getItem("hasLoggedInKey");
        if (value === null) {
          setHasLoggedIn(false);
        } else {
          setHasLoggedIn(true);
        }
      } catch (error) {
        console.log("Error getting data from storage: ", error);
      }
    };
    getSessionFromStorage();
    // checkIfHasLoggedIn();
  }, []);

  useEffect(() => {
    const checkSessionInterval = setInterval(() => {
      if (token && user && isConnected) checkSession();
    }, 1000 * 60 * 30); // check session every minute
    return () => clearInterval(checkSessionInterval);
  }, [user, token]);

  const loginWithPhone = async (emp_code, phone) => {
    try {
      setIsLoading(true);
      const response = await api.loginWithPhone(emp_code, phone);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await api.loginWithEmail(email, password);

      debugger;
      setUser(response.data.employee);
      setToken(response.data.accessToken);
      await AsyncStorage.setItem(
        "user",
        JSON.stringify(response.data.employee)
      );
      await AsyncStorage.setItem("token", response.data.accessToken);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(
        "eroooooooooooooooooooooooooooooooooooooooooooooooor",
        error
      );
    }
  };

  const loginConfirmCode = async (emp_code, phone, code) => {
    try {
      setIsLoading(true);
      const response = await api.loginConfirmCode(emp_code, phone, code);
      setUser(response.data.user.employee);
      setToken(response.data.token);
      await AsyncStorage.setItem(
        "user",
        JSON.stringify(response.data.user.employee)
      );
      await AsyncStorage.setItem("token", response.data.token);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      setIsLoading(true);
      await api.logOut();
      setUser(null);
      setToken(null);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const checkSession = async () => {
    try {
      const response = await api.checkSession(token);
      console.log("==status==", response.status);
      if (response.status !== 200) {
        logOut();
      }
    } catch (error) {
      console.error("check session error", error);
    }
  };

  return {
    user,
    token,
    isLoading,
    loginWithPhone,
    loginWithEmail,
    loginConfirmCode,
    logOut,
    checkSession,
    hasLoggedIn,
  };
}
