export const ChoiceQuestion = ({
  question,
  value,
  onChange,
  error
}: {
  question: Question;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  error?: string;
}) => {
  const commonClasses = {
    label: "block text-gray-700 font-medium mb-2 text-base",
    error: "text-red-500 text-sm mt-1"
  };

  return (
    <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
      <fieldset>
        <legend className={commonClasses.label}>
          {question.questionText}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </legend>
        <div className="space-y-3">
          {question.options?.map((option) => (
            <label key={`${question._id}-${option.value}`} className="flex items-center space-x-3 cursor-pointer">
              <input
                type={question.questionType === 'checkbox' ? 'checkbox' : 'radio'}
                name={`question-${question._id}`}
                value={option.value}
                className={`w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                  error ? 'border-red-500' : ''
                }`}
                onChange={(e) => {
                  if (question.questionType === 'checkbox') {
                    const values = Array.isArray(value) ? value : [];
                    const newValues = e.target.checked
                      ? [...values, option.value]
                      : values.filter(v => v !== option.value);
                    onChange(newValues);
                  } else {
                    onChange(option.value);
                  }
                }}
                checked={
                  question.questionType === 'checkbox'
                    ? (Array.isArray(value) && value.includes(option.value))
                    : value === option.value
                }
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
        {error && <p className={commonClasses.error}>{error}</p>}
      </fieldset>
    </div>
  );
};
