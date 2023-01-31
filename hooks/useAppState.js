import React, { useState, useEffect, useContext, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetwork } from "./useNetwork";
import { AppStateContext } from "context/AppStateContext";

export const useAppState = () => {
  return useContext(AppStateContext);
};
