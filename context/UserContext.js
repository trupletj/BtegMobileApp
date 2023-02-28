import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as api from "./api";
import axios from "axios";

//notifications
import { useNotifications } from "../hooks/useNotifications";
import globals from "constants/globals";
//fonts
import {
  useFonts,
  SourceSansPro_200ExtraLight,
  SourceSansPro_200ExtraLight_Italic,
  SourceSansPro_300Light,
  SourceSansPro_300Light_Italic,
  SourceSansPro_400Regular,
  SourceSansPro_400Regular_Italic,
  SourceSansPro_600SemiBold,
  SourceSansPro_600SemiBold_Italic,
  SourceSansPro_700Bold,
  SourceSansPro_700Bold_Italic,
  SourceSansPro_900Black,
  SourceSansPro_900Black_Italic,
} from "@expo-google-fonts/source-sans-pro";

const data = { ...globals.DATA };
const DATA_LIST = globals.DATA_LIST;

export const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth() {
  let [fontsLoaded] = useFonts({
    SourceSansPro_200ExtraLight,
    SourceSansPro_200ExtraLight_Italic,
    SourceSansPro_300Light,
    SourceSansPro_300Light_Italic,
    SourceSansPro_400Regular,
    SourceSansPro_400Regular_Italic,
    SourceSansPro_600SemiBold,
    SourceSansPro_600SemiBold_Italic,
    SourceSansPro_700Bold,
    SourceSansPro_700Bold_Italic,
    SourceSansPro_900Black,
    SourceSansPro_900Black_Italic,
  });
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [service_roles, setServiceRoles] = useState([]);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isAppReady, setIsAppReady] = useState(false);
  const { expoPushToken, notification } = useNotifications();

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error("ERRRRRRRRRRRRRRRRRRRRRRRRRRROR", error);
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

  const getSessionFromStorage = async () => {
    try {
      const [user, token] = await Promise.all([
        AsyncStorage.getItem("user"),
        AsyncStorage.getItem("token"),
      ]);
      if (user && token) {
        setUser(JSON.parse(user));
        setToken(token);
      }
    } catch (error) {
      console.error("error from getSessionFronStorage", error);
    }
  };

  useEffect(() => {
    getSessionFromStorage();

    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (token) {
      getServices(token);
      getCategories(token);
      getServicesRoles(token);
    }
  }, [token]);

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
    setUser(null);
    setToken(null);
    setIsLoading(false);
  };

  const checkSession = async () => {
    if (token) {
      try {
        const response = await api.checkSession(token);
        if (response.status !== 200) {
          logOut();
        }
      } catch (error) {
        console.error("check session error", error);
      }
    }
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
    service_roles,
    data,
    DATA_LIST,
    error,
    fontsLoaded,
  };
}
