import { ChoiceQuestion } from "./questions/ChoiceQuestion";
import { DropdownQuestion } from "./questions/DropdownQuestion";
import { LinearScaleQuestion } from "./questions/LinearScaleQuestion";
import { TextQuestion } from "./questions/TextQuestion";

export const QuestionRenderer = ({
  question,
  value,
  onChange,
  error
}: {
  question: Question;
  value: string | string[] | number;
  onChange: (value: string | string[] | number) => void;
  error?: string;
}) => {
  switch (question.questionType) {
    case 'text':
      return (
        <TextQuestion
          question={question}
          value={value as string}
          onChange={onChange}
          error={error}
        />
      );
    case 'multiple-choice':
    case 'checkbox':
      return (
        <ChoiceQuestion
          question={question}
          value={value as string | string[]}
          onChange={onChange}
          error={error}
        />
      );
    case 'linear-scale':
      return (
        <LinearScaleQuestion
          question={question}
          value={value as number}
          onChange={onChange}
          error={error}
        />
      );
    case 'dropdown':
      return (
        <DropdownQuestion
          question={question}
          value={value as string | string[]}
          onChange={onChange}
          error={error}
        />
      );
    default:
      return null;
  }
};
