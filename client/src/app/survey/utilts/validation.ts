export const validateAnswer = (question: Question, value: string | string[] | number): string | null => {
    if (question.required && (!value || (Array.isArray(value) && value.length === 0))) {
      return 'This question is required';
    }
  
    switch (question.questionType) {
      case 'text':
        if (typeof value !== 'string') {
          return 'Text answer is required';
        }
        break;
      case 'multiple-choice':
      case 'dropdown':
        if (typeof value !== 'string') {
          return 'Please select an option';
        }
        break;
      case 'checkbox':
        if (!Array.isArray(value)) {
          return 'Please select at least one option';
        }
        break;
      case 'linear-scale':
        if (typeof value !== 'number') {
          return 'Please select a value';
        }
        if (question.minValue && value < question.minValue) {
          return `Value must be at least ${question.minValue}`;
        }
        if (question.maxValue && value > question.maxValue) {
          return `Value must not exceed ${question.maxValue}`;
        }
        break;
    }
    return null;
  };