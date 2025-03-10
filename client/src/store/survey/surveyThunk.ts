export interface Survey {
  _id: string;
}

export interface SaveResponseParams {
  surveyId: string | string[] | undefined;
  userId?: string;
  answers: Answer[];
}

import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/api';

const handleApiError = (error: any): never => {
  if (error.response?.data?.message) {
    throw new Error(error.response.data.message);
  }
  throw new Error('An unexpected error occurred');
};

export const deleteSurvey = createAsyncThunk(
  'survey/deleteSurvey',
  async (surveyId: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete<Survey>(`survey/deleteSurvey/${surveyId}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw Error('Error when deleting survey');
    }
  }
)

export const createSurvey = createAsyncThunk(
  'survey/createSurvey',
  async (surveyData: any) => {
    try {
      const response = await api.post<Survey>('survey/createSurvey', surveyData);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
);

export const getSurveys = createAsyncThunk(
  'survey/getSurveys',
  async () => {
    try {
      const response = await api.get<Survey[]>('survey/getSurveys');
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
);


export const getSurvey = createAsyncThunk(
  'survey/getSurvey',
  async (id: string): Promise<any> => {
    try {
      const response = await api.get<Survey>(`survey/getSurvey/${id}`);
      return response.data;
    } catch (error) {
      console.log(error)
      return handleApiError(error);
    }
  }
);

export const saveResponse = createAsyncThunk(
  'survey/saveResponse',
  async ({ surveyId, answers }: SaveResponseParams) => {
    try {
      const response = await api.post(`survey/saveAnswers/${surveyId}`, answers);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
);

export const getSurveyWithResponses = createAsyncThunk(
  'survey/getSurveyWithResponses',
  async (id: string) => {
    try {
      const response = await api.get(`survey/getSurveyWithResponses/${id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
);
