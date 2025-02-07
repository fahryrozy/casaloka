import axios from "axios";
import crypto from "crypto-js";
import moment from "moment";

const clientId = "01001";
const clientKey = "ebfadf891b7ec6b80f11cf2d3331ead65032e802";
const aesKey = "iniencryptanterbaiksejagatraya23";
const aesIv = "1230912854278345";

const api = axios.create({
  baseURL: "https://newapidev.casaloka.id",
});

export const generateHeaders = () => {
  const dateNow = new Date();
  const dateNowStr = moment(dateNow).format("YYYYMMDD");
  const xTimestamp = moment(dateNow)
    .utcOffset(7)
    .format("YYYY-MM-DDTHH:mm:ssZ");

  const clientSecretStr = `${clientId}|${dateNowStr}|${xTimestamp}`;
  const clientSecret = crypto
    .HmacSHA256(clientSecretStr, clientKey)
    .toString(crypto.enc.Base64);

  return {
    "x-client-id": clientId,
    "x-client-secret": clientSecret,
    "x-timestamp": xTimestamp,
    "content-type": "application/json",
  };
};

export const aesEncrypt = (text: string) => {
  const DataKey = crypto.enc.Utf8.parse(aesKey);
  const DataVector = crypto.enc.Utf8.parse(aesIv);
  const textEnc = crypto.AES.encrypt(text, DataKey, {
    iv: DataVector,
  }).toString();
  return textEnc;
};

export const setSignature = (jsonBody: object) => {
  const dateNowStr = moment().format("YYYYMMDD");
  const xTimestamp = moment().utcOffset(7).format("YYYY-MM-DDTHH:mm:ssZ");

  const bodyJsonHash = crypto
    .SHA256(JSON.stringify(jsonBody))
    .toString(crypto.enc.Hex)
    .toLowerCase();
  const strSignature = `${clientId}|${dateNowStr}|${xTimestamp}|${bodyJsonHash}`;
  const signature = crypto
    .HmacSHA256(strSignature, clientKey)
    .toString(crypto.enc.Base64);

  return signature;
};

export const getPropertyList = async () => {
  try {
    const headers = generateHeaders();
    const requestBody = {
      page_size: "all",
      current_page: "1",
      search: "",
      orderby: "0",
      orderby_index: "DESC",
    };

    const signature = setSignature(requestBody);
    requestBody["signature"] = signature;

    const response = await api.post(
      "/api/v1.0.0/getpropertilist",
      requestBody,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching property list:", error);
    throw error;
  }
};
