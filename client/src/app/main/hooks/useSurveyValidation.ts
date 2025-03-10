// hooks/useSurveyValidation.ts
import { useState, useCallback } from "react";

export const useSurveyValidation = (formData: SurveyFormData) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.title) {
      newErrors.title = "Название опроса обязательно";
    }

    if (!formData.questions || formData.questions.length === 0) {
      newErrors.questions = "Добавьте хотя бы один вопрос";
    }

    formData.questions.forEach((question, index) => {
      if (!question.questionText) {
        newErrors[`question_${index}`] = "Текст вопроса обязателен";
      }

      if (
        ["multiple-choice", "checkbox", "dropdown"].includes(
          question.questionType
        )
      ) {
        if (!question.options || question.options.length < 2) {
          newErrors[`question_${index}_options`] =
            "Требуется минимум 2 варианта ответа";
        }

        question.options.forEach((option, optionIndex) => {
          if (!option.value || !option.label) {
            newErrors[`question_${index}_option_${optionIndex}`] =
              "Заполните значение и текст варианта";
          }
        });
      }

      if (question.questionType === "linear-scale") {
        if (question.scaleOptions.min >= question.scaleOptions.max) {
          newErrors[`question_${index}_scale`] =
            "Минимальное значение должно быть меньше максимального";
        }
        if (question.scaleOptions.min < -10 || question.scaleOptions.max > 10) {
          newErrors[`question_${index}_scale_range`] =
            "Значения должны быть в диапазоне от -10 до 10";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  return { errors, validateForm };
};