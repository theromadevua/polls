export const getResponses = (data: SurveyData | null | undefined): ResponseData[] => {
  if (!data?.responses) return [];
  return Array.isArray(data.responses) ? data.responses : [data.responses];
};

export const getFormattedAnswer = (question: Question, answer: Answer['answer']): string => {
  if (answer === null || answer === undefined) return '';

  switch (question.questionType) {
    case 'multiple-choice':
    case 'dropdown': {
      const option = question.options?.find(opt => opt.value === String(answer));
      return option?.label || String(answer);
    }
    case 'checkbox': {
      if (Array.isArray(answer)) {
        return answer
          .map(value => {
            const option = question.options?.find(opt => opt.value === value);
            return option?.label || value;
          })
          .join('; ');
      }
      return String(answer);
    }
    case 'linear-scale':
    case 'text':
    default:
      return String(answer);
  }
};

