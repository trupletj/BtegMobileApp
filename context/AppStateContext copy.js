import React, {
  useState,
  useEffect,
  createContext,
  useCallback,
  useReducer,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetwork } from "hooks/useNetwork";
import * as api from "./api";
import { useAuth } from "../hooks/useAuth";
export const AppStateContext = createContext();

const categories = {
  prefix: "custom",
  page: 1,
  perPage: 25,
  modelName:
    "Frontend\\Plugins\\ApplicationService\\ApplicationServiceCategory",
  relations: [],
  select: "*",
  filters: [],
  orders: [{ field_name: "id", order_type: "desc" }],
  globalSearch: [],

  tableName: "application_service_category",
  dataloaded: 0,
};
const services = {
  prefix: "custom",
  page: 1,
  perPage: 25,
  modelName: "Frontend\\Plugins\\ApplicationService\\ApplicationService",
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
  isLoading: true,
  error: null,
};

const appDataReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES_SUCCESS":
      return { ...state, categories: action.payload, isLoading: false };
    case "FETCH_CATEGORIES_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "FETCH_SERVICES_SUCCESS":
      return { ...state, services: action.payload, isLoading: false };
    case "FETCH_SERVICES_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};
export const ProvideAppState = ({ children }) => {
  const { token } = useAuth();
  const [state, dispatch] = useReducer(appDataReducer, initialState);

  const fetchCategories = useCallback(async () => {
    try {
      console.log("API CALL CATEGORIES");
      const response = await axios({
        method: "POST",
        // url: `${REACT_APP_BASE_URL}/api/custom/list`,
        url: `${REACT_APP_BASE_URL}/api/custom/list`,
        data: categories,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(function (response) {
          return console.log(
            "FUNCTION CALLED... fetchCategories DATA IS",
            response
          );
        })
        .catch(function (error) {
          console.error("there is error", error);
        });
      console.log("FUNCTION CALLED... fetchCategories DATA IS :", response);

      dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_CATEGORIES_ERROR", payload: error });
    }
  }, []);
  // const fetchServices = useCallback(async () => {
  //   try {
  //     const response = await api.fetchServices(token, services);
  //     dispatch({ type: "FETCH_SERVICES_SUCCESS", payload: response.data });
  //   } catch (error) {
  //     dispatch({ type: "FETCH_SERVICES_ERROR", payload: error });
  //   }
  // }, []);
  return (
    <AppStateContext.Provider
      value={{
        categories: state.categories,
        services: state.services,
        isLoading: state.isLoading,
        fetchCategories,
        // fetchServices,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateContext;
