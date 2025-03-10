export const TextQuestion = ({ 
  question, 
  value, 
  onChange, 
  error 
}: {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) => {
  const commonClasses = {
    label: "block text-gray-700 font-medium mb-2 text-base",
    input: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors",
    error: "text-red-500 text-sm mt-1"
  };

  return (
    <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
      <label htmlFor={question._id} className={commonClasses.label}>
        {question.questionText}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={question._id}
        className={`${commonClasses.input} ${error ? 'border-red-500' : ''}`}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      {error && <p className={commonClasses.error}>{error}</p>}
    </div>
  );
};