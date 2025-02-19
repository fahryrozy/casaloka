import axios, { AxiosRequestConfig, Method } from "axios";
import crypto from "crypto-js";
import moment from "moment";

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
    console.log(`Request [${method}] -> ${endpointUrl}`);

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
    console.error(`API Request Failed: ${method} ${endpointUrl}`, error);
    throw error;
  }
};

export { axiosClient, aesEncrypt, apiRequest };
