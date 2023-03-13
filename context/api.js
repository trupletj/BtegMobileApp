import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";

axios.defaults.baseURL = REACT_APP_BASE_URL;

//login
export const loginWithPhone = async (emp_code, phone) => {
  console.log("called loginWithPhone in api.js");

  const response = await axios.post(`/sms/sendloginsms`, { emp_code, phone });
  return response;
};

export const loginWithEmail = async (email, password, expoPushToken) => {
  console.log("called loginWithEmail in api.js");

  const response = await axios.post(`/api/auth/login?is_mobile=2`, {
    email,
    password,
    expoPushToken,
  });
  return response;
};

export const loginConfirmCode = async (
  emp_code,
  phone,
  code,
  expoPushToken
) => {
  console.log("called loginConfirmCode in api.js");

  const response = await axios.post(`/sms/login/phone`, {
    emp_code,
    phone,
    code,
    expoPushToken,
  });
  return response;
};

export const checkSession = async (token) => {
  console.log("called checkSession in api.js");
  const response = await axios.get(`/api/auth/me?is_mobile=2`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const fetchData = async (data, token) => {
  console.log("called fetchData in api.js");
  const response = await axios({
    method: "POST",
    url: `/api/custom/list`,
    data,
    headers: {
      "content-type": "application/json",
      "Accept-Encoding ": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(function (response) {
    return response;
  });

  return response;
};
