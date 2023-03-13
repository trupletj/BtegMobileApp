import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as api from "./api";
import axios from "axios";

//notifications
import { useNotifications } from "../hooks/useNotifications";
import globals from "constants/globals";
//fonts

const data = { ...globals.DATA };
const DATA_LIST = globals.DATA_LIST;

export const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const [isUserActive, setIsUserActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [service_roles, setServiceRoles] = useState([]);
  const [error, setError] = useState(null);
  const { expoPushToken, notification } = useNotifications();

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.message === "Network Error") {
        setError({
          message: "Сервертэй холбогдоход алдаа гарлаа",
          status: 500,
        });
        return Promise.reject(error);
      }
      if (error.response.status === 401) {
        setError({
          message: "Та нэвтрэх эрхгүй байна",
          status: 401,
        });
        return Promise.reject(error);
      }
      if (error.response.status === 419) {
        setError({
          message: "Та нэвтрэх эрхгүй байна",
          status: 419,
        });
        return Promise.reject(error);
      }
    }
  );
  axios.interceptors.request.use(
    (request) => {
      console.log("Axios interceptors request !!!!", request.data);
      return request;
    },
    (error) => {
      console.log("Axios interceptors request error", error);

      // Add your error handling logic here
      // For example, you can show an error message to the user or redirect them to a specific page

      return Promise.reject(error);
    }
  );

  const getSessionFromStorage = async () => {
    try {
      const [user, token] = await Promise.all([
        AsyncStorage.getItem("user"),
        AsyncStorage.getItem("token"),
      ]);
      if (user && token) {
        setUser(JSON.parse(user));
        setToken(token);
        checkSession();
      }
    } catch (error) {
      console.error("error from getSessionFronStorage in UserContext", error);
    }
  };
  const checkSession = async () => {
    console.log("called checkSession in UserContext");
    if (token) {
      try {
        const response = await api.checkSession(token);
        if (response.status !== 200) {
          logOut();
        } else {
          setIsUserActive(true);
        }
      } catch (error) {
        setError(error);
        logOut();
      }
    }
  };

  useEffect(() => {
    checkSession();
    getSessionFromStorage();

    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log("called useEffect in UserContext");
    if (token) checkSession();
    if (token && isUserActive) {
      getServices(token);
      getCategories(token);
      getServicesRoles(token);
    }
  }, [token, setIsUserActive, isUserActive]);

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
        setUser(response.data.user.employee);
        setToken(response.data.accessToken);
        await AsyncStorage.setItem(
          "user",
          JSON.stringify(response.data.user.employee)
        );
        await AsyncStorage.setItem("token", response.data.accessToken);
        setIsUserActive(true);
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
      setIsUserActive(true);

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
    setUser(null);
    setToken(null);
    setIsUserActive(false);
    setIsLoading(false);
  };

  const getCategories = async (token) => {
    const data = {
      ...JSON.parse(JSON.stringify(globals.DATA)),
      modelName:
        "Frontend\\Plugins\\ApplicationService\\ApplicationServiceCategory",
    };
    try {
      setIsLoading(true);
      const categories_response = await api.fetchData(data, token);
      setCategories(categories_response?.data?.records?.data || []);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setIsLoading(false);
    }
  };
  const getServices = async (token) => {
    const data = {
      ...JSON.parse(JSON.stringify(globals.DATA)),
      modelName: "Frontend\\Plugins\\ApplicationService\\ApplicationService",
    };

    try {
      setIsLoading(true);
      const service_response = await api.fetchData(data, token);

      console.log("service", data);
      setServices(service_response?.data?.records?.data || []);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setIsLoading(false);
    }
  };
  const getServicesRoles = async (token) => {
    var default_data = JSON.parse(JSON.stringify(globals.DATA));

    console.log(default_data, "orjiiiineee");
    default_data.filters.push({
      field_name: "role_id",
      filter_type: "=",
      filter_value: user?.user?.role_id || 0,
    });

    const data = {
      ...default_data,
      modelName:
        "Frontend\\Plugins\\ApplicationService\\ApplicationServiceRole",
    };
    try {
      setIsLoading(true);
      const roles_response = await api.fetchData(data, token);

      setServiceRoles(roles_response?.data?.records?.data || []);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setIsLoading(false);
    }
  };

  return {
    isAppReady,
    user,
    token,
    isLoading,
    loginWithPhone,
    loginWithEmail,
    loginConfirmCode,
    logOut,
    checkSession,
    expoPushToken,
    notification,
    categories,
    services,
    service_roles,
    data,
    DATA_LIST,
    error,
  };
}
