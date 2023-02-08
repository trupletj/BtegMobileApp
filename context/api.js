import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

//login
export const loginWithPhone = async (emp_code, phone) => {
  try {
    const response = await axios.post(
      `${REACT_APP_BASE_URL}/sms/sendloginsms`,
      { emp_code, phone }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const response = await axios.post(
      `${REACT_APP_BASE_URL}/api/auth/login?is_mobile=2`,
      {
        email,
        password,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const loginConfirmCode = async (emp_code, phone, code) => {
  try {
    const response = await axios.post(`${REACT_APP_BASE_URL}/sms/login/phone`, {
      emp_code,
      phone,
      code,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const logOut = async () => {
  try {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error(error);
  }
};

export const checkSession = async (token) => {
  try {
    const response = await axios.get(
      `${REACT_APP_BASE_URL}/api/auth/me?is_mobile=2`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response;
  } catch (error) {
    let respone = { status: "failed" };
    return respone;
  }
};

//App data

export const fetchData = async (data, token) => {
  try {
    const response = await axios({
      method: "POST",
      // url: `${REACT_APP_BASE_URL}/api/custom/list`,
      url: `${REACT_APP_BASE_URL}/api/custom/list`,
      data,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.error("fetch Data error in api calls :", error);
      });

    return response;
  } catch (error) {
    console.error(error);
  }
};
