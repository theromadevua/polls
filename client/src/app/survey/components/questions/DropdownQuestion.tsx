export const DropdownQuestion = ({
  question,
  value,
  onChange,
  error
}: {
  question: Question;
  value: string | string[];
  onChange: (value: string) => void;
  error?: string;
}) => {
  const commonClasses = {
    label: "block text-gray-700 font-medium mb-2 text-base",
    error: "text-red-500 text-sm mt-1",
    select: `w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
      error ? 'border-red-500' : 'border-gray-300'
    }`
  };

  return (
    <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <label className={commonClasses.label}>
          {question.questionText}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={commonClasses.select}
          name={`question-${question._id}`}
        >
          <option value="" disabled>
            Select an option
          </option>
          {question.options?.map((option) => (
            <option
              key={`${question._id}-${option.value}`}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className={commonClasses.error}>{error}</p>}
      </div>
    </div>
  );
};