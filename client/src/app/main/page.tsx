"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import SurveyForm from './components/SurveyForm';
import {AppDispatch, RootState} from '@/store'
import { deleteSurvey, getSurveys } from '@/store/survey/surveyThunk';
import { X } from 'lucide-react';
import Navbar from '@/components/Navbar';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {surveys} = useSelector((state: RootState) => state.survey);

  
  useEffect(() => {
    dispatch(getSurveys())
  }, [])
  const loading = false
  const error = null

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar/>
        <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Surveys</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition shadow-md"
        >
          Create Survey
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto z-50 backdrop-blur-sm flex justify-center items-start py-24 min-h-screen">
          <div className="max-w-3xl w-full mx-4">
            <SurveyForm onClose={handleCloseModal} />
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {surveys && surveys.length > 0 ? (
          surveys.map((survey: Survey) => (
            <Link
              key={survey._id}
              href={`/surveyStatistics/${survey._id}`}
              className="relative block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">{survey.title}</h2>
                {survey.description && (
                  <p className="text-gray-600 line-clamp-2">{survey.description}</p>
                )}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{new Date(survey.createdAt).toLocaleDateString()}</span>
                  <span>{survey.answers?.length || 0} answers</span>
                </div>
                <X width={20} className='right-2 top-0 absolute text-red-400 hover:scale-[1.1] hover:text-red-600' onClick={(e) => {e.preventDefault(); dispatch(deleteSurvey(survey._id))}}></X>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-400">
            No surveys yet. Create survey by pressing the button above.
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;