'use client'

import Navbar from "@/components/Navbar";
import { QuestionRenderer } from "../components/QuestionRender";
import { SurveyHeader } from "../components/SurveyHeader";
import { getSurvey, saveResponse } from "@/store/survey/surveyThunk";
import { validateAnswer } from "../utilts/validation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

export const SurveyComponent = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { surveyData, loading, error: surveyError } = useSelector((state: RootState) => state.survey);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (id && typeof id === 'string') {
      dispatch(getSurvey(id));
    }
  }, [dispatch, id]);

  const handleInputChange = (question: Question, value: string | string[] | number) => {
    const error = validateAnswer(question, value);
    setErrors(prev => ({
      ...prev,
      [question._id]: error || ''
    }));

    setAnswers(prev => {
      const newAnswers = prev.filter(a => a.questionId !== question._id);
      return [...newAnswers, { questionId: question._id, answer: value }];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {};
    let hasErrors = false;
    
    surveyData?.questions.forEach((question: Question) => {
      const answer = answers.find(a => a.questionId === question._id);
      const error = validateAnswer(question, answer?.answer || '');
      if (error) {
        newErrors[question._id] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (hasErrors) {
      return;
    }

    try {
      await dispatch(saveResponse({
        surveyId: id,
        answers: answers
      }));
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit survey:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (surveyError || !surveyData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{surveyError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <SurveyHeader title={surveyData.title} description={surveyData.description} user={{username: surveyData.createdBy.username, avatar: surveyData.createdBy.avatar}}/>

        <form onSubmit={handleSubmit} className="space-y-6">
          {surveyData.questions.map((question: Question) => {
            const currentAnswer = answers.find(a => a.questionId === question._id)?.answer;
            return (
              <QuestionRenderer
                key={question._id}
                question={question}
                value={currentAnswer || ''}
                onChange={(value) => handleInputChange(question, value)}
                error={errors[question._id]}
              />
            );
          })}
          
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className={`
                px-6 py-3 rounded-lg text-white font-medium
                ${submitted ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}
                transition-colors duration-200 transform
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              `}
              disabled={submitted}
            >
              {submitted ? 'Submitted ✓' : 'Submit Survey'}
            </button>
          </div>
        </form>
      </div>
      <Navbar/>
    </div>
  );
};

export default SurveyComponent;