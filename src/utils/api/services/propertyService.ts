import { apiRequest } from "../clients/axiosClient";
import { ENDPOINTS } from "../clients/axiosClient";
import {
  IPropertyListResponse,
  IPropertyDetailResponse,
  IPropertyListRequest,
  IPropertyListData,
  PropertyDetailData,
} from "../interfaces/IProperty";

// Fetch Property List
export const getPropertyList = async (
  body: Partial<IPropertyListRequest>
): Promise<{ properties: IPropertyListData[]; totalItems: number }> => {
  const requestBody: IPropertyListRequest = {
    page_size: body.page_size || "5",
    current_page: body.current_page || "1",
    search: body.search || "",
    orderby: "0",
    orderby_index: "DESC",
    filter: body.filter || {},
  };
  return apiRequest(ENDPOINTS.GET_PROPERTY_LIST, "POST", requestBody).then(
    (response) => {
      const res = response as IPropertyListResponse;
      return {
        properties: res.data.datas,
        totalItems: parseInt(res.data.row_datas, 10),
      };
    }
  );
};

// Fetch Property Detail
export const getPropertyDetail = async (
  slug: string
): Promise<PropertyDetailData> => {
  return apiRequest(ENDPOINTS.GET_PROPERTY_DETAIL, "POST", { slug }).then(
    (response) => {
      const res = response as IPropertyDetailResponse;
      return res.data.properti_detail;
    }
  );
};
