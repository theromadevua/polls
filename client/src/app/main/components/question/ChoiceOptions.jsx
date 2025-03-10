const ChoiceOptions = ({ question, questionIndex, onOptionChange, onAddOption, onRemoveOption, errors }) => (
    <div className="space-y-2">
      {errors[`question_${questionIndex}_options`] && (
        <p className="text-red-500 text-sm">{errors[`question_${questionIndex}_options`]}</p>
      )}
      
      {question.options.map((option, optionIndex) => (
        <div key={optionIndex} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Value"
            value={option.value}
            onChange={(e) => onOptionChange(questionIndex, optionIndex, "value", e.target.value)}
            className="w-1/2 p-3 border border-gray-200 rounded-md bg-white focus:border-gray-500 focus:ring-2 focus:ring-gray-200 outline-none transition"
            required
          />
          <input
            type="text"
            placeholder="Option text"
            value={option.label}
            onChange={(e) => onOptionChange(questionIndex, optionIndex, "label", e.target.value)}
            className="w-1/2 p-3 border border-gray-200 rounded-md bg-white focus:border-gray-500 focus:ring-2 focus:ring-gray-200 outline-none transition"
            required
          />
          {question.options.length > 2 && (
            <button
              type="button"
              onClick={() => onRemoveOption(questionIndex, optionIndex)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onAddOption(questionIndex)}
        className="text-gray-600 hover:text-gray-700 transition"
      >
        + Add option
      </button>
    </div>
  );

  export default ChoiceOptions