import { apiRequest, ENDPOINTS } from "../clients/axiosClient";

interface EditProfileRequest {
  first_name: string;
  last_name: string;
  phone_number: string;
}

interface GetProfileRequest {
  email: string;
}

interface UserDetail {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

interface ProfileResponse {
  rc: string;
  status: number;
  message: string;
  error_data: string;
  data: {
    log_number: string;
    user_detail: UserDetail;
  };
}

interface VerifyUserRequest {
  user: string;
}

interface VerifyUserResponse {
  rc: string;
  status: number;
  message: string;
  error_data?: string;
}

interface ChangePasswordRequest {
  password_lama: string;
  password: string;
  ulangi_password: string;
}

interface ChangePasswordResponse {
  rc: string;
  status: number;
  message: string;
  error_data?: string;
}

export const editProfile = async (
  body: EditProfileRequest
): Promise<ProfileResponse> => {
  return apiRequest(ENDPOINTS.EDIT_PROFILE, "POST", body);
};

export const getProfile = async (
  body: GetProfileRequest
): Promise<ProfileResponse> => {
  return apiRequest(ENDPOINTS.GET_USER_DETAIL_BY_EMAIL, "POST", body);
};

export const verifyUser = async (
  body: VerifyUserRequest
): Promise<VerifyUserResponse> => {
  return apiRequest(ENDPOINTS.VERIFY_USER, "POST", body);
};

export const changePassword = async (
  body: ChangePasswordRequest
): Promise<ChangePasswordResponse> => {
  return apiRequest(ENDPOINTS.CHANGE_PASSWORD, "POST", body);
};
