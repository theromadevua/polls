import { useDispatch } from "react-redux";
import { createSurvey } from "@/store/survey/surveyThunk"; 
import Question from "./question/Question";
import { FormEvent } from "react";
import { useQuestionHandlers } from "../hooks/useQuestionHandlers";
import { useSurveyValidation } from "../hooks/useSurveyValidation";
import { AppDispatch } from "@/store";
import { useSurveyForm } from "../hooks/useSurveyForm";

interface SurveyFormProps {
  onClose?: () => void;
}

const SurveyForm = ({ onClose = () => {} }: SurveyFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { formData, setFormData, updateField, addQuestion } = useSurveyForm();
  const {
    handleQuestionChange,
    handleScaleOptionChange,
    handleOptionChange,
    addOption,
    removeOption,
    deleteQuestion,
  } = useQuestionHandlers(setFormData);
  const { errors, validateForm } = useSurveyValidation(formData);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        dispatch(createSurvey(formData));
        onClose();
      } catch (error) {
        console.error("Error creating survey:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Create New Survey</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Survey Name"
            value={formData.title}
            onChange={(e) => updateField("title", e.target.value)}
            className={`w-full p-3 border ${
              errors.title ? "border-red-500" : "border-gray-200"
            } rounded-md focus:border-gray-500 outline-none transition`}
            required
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
          className="w-full p-3 border min-h-[100] border-gray-200 rounded-md focus:border-gray-500 outline-none transition"
          rows={3}
        />
      </div>

      <div className="space-y-6">
        {formData.questions.map((question, questionIndex) => (
          <Question
            key={questionIndex}
            question={question}
            questionIndex={questionIndex}
            onQuestionChange={handleQuestionChange}
            onScaleChange={handleScaleOptionChange}
            onOptionChange={handleOptionChange}
            onAddOption={addOption}
            onRemoveOption={removeOption}
            onDeleteQuestion={deleteQuestion}
            errors={errors}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={addQuestion}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
        >
          Add question
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default SurveyForm;