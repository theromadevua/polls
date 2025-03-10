import { createSlice } from '@reduxjs/toolkit';
import { 
  createSurvey, 
  deleteSurvey, 
  getSurvey, 
  getSurveys, 
  getSurveyWithResponses,
  saveResponse 
} from './surveyThunk';

const initialState: any = {
  surveys: [],
  surveyData: null,
  loading: false,
  error: null,
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSurveyData: (state) => {
      state.surveyData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSurvey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSurvey.fulfilled, (state, action) => {
        state.loading = false;
        state.surveys.push(action.payload);
      })
      .addCase(createSurvey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to create survey';
      })

      .addCase(getSurveys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSurveys.fulfilled, (state, action) => {
        state.surveys = action.payload;
        state.loading = false;
      })
      .addCase(getSurveys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch surveys';
      })

      .addCase(getSurvey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSurvey.fulfilled, (state, action) => {
        state.surveyData = action.payload;
        state.loading = false;
      })
      .addCase(getSurvey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch survey';
      })

      .addCase(saveResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveResponse.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to save response';
      })

      .addCase(getSurveyWithResponses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSurveyWithResponses.fulfilled, (state, action) => {
        state.surveyData = action.payload;
        state.loading = false;
      })
      .addCase(getSurveyWithResponses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch survey responses';
      })
      .addCase(deleteSurvey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to delete survey';
      })
      .addCase(deleteSurvey.fulfilled, (state, action) => {
        state.loading = false;
        state.surveys = state.surveys.filter((survey: { _id: string }) => survey._id !== action.payload._id);
        state.error = null;
      })    
      .addCase(deleteSurvey.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
  },
});

export const { clearError, clearSurveyData } = surveySlice.actions;
export default surveySlice.reducer;