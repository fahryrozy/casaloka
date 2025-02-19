import { apiRequest, aesEncrypt } from "../clients/axiosClient";
import { ENDPOINTS } from "../clients/axiosClient";
import {
  ILoginRequest,
  IRegisterRequest,
  IAuthResponse,
} from "../interfaces/IAuth";
import Cookies from "js-cookie";

// User Login
export const submitLogin = async (
  body: ILoginRequest
): Promise<IAuthResponse> => {
  const encryptedPassword = aesEncrypt(body.password);
  const res: IAuthResponse = await apiRequest(ENDPOINTS.LOGIN, "POST", {
    ...body,
    password: encryptedPassword,
  });
  return res;
};

// User Registration
export const submitRegister = async (
  body: IRegisterRequest
): Promise<IAuthResponse> => {
  const encryptedPassword = aesEncrypt(body.password);
  const encryptedUlangiPassword = aesEncrypt(body.ulangi_password);

  return apiRequest(ENDPOINTS.REGISTER, "POST", {
    ...body,
    password: encryptedPassword,
    ulangi_password: encryptedUlangiPassword,
  });
};

// Login and store token in cookies
export const submitLoginCookie = async (
  body: ILoginRequest
): Promise<IAuthResponse> => {
  const encryptedPassword = aesEncrypt(body.password);
  const response: IAuthResponse = await await apiRequest(
    ENDPOINTS.LOGIN,
    "POST",
    {
      ...body,
      password: encryptedPassword,
    }
  );
  const { log_number, token, email, first_name, last_name } = response.data;

  if (token) {
    const user = {
      id: log_number,
      token: token,
      email: email,
      name: `${first_name} ${last_name}`.trim(),
    };

    Cookies.set("token", token, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("user", JSON.stringify(user), {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });

    console.log("Token saved in cookies!");
  }

  return response;
};

// User Logout
export const submitLogout = async (
  body: ILoginRequest
): Promise<IAuthResponse> => {
  return apiRequest(ENDPOINTS.LOGOUT, "GET", { body });
};
