export interface IProvinceRequest {
  page_size: string;
  current_page: string;
  search: string;
  orderby: string;
  orderby_index: string;
}
export interface ICityRequest {
  page_size: string;
  current_page: string;
  search: string;
  orderby: string;
  province_code: string;
  orderby_index: string;
}
export interface IDistrictRequest {
  page_size: string;
  current_page: string;
  search: string;
  orderby: string;
  city_code: string;
  orderby_index: string;
}
export interface IVillageRequest {
  page_size: string;
  current_page: string;
  search: string;
  orderby: string;
  district_code: string;
  orderby_index: string;
}

export interface IProvinceResponse {
  rc: string;
  status: number;
  message: string;
  error_data: string;
  data: IProvince;
}

export interface IProvince {
  log_number: string;
  datas: IProvinceData[];
  row_datas: string;
  offset_row_datas: number;
  order_by_list: OrderByList[];
}

export interface IProvinceData {
  id: string;
  code: string;
  name: string;
  meta: Meta;
  created_at: Date;
  updated_at: Date;
}

export interface Meta {
  lat: string;
  long: string;
}

export interface OrderByList {
  name: string;
  index: string;
}
export interface ICityResponse {
  rc: string;
  status: number;
  message: string;
  error_data: string;
  data: ICity;
}

export interface ICity {
  log_number: string;
  datas: ICityData[];
  row_datas: string;
  offset_row_datas: number;
  order_by_list: OrderByList[];
}

export interface ICityData {
  id: string;
  code: string;
  province_code: string;
  name: string;
  meta: Meta;
  created_at: Date;
  updated_at: Date;
}

export interface IDistrictResponse {
  rc: string;
  status: number;
  message: string;
  error_data: string;
  data: IDistrict;
}

export interface IDistrict {
  log_number: string;
  datas: IDistrictData[];
  row_datas: string;
  offset_row_datas: number;
  order_by_list: OrderByList[];
}

export interface IDistrictData {
  id: string;
  code: string;
  city_code: string;
  name: string;
  meta: Meta;
  created_at: Date;
  updated_at: Date;
}

export interface IVillageResponse {
  rc: string;
  status: number;
  message: string;
  error_data: string;
  data: IVillage;
}

export interface IVillage {
  log_number: string;
  datas: IVillageData[];
  row_datas: string;
  offset_row_datas: number;
  order_by_list: OrderByList[];
}

export interface IVillageData {
  id: string;
  code: string;
  district_code: string;
  name: string;
  meta: Meta;
  created_at: Date;
  updated_at: Date;
}
