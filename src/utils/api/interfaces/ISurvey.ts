export interface ISurveyRequest {
  properti_id: string;
  survey_date: string;
}

export interface ISurveyResponse {
  rc: string;
  status: number;
  message: string;
  error_data: string;
  data: SurveyData;
}

export interface SurveyData {
  log_number: string;
}
