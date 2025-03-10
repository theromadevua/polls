import { useState, useCallback } from "react";

const initialQuestion: SurveyQuestion = {
  questionText: "",
  questionType: "text",
  required: false,
  options: [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ],
  scaleOptions: {
    min: 0,
    max: 5,
  },
};

export const useSurveyForm = () => {
  const [formData, setFormData] = useState<SurveyFormData>({
    title: "",
    description: "",
    questions: [initialQuestion],
  });

  const updateField = useCallback(
    <K extends keyof SurveyFormData>(field: K, value: SurveyFormData[K]) => {
      setFormData((prev:any) => ({ ...prev, [field]: value }));
    },
    []
  );

  const addQuestion = useCallback(() => {
    setFormData((prev:any) => ({
      ...prev,
      questions: [...prev.questions, initialQuestion],
    }));
  }, []);

  return { formData, setFormData, updateField, addQuestion };
};