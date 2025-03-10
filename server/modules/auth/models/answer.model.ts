import mongoose, { Schema, Document } from 'mongoose';
import { Survey } from '../../survey/models/survey.model'; 

interface IAnswer extends Document {
  surveyId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  answers: {
    questionId: mongoose.Types.ObjectId;
    answer: string | string[] | number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const AnswerSchema = new Schema<IAnswer>({
  surveyId: { type: Schema.Types.ObjectId, ref: 'Survey', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [{
    questionId: { type: Schema.Types.ObjectId, required: true },
    answer: { type: Schema.Types.Mixed, required: true },
  }],
}, { timestamps: true });

AnswerSchema.pre('validate', async function (next) {
  const survey = await Survey.findById(this.surveyId).exec();

  if (!survey) {
    return next(new Error('Survey not found'));
  }

  for (const answer of this.answers) {
    const question = survey.questions.find((q:any) => q._id.equals(answer.questionId));

    if (!question) {
      return next(new Error(`Question with id ${answer.questionId} not found in survey`));
    }

    if (question.required && !answer.answer) {
      return next(new Error(`Question "${question.questionText}" is required`));
    }

    switch (question.questionType) {
      case 'text':
        if (typeof answer.answer !== 'string') {
          return next(new Error(`Question "${question.questionText}" expects a text answer`));
        }
        break;
      case 'multiple-choice':
      case 'dropdown':
        if (typeof answer.answer !== 'string') {
          return next(new Error(`Question "${question.questionText}" expects a single choice answer`));
        }
        break;
      case 'checkbox':
        if (!Array.isArray(answer.answer)) {
          return next(new Error(`Question "${question.questionText}" expects multiple choices`));
        }
        break;
      case 'linear-scale':
        if (typeof answer.answer !== 'number') {
          return next(new Error(`Question "${question.questionText}" expects a number`));
        }
        break;
      default:
        return next(new Error(`Unknown question type: ${question.questionType}`));
    }
  }

  next();
});

export const Answer = mongoose.model<IAnswer>('Answer', AnswerSchema);