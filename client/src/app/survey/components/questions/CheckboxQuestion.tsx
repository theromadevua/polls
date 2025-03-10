import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface CheckboxQuestionProps {
  question: any
  questionIndex: number;
  errors?: Record<string, string>;
  handleQuestionChange: (index: number, field: string, value: any) => void;
  handleOptionChange: (questionIndex: number, optionIndex: number, field: string, value: string) => void;
  addOption: (questionIndex: number) => void;
  removeOption: (questionIndex: number, optionIndex: number) => void;
}

const CheckboxQuestion: React.FC<CheckboxQuestionProps> = ({
  question,
  questionIndex,
  errors,
  handleQuestionChange,
  handleOptionChange,
  addOption,
  removeOption,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <input
          type="text"
          value={question.questionText}
          onChange={(e) => handleQuestionChange(questionIndex, 'questionText', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your question"
        />
        <label className="ml-4 flex items-center">
          <input
            type="checkbox"
            checked={question.required}
            onChange={(e) => handleQuestionChange(questionIndex, 'required', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-600">Required</span>
        </label>
      </div>

      <div className="space-y-2">
        {question.options.map((option:any , optionIndex:any )=> (
          <div key={optionIndex} className="flex items-center space-x-2">
            <input
              type="checkbox"
              disabled
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <input
              type="text"
              value={option.label}
              onChange={(e) => handleOptionChange(questionIndex, optionIndex, 'label', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Option label"
            />
            <button
              type="button"
              onClick={() => removeOption(questionIndex, optionIndex)}
              className="p-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addOption(questionIndex)}
          className="mt-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
        >
          Add Option
        </button>
      </div>

      {errors?.[`questions.${questionIndex}.options`] && (
        <p className="text-red-500 text-sm">{errors[`questions.${questionIndex}.options`]}</p>
      )}
    </div>
  );
};

export default CheckboxQuestion;