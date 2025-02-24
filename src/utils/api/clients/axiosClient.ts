import axios, { AxiosRequestConfig, Method } from "axios";
import crypto from "crypto-js";
import moment from "moment";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const CLIENT_ID = "01001";
const CLIENT_KEY = "ebfadf891b7ec6b80f11cf2d3331ead65032e802";
const AES_KEY = "iniencryptanterbaiksejagatraya23";
const AES_IV = "1230912854278345";

const axiosClient = axios.create({
  baseURL: "https://newapidev.casaloka.id",
  headers: {
    "Content-Type": "application/json",
  },
});

export const ENDPOINTS = {
  LOGIN: "/api/v1.0.0/login",
  LOGOUT: "/api/v1.0.0/logout",
  GET_PROPERTY_LIST: "/api/v1.0.0/getpropertilist",
  GET_PROPERTY_DETAIL: "/api/v1.0.0/getpropertidetail",
  REGISTER: "/api/v1.0.0/registeruser",
  GET_PROVINCES_LIST: "/api/v1.0.0/getprovinceslist",
  GET_CITIES_LIST: "/api/v1.0.0/getcitieslist",
  GET_DISTRICTS_LIST: "/api/v1.0.0/getdistrictslist",
  GET_VILLAGES_LIST: "/api/v1.0.0/getvillageslist",
  FORM_SURVEY_SCHEDULE_PROPERTI: "/api/v1.0.0/formsurveyscheduleproperti",
  FORM_CUSTOMER_RUMAH_IMPIAN: "/api/v1.0.0/formcustomerrumahimpian",
  EDIT_PROFILE: "/api/v1.0.0/editprofile",
  GET_USER_DETAIL_BY_EMAIL: "/api/v1.0.0/getuserdetailbyemail",
  REGISTER_CUSTOMER_INTEREST: "/api/v1.0.0/registercustomerinterest",
  VERIFY_USER: "/api/v1.0.0/verifyuser", // Add the verify user endpoint
  CHANGE_PASSWORD: "/api/v1.0.0/changepassword",
};

// Function to generate API headers
const generateHeaders = (): Record<string, string> => {
  const dateNowStr = moment().format("YYYYMMDD");
  const xTimestamp = moment().utcOffset(7).format("YYYY-MM-DDTHH:mm:ssZ");

  const clientSecretStr = `${CLIENT_ID}|${dateNowStr}|${xTimestamp}`;
  const clientSecret = crypto
    .HmacSHA256(clientSecretStr, CLIENT_KEY)
    .toString(crypto.enc.Base64);

  return {
    "x-client-id": CLIENT_ID,
    "x-client-secret": clientSecret,
    "x-timestamp": xTimestamp,
    "Content-Type": "application/json",
  };
};

// AES Encryption function
const aesEncrypt = (text: string): string => {
  const DataKey = crypto.enc.Utf8.parse(AES_KEY);
  const DataVector = crypto.enc.Utf8.parse(AES_IV);
  return crypto.AES.encrypt(text, DataKey, { iv: DataVector }).toString();
};

// Function to generate request signature (only for body requests)
const generateSignature = (jsonBody: object): string => {
  const dateNowStr = moment().format("YYYYMMDD");
  const xTimestamp = moment().utcOffset(7).format("YYYY-MM-DDTHH:mm:ssZ");

  const bodyJsonHash = crypto
    .SHA256(JSON.stringify(jsonBody))
    .toString(crypto.enc.Hex)
    .toLowerCase();

  const strSignature = `${CLIENT_ID}|${dateNowStr}|${xTimestamp}|${bodyJsonHash}`;
  return crypto
    .HmacSHA256(strSignature, CLIENT_KEY)
    .toString(crypto.enc.Base64);
};

const apiRequest = async <T>(
  endpointUrl: string,
  method: Method,
  requestBody?: object
): Promise<T> => {
  try {
    const headers = generateHeaders();

    const config: AxiosRequestConfig = {
      url: endpointUrl,
      method,
      headers,
    };

    if (requestBody) {
      if (method === "GET") {
        config.params = requestBody;
      } else {
        const signature = generateSignature(requestBody);
        config.data = { ...requestBody, signature };
      }
    }

    const response = await axiosClient(config);
    return response.data;
  } catch (error) {
    if (
      (error as any)?.response &&
      (error as any)?.response?.data?.message === "Token Expired"
    ) {
      deleteCookie("token");
      deleteCookie("user");
      deleteCookie("email");
      useRouter().push("/");
    }
    throw error;
  }
};

// Function to check if running on client or server
const isClient = typeof window !== "undefined";

// Axios interceptor to add Bearer token to headers
axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosClient, aesEncrypt, apiRequest };
