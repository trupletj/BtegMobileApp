import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";

axios.defaults.baseURL = REACT_APP_BASE_URL;
//login
export const loginWithPhone = async (emp_code, phone) => {
  try {
    const response = await axios.post(`/sms/sendloginsms`, { emp_code, phone });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const loginWithEmail = async (email, password, expoPushToken) => {
  try {
    const response = await axios.post(`/api/auth/login?is_mobile=2`, {
      email,
      password,
      expoPushToken,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const loginConfirmCode = async (
  emp_code,
  phone,
  code,
  expoPushToken
) => {
  try {
    const response = await axios.post(`/sms/login/phone`, {
      emp_code,
      phone,
      code,
      expoPushToken,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const checkSession = async (token) => {
  const response = await axios.get(`/api/auth/me?is_mobile=2`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

//App data

export const fetchData = async (data, token) => {
  const response = await axios({
    method: "POST",
    // url: `/api/custom/list`,
    url: `/api/custom/list`,
    data,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(function (response) {
    return response;
  });

  return response;
};
