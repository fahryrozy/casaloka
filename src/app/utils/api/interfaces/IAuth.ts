export interface ILoginRequest {
  username: string;
  user_type: string;
  password: string;
}

export interface IRegisterRequest {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  ulangi_password: string;
  user_group_id: string;
  url_verify: string;
}

export interface IAuthResponse {
  rc: string;
  status: number;
  message: string;
  error_data: string;
  data: IAuthData;
}

export interface IAuthData {
  log_number: string;
  token: string;
  email: string;
  first_name: string;
  last_name: string;
  selected_user_group_id: string;
  selected_user_group_name: string;
  selected_user_type: string;
  user_group_id_list: any[];
  phone_number: string;
}

export interface IUserData {
  id: string;
  token: string;
  email: string;
  name: string;
}
