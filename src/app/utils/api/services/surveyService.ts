import { apiRequest, ENDPOINTS } from "../clients/axiosClient";
import { ISurveyRequest, ISurveyResponse } from "../interfaces/ISurvey";

// Submit Survey
export const submitSurvey = async (
  body: ISurveyRequest
): Promise<ISurveyResponse> => {
  return apiRequest<ISurveyResponse>(
    ENDPOINTS.FORM_SURVEY_SCHEDULE_PROPERTI,
    "POST",
    body
  );
};
