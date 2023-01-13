import React, { useState, useEffect, useContext, createContext } from "react";
import * as api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getSessionFromStorage = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const token = await AsyncStorage.getItem("token");
        if (user && token) {
          setUser(JSON.parse(user));
          setToken(token);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getSessionFromStorage();
  }, []);

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
      setUser(response.data.employee);
      setToken(response.data.token);
      AsyncStorage.setItem("user", JSON.stringify(response.data.employee));
      AsyncStorage.setItem("token", response.data.accessToken);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const loginConfirmCode = async (emp_code, phone, code) => {
    try {
      setIsLoading(true);
      const response = await api.loginConfirmCode(emp_code, phone, code);
      setUser(response.data.user.employee);
      setToken(response.data.token);
      AsyncStorage.setItem("user", JSON.stringify(response.data.user.employee));
      AsyncStorage.setItem("token", response.data.accessToken);
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
      if (!response.data.valid) {
        setUser(null);
        setToken(null);
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("token");
      }
    } catch (error) {
      console.error(error);
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
  };
}
