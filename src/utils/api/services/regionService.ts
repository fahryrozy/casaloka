import { apiRequest } from "../clients/axiosClient";
import { ENDPOINTS } from "../clients/axiosClient";
import {
  IProvinceRequest,
  ICityRequest,
  IDistrictRequest,
  IVillageRequest,
  IProvinceResponse,
  ICityResponse,
  IDistrictResponse,
  IVillageResponse,
  IProvinceData,
  ICityData,
  IDistrictData,
  IVillageData,
} from "../interfaces/IRegion";

const DEFAULT_REQUEST: IProvinceRequest = {
  page_size: "all",
  current_page: "1",
  search: "",
  orderby: "0",
  orderby_index: "ASC",
};

export const fetchProvinces = async (): Promise<IProvinceData[]> => {
  const res: IProvinceResponse = await apiRequest(
    ENDPOINTS.GET_PROVINCES_LIST,
    "POST",
    DEFAULT_REQUEST
  );
  return res.data.datas;
};

export const fetchCities = async (
  provinceCode: string
): Promise<ICityData[]> => {
  const requestBody: ICityRequest = {
    ...DEFAULT_REQUEST,
    province_code: provinceCode,
  };
  const res: ICityResponse = await apiRequest(
    ENDPOINTS.GET_CITIES_LIST,
    "POST",
    requestBody
  );
  return res.data.datas;
};

export const fetchDistricts = async (
  cityCode: string
): Promise<IDistrictData[]> => {
  const requestBody: IDistrictRequest = {
    ...DEFAULT_REQUEST,
    city_code: cityCode,
  };
  const res: IDistrictResponse = await apiRequest(
    ENDPOINTS.GET_DISTRICTS_LIST,
    "POST",
    requestBody
  );
  return res.data.datas;
};

export const fetchVillages = async (
  districtCode: string
): Promise<IVillageData[]> => {
  const requestBody: IVillageRequest = {
    ...DEFAULT_REQUEST,
    district_code: districtCode,
  };
  const res: IVillageResponse = await apiRequest(
    ENDPOINTS.GET_VILLAGES_LIST,
    "POST",
    requestBody
  );
  return res.data.datas;
};
