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
  dataloaded: 0,
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
        const services = await AsyncStorage.getItem("services");

        if (categories && services) {
          setCategories(JSON.parse(categories));
          setCategories(JSON.parse(services));
          setIsLoading(false);
        } else {
          await getCategories(data, token);
          await getServices(data, token);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
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
  const getServices = async (dd, token) => {
    const data = {
      ...dd,
      modelName: "Frontend\\Plugins\\ApplicationService\\ApplicationService",
    };
    console.log(data);
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

  const checkUpdate = async () => {
    console.log("Im checking update ....");
  };

  return (
    <AppStateContext.Provider
      value={{
        categories,
        services,
        isLoading,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateContext;
