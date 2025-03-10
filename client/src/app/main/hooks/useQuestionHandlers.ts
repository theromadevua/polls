import { useCallback, Dispatch, SetStateAction } from "react";

export const useQuestionHandlers = (
  setFormData: Dispatch<SetStateAction<SurveyFormData>>
) => {
  const handleQuestionChange = useCallback(
    <K extends keyof SurveyQuestion>(
      index: number,
      field: K,
      value: SurveyQuestion[K]
    ) => {
      setFormData((prevData:any) => {
        const newQuestions = [...prevData.questions];
        newQuestions[index] = { ...newQuestions[index], [field]: value };

        if (field === "questionType") {
          if (
            ["multiple-choice", "checkbox", "dropdown"].includes(
              value as string
            )
          ) {
            newQuestions[index].options = [
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
            ];
          } else if (value === "linear-scale") {
            newQuestions[index].options = [];
            newQuestions[index].scaleOptions = { min: 0, max: 5 };
          } else {
            newQuestions[index].options = [];
          }
        }

        return { ...prevData, questions: newQuestions };
      });
    },
    [setFormData]
  );

  const handleScaleOptionChange = useCallback(
    (questionIndex: number, field: "min" | "max", value: string) => {
      setFormData((prevData:any) => {
        const newQuestions = [...prevData.questions];
        const numValue = parseInt(value, 10);
        const boundedValue = Math.max(-10, Math.min(10, numValue));

        newQuestions[questionIndex].scaleOptions = {
          ...newQuestions[questionIndex].scaleOptions,
          [field]: boundedValue,
        };

        return { ...prevData, questions: newQuestions };
      });
    },
    [setFormData]
  );

  const handleOptionChange = useCallback(
    (
      questionIndex: number,
      optionIndex: number,
      field: "value" | "label",
      value: string
    ) => {
      setFormData((prevData:any) => {
        const newQuestions = [...prevData.questions];
        newQuestions[questionIndex].options[optionIndex][field] = value;
        return { ...prevData, questions: newQuestions };
      });
    },
    [setFormData]
  );

  const addOption = useCallback(
    (questionIndex: number) => {
      setFormData((prevData:any) => {
        const newQuestions = prevData.questions.map((question:any, index:any) => {
          if (index !== questionIndex) return question;

          const newOptionIndex = question.options.length + 1;
          return {
            ...question,
            options: [
              ...question.options,
              {
                value: `option${newOptionIndex}`,
                label: `Option ${newOptionIndex}`,
              },
            ],
          };
        });

        return { ...prevData, questions: newQuestions };
      });
    },
    [setFormData]
  );

  const removeOption = useCallback(
    (questionIndex: number, optionIndex: number) => {
      setFormData((prevData:any) => {
        const newQuestions = prevData.questions.map((question:any, index:any) => {
          if (index !== questionIndex) return question;

          return {
            ...question,
            options: question.options.filter((_:any, idx:any) => idx !== optionIndex),
          };
        });

        return { ...prevData, questions: newQuestions };
      });
    },
    [setFormData]
  );

  const deleteQuestion = useCallback(
    (questionIndex: number) => {
      setFormData((prevData:any) => {
        if (prevData.questions.length <= 1) return prevData;

        const newQuestions = [...prevData.questions];
        newQuestions.splice(questionIndex, 1);
        return { ...prevData, questions: newQuestions };
      });
    },
    [setFormData]
  );

  return {
    handleQuestionChange,
    handleScaleOptionChange,
    handleOptionChange,
    addOption,
    removeOption,
    deleteQuestion,
  };
};