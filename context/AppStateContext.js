import React, { useState, useEffect, createContext } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetwork } from "hooks/useNetwork";
import * as api from "./api";
import { useAuth } from "../hooks/useAuth";
export const AppStateContext = createContext();

const data = {
  prefix: "custom",
  getAllData: "1",

  relations: [],
  select: "*",
  filters: [],
  orders: [{ field_name: "id", order_type: "desc" }],
  globalSearch: [],
  tableName: "application_service_category",
  dataloaded: 0,
};
const initialState = {
  categories: [],
  services: [],
};

export const ProvideAppState = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState();
  const isConnected = useNetwork();

  const { token } = useAuth();
  useEffect(() => {
    const getStateFromStorage = async () => {
      setIsLoading(true);
      try {
        const categories = await AsyncStorage.getItem("categories");
        // const services = await AsyncStorage.getItem("services");

        if (categories) {
          setCategories(JSON.parse(categories));
          // setCategories(JSON.parse(services));
          setIsLoading(false);
        } else {
          console.log("ASYNC CHECKING 2");

          await getCategories(data, token);
          // await getServices(token, data);

          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setError(error);
        setIsLoading(false);
      }
    };

    getStateFromStorage();
  }, []);

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
  const getServices = async (token, dd) => {
    const data = {
      ...dd,
      modelName: "Frontend\\Plugins\\ApplicationService\\ApplicationService",
    };
    try {
      setIsLoading(true);
      const response = await api.fetchData(token, data);
      setServices(response.data.records.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setIsLoading(false);
    }
  };
  const checkUpdate = async () => {
    console.log("Im checking update ....");
  };

  return (
    <AppStateContext.Provider
      value={{
        categories,
        // services,
        isLoading,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateContext;
