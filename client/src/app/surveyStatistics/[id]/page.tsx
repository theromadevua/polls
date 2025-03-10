'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getSurveyWithResponses } from '@/store/survey/surveyThunk';
import { RouteGuard } from '@/components/RouteGuard';
import Navbar from '@/components/Navbar';
import { SurveyHeader } from '../components/SurveyHeader';
import { TabNavigation } from '../components/TabNavigation';
import { QuestionStatistics } from '../components/QuestionStatistics';
import { getFormattedAnswer, getResponses } from '../utils/surveyUtils';
import { useDownloadResponses } from '../hooks/useDownloadResponses';


interface SurveyState {
  surveyData: SurveyData | null;
  loading: boolean;
  error: string | null;
}

const SurveyStatistics: React.FC = () => {
const {downloadResponses} = useDownloadResponses({getFormattedAnswer});
const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<'overview' | 'individual'>('overview');
  const { surveyData, loading, error } = useSelector<RootState, SurveyState>(
    (state) => state.survey
  );

  useEffect(() => {
    if (id) {
      dispatch(getSurveyWithResponses(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !surveyData?.questions) {
    return (
      <RouteGuard requiredRole='creator' surveyId={id}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-500 text-center">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{error || 'No survey data found.'}</p>
          </div>
        </div>
      </RouteGuard>
    );
  }

  const responses = getResponses(surveyData);

  return (
    <RouteGuard requiredRole='creator' surveyId={id}>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SurveyHeader
            title={surveyData.title}
            responsesCount={responses.length}
            surveyId={id}
            onDownload={() => downloadResponses(surveyData, responses)}
          />

          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === 'overview' ? (
            <div className="grid grid-cols-1 gap-6">
              {surveyData.questions.map((question) => (
                <div key={question._id} className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">{question.questionText}</h2>
                  <QuestionStatistics
                    question={question}
                    responses={responses}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {responses.map((response, index) => (
                <div key={response._id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Response #{index + 1}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(response.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <dl className="space-y-4">
                    {surveyData.questions.map((question) => {
                      const answer = response.answers?.find((a:any) => a.questionId === question._id)?.answer;
                      return (
                        <div key={question._id}>
                          <dt className="font-medium text-gray-700">{question.questionText}</dt>
                          <dd className="mt-1 text-gray-600">
                            {getFormattedAnswer(question, answer)}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              ))}
            </div>
          )}
        </div>
        <Navbar />
      </div>
    </RouteGuard>
  );
};

export default SurveyStatistics;