interface Survey {
    _id: string
    createdBy: string
    [key: string]: any
  }

   interface Option {
    label: string;
    value: string;
  }
  
   interface Question {
    _id: string;
    questionText: string;
    questionType: 'text' | 'multiple-choice' | 'checkbox' | 'dropdown' | 'linear-scale';
    required: boolean;
    options?: Option[];
    minValue?: number;
    maxValue?: number;
    minLabel?: string;
    maxLabel?: string;
  }
  
   interface SurveyData {
    _id: string;
    title: string;
    description?: string;
    questions: Question[];
    responses?: any
  }
  
   interface Answer {
    questionId: string;
    answer: string | string[] | number;
  }
  
  interface FormErrors {
    [key: string]: string;
  }

  interface ResponseData {
    _id: string,
    surveyId: string,
    userId: string,
    answers?: any[],
    createdAt: Date,
    updatedAt:	Date,
    __v:	0
  }

 interface SurveyOption {
  value: string;
  label: string;
}

 interface ScaleOptions {
  min: number;
  max: number;
}

 interface SurveyQuestion {
  questionText: string;
  questionType: "text" | "multiple-choice" | "checkbox" | "dropdown" | "linear-scale";
  required: boolean;
  options: SurveyOption[];
  scaleOptions: ScaleOptions;
}

 interface SurveyFormData {
  title: string;
  description: string;
  questions: SurveyQuestion[];
}