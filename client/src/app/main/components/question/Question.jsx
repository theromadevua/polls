import ChoiceOptions from "./ChoiceOptions";
import QuestionTypeSelect from "./QuestionTypeSelect";
import LinearScaleOptions from "./LinearScaleOptions";


const Question = ({ 
    question, 
    questionIndex, 
    onQuestionChange, 
    onScaleChange, 
    onOptionChange, 
    onAddOption, 
    onRemoveOption,
    onDeleteQuestion, 
    errors 
  }) => (
    <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50 relative">
      <button
        type="button"
        onClick={() => onDeleteQuestion(questionIndex)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        ✕
      </button>
      
      <div>
        <input
          type="text"
          placeholder="Text"
          value={question.questionText}
          onChange={(e) => onQuestionChange(questionIndex, "questionText", e.target.value)}
          className={`w-full p-3 border ${errors[`question_${questionIndex}`] ? 'border-red-500' : 'border-gray-200'} rounded-md bg-white focus:border-gray-500 focus:ring-2 focus:ring-gray-200 outline-none transition`}
          required
        />
        {errors[`question_${questionIndex}`] && (
          <p className="text-red-500 text-sm mt-1">{errors[`question_${questionIndex}`]}</p>
        )}
      </div>
  
      <QuestionTypeSelect
        value={question.questionType}
        onChange={(e) => onQuestionChange(questionIndex, "questionType", e.target.value)}
        className="w-full p-3 border border-gray-200 rounded-md bg-white focus:border-gray-500 focus:ring-2 focus:ring-gray-200 outline-none transition"
      />
  
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={question.required}
          onChange={(e) => onQuestionChange(questionIndex, "required", e.target.checked)}
          className="w-4 h-4 text-purple-600 focus:ring-gray-500"
        />
        <label className="text-gray-700">Required question</label>
      </div>
  
      {question.questionType === 'linear-scale' && (
        <LinearScaleOptions
          question={question}
          questionIndex={questionIndex}
          onScaleChange={onScaleChange}
          errors={errors}
        />
      )}
  
      {['multiple-choice', 'checkbox', 'dropdown'].includes(question.questionType) && (
        <ChoiceOptions
          question={question}
          questionIndex={questionIndex}
          onOptionChange={onOptionChange}
          onAddOption={onAddOption}
          onRemoveOption={onRemoveOption}
          errors={errors}
        />
      )}
    </div>
  );

export default Question