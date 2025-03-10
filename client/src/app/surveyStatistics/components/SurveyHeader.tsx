import React, { useState } from 'react';
import { Copy } from 'lucide-react';

interface SurveyHeaderProps {
  title: string;
  responsesCount: number;
  surveyId: string;
  onDownload: () => void;
}

export const SurveyHeader: React.FC<SurveyHeaderProps> = ({
  title,
  responsesCount,
  surveyId,
  onDownload
}) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = async () => {
    const surveyLink = `${window.location.origin}/survey/${surveyId}`;
    try {
      await navigator.clipboard.writeText(surveyLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-2">Total Responses: {responsesCount}</p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Copy size={20} />
          {copySuccess ? 'Copied!' : 'Copy Link'}
        </button>
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
};