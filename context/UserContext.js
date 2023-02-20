import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as api from "./api";
import axios from "axios";

//notifications
import { useNotifications } from "../hooks/useNotifications";
import globals from "constants/globals";

const data = globals.DATA;

export const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isAppReady, setIsAppReady] = useState(false);
  const { expoPushToken, notification } = useNotifications();

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("ERRRRRRRRRRRRRRRRRRRRRRRRRRROR", error);
      const code = error.response.status;
      switch (code) {
        case 401:
          logOut();
      }
      // Add your error handling logic here
      // For example, you can show an error message to the user or redirect them to a specific page

      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const progressValue =
      (services.length > 0 ? 0.25 : 0) +
      (categories.length > 0 ? 0.25 : 0) +
      (user ? 0.5 : 0);
    setProgress(progressValue);
    // if (progressValue >= 1) {
    //   setIsAppReady(true);
    // }
  }, [services, categories, user]);

  useEffect(() => {
    const getSessionFromStorage = async () => {
      try {
        const [user, token, services, categories] = await Promise.all([
          AsyncStorage.getItem("user"),
          AsyncStorage.getItem("token"),
          AsyncStorage.getItem("services"),
          AsyncStorage.getItem("categories"),
        ]);
        if (user && token) {
          setUser(JSON.parse(user));

          setToken(token);
        }
        if (services && categories) {
          setServices(JSON.parse(services));
          setCategories(JSON.parse(categories));
        } else {
          await getServices(data, token);
          await getCategories(data, token);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getSessionFromStorage();
  }, []);

  // useEffect(() => {
  //   const checkSessionInterval = setInterval(() => {
  //     if (token && user) checkSession();
  //   }, 1000 * 60 * 30); // check session every minute
  //   return () => clearInterval(checkSessionInterval);
  // }, [user, token]);

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
    setIsLoading(true);
    try {
      const response = await api.loginWithEmail(email, password, expoPushToken);
      if (response.data.employee && response.data.accessToken) {
        setUser(response.data.employee);
        setToken(response.data.accessToken);
        await AsyncStorage.setItem(
          "user",
          JSON.stringify(response.data.employee)
        );
        await AsyncStorage.setItem("token", response.data.accessToken);
        setIsLoading(false);
      } else {
        // Retry the API call after a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await loginWithEmail(email, password);
      }
    } catch (error) {
      setIsLoading(false);
      alert("Нэвтрэхэд алдаа гарлаа");
    }
  };

  const loginConfirmCode = async (emp_code, phone, code) => {
    try {
      setIsLoading(true);
      const response = await api.loginConfirmCode(
        emp_code,
        phone,
        code,
        expoPushToken
      );
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

  const logOut = () => {
    setIsLoading(true);
    AsyncStorage.removeItem("user");
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("services");
    AsyncStorage.removeItem("categories");
    setUser(null);
    setToken(null);
    setIsLoading(false);
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

  const getCategories = async (dd, token) => {
    const data = {
      ...dd,
      modelName:
        "Frontend\\Plugins\\ApplicationService\\ApplicationServiceCategory",
    };
    try {
      setIsLoading(true);
      const response = await api.fetchData(data, token);
      console.log(response.data.records.data);
      setCategories(response.data.records.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setIsLoading(false);
    }
  };
  const getServices = async (dd, token) => {
    const data = {
      ...dd,
      modelName: "Frontend\\Plugins\\ApplicationService\\ApplicationService",
    };

    try {
      setIsLoading(true);
      const response = await api.fetchData(data, token);
      setServices(response.data.records.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setIsLoading(false);
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
    expoPushToken,
    notification,
    categories,
    services,
    isAppReady,
    setIsAppReady,
    progress,
  };
}
