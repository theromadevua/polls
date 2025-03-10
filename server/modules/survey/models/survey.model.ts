import mongoose, { Schema, Document } from 'mongoose';

type QuestionType = 'text' | 'multiple-choice' | 'checkbox' | 'dropdown' | 'linear-scale';

interface IOption {
  value: string;
  label: string;
}

interface IQuestion {
  questionText: string;
  questionType: QuestionType;
  options?: IOption[];
  required: boolean;
}

export interface ISurvey extends Document {
  title: string;
  description?: string;
  questions: IQuestion[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  responses?: any;
  answers?: any
}

const OptionSchema = new Schema<IOption>({
  value: { type: String, required: true },
  label: { type: String, required: true },
});

const QuestionSchema = new Schema<IQuestion>({
  questionText: { type: String, required: true },
  questionType: { type: String, required: true, enum: ['text', 'multiple-choice', 'checkbox', 'dropdown', 'linear-scale'] },
  options: { type: [OptionSchema], required: function () { return ['multiple-choice', 'checkbox', 'dropdown'].includes(this.questionType); } },
  required: { type: Boolean, default: false },
});

const SurveySchema = new Schema<ISurvey>({
  title: { type: String, required: true },
  description: { type: String },
  questions: { type: [QuestionSchema], required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const Survey = mongoose.model<ISurvey>('Survey', SurveySchema)