const LinearScaleOptions = ({ question, questionIndex, onScaleChange, errors }) => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-sm text-gray-700 mb-1">Min value</label>
          <input
            type="number"
            value={question.scaleOptions.min}
            onChange={(e) => onScaleChange(questionIndex, "min", e.target.value)}
            min="-10"
            max="10"
            className="w-full p-3 border border-gray-200 rounded-md bg-white focus:border-gray-500 focus:ring-2 focus:ring-gray-200 outline-none transition"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm text-gray-700 mb-1">Max value</label>
          <input
            type="number"
            value={question.scaleOptions.max}
            onChange={(e) => onScaleChange(questionIndex, "max", e.target.value)}
            min="-10"
            max="10"
            className="w-full p-3 border border-gray-200 rounded-md bg-white focus:border-gray-500 focus:ring-2 focus:ring-gray-200 outline-none transition"
          />
        </div>
      </div>
      <input
        type="range"
        min="-10"
        max="10"
        value={question.scaleOptions.max}
        onChange={(e) => onScaleChange(questionIndex, "max", e.target.value)}
        className="w-full"
      />
      {errors[`question_${questionIndex}_scale`] && (
        <p className="text-red-500 text-sm">{errors[`question_${questionIndex}_scale`]}</p>
      )}
      {errors[`question_${questionIndex}_scale_range`] && (
        <p className="text-red-500 text-sm">{errors[`question_${questionIndex}_scale_range`]}</p>
      )}
    </div>
  );

  export default LinearScaleOptions;