import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_BASE_URL } from "@env";

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
      const response = await axios.post(
        `${REACT_APP_BASE_URL}/sms/sendloginsms`,
        { emp_code, phone }
      );
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
      const response = await axios.post(
        `${REACT_APP_BASE_URL}/api/auth/login`,
        { email, password }
      );
      setUser(response.data.employee);
      setToken(response.data.token);
      AsyncStorage.setItem("user", JSON.stringify(response.data.employee));
      AsyncStorage.setItem("token", response.data.token);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const loginConfirmCode = async (emp_code, phone, code) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${REACT_APP_BASE_URL}/sms/login/phone`,
        { emp_code, phone, code }
      );
      setUser(response.data.user.employee);
      setToken(response.data.token);
      AsyncStorage.setItem("user", JSON.stringify(response.data.user.employee));
      AsyncStorage.setItem("token", response.data.token);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
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
      const response = await axios.get(
        `${REACT_APP_BASE_URL}/api/auth/me?is_mobile=2`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
