import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";
// Add your Firebase credentials

const authContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const loginWithPhone = async (emp_code, phone) => {
    setIsLoading(true);
    let response = await axios.post(
      `${REACT_APP_BASE_URL}/sms/sendloginsms?emp_code=${emp_code}&phone=${phone}`
    );
    setIsLoading(false);
    return response;
  };
  const loginWithEmail = (email, password) => {
    setIsLoading(true);
    axios
      .post(
        `${REACT_APP_BASE_URL}/api/auth/login?email=${email}&password=${password}`
      )
      .then((response) => {
        console.log(response.data.employee.salt);
        let user = response.data.employee;
        setUser(user);
        setIsLoading(false);
      });
  };
  const loginConfirmCode = (emp_code, phone, code) => {
    setIsLoading(true);
    axios
      .post(
        `${REACT_APP_BASE_URL}/sms/login/phone?emp_code=${emp_code}&phone=${phone}&code=${code}`
      )
      .then((response) => {
        console.log(response.data);
        setUser(response.data.user.employee);
        setIsLoading(false);
      });
  };
  const logOut = (emp_code, phone, code) => {
    setIsLoading(true);
    setUser(null);
    setIsLoading(false);
  };

  return {
    user,
    isLoading,
    loginWithPhone,
    loginWithEmail,
    loginConfirmCode,
    logOut,
  };
}
