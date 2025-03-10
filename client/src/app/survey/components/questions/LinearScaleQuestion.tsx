export const LinearScaleQuestion = ({
  question,
  value,
  onChange,
  error
}: {
  question: Question;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}) => {
  const commonClasses = {
    label: "block text-gray-700 font-medium mb-2 text-base",
    error: "text-red-500 text-sm mt-1"
  };

  const scaleMin = question.minValue || 1;
  const scaleMax = question.maxValue || 5;
  const values = Array.from({ length: scaleMax - scaleMin + 1 }, (_, i) => i + scaleMin);

  return (
    <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
      <label htmlFor={question._id} className={commonClasses.label}>
        {question.questionText}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">{question.minLabel || scaleMin}</span>
          <span className="text-sm text-gray-500">{question.maxLabel || scaleMax}</span>
        </div>
        <input
          id={question._id}
          type="range"
          min={scaleMin}
          max={scaleMax}
          step="1"
          value={value || scaleMin}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${
            error ? 'border-red-500' : ''
          }`}
        />
        <div className="flex justify-between mt-1">
          {values.map((val) => (
            <span key={`${question._id}-${val}`} className="text-xs text-gray-500">
              {val}
            </span>
          ))}
        </div>
        {error && <p className={commonClasses.error}>{error}</p>}
      </div>
    </div>
  );
};