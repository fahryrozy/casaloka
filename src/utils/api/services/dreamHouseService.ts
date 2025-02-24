import { apiRequest, ENDPOINTS } from "../clients/axiosClient";

interface IDreamHouseRequest {
  tenor: string;
  province_code: string;
  city_code: string;
  district_code: string;
  harga: string;
}

export const submitDreamHouse = async (
  body: IDreamHouseRequest
): Promise<any> => {
  return apiRequest(ENDPOINTS.FORM_CUSTOMER_RUMAH_IMPIAN, "POST", body);
};
