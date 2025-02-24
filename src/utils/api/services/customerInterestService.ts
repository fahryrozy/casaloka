import { apiRequest, ENDPOINTS } from "../clients/axiosClient";

export const registerCustomerInterest = async (productId: string) => {
  const response = await apiRequest(
    ENDPOINTS.REGISTER_CUSTOMER_INTEREST,
    "POST",
    {
      properti_id: productId,
    }
  );
  return response;
};
