import mongoose from 'mongoose';
import { Survey } from '../models/survey.model';
import { Answer } from '../../auth/models/answer.model';

interface ICreateSurveyDTO {
  title: string;
  description?: string;
  questions: {
    questionText: string;
    questionType: 'text' | 'multiple-choice' | 'checkbox' | 'dropdown' | 'linear-scale';
    required: boolean;
    options?: {
      value: string;
      label: string;
    }[];
  }[];
}

interface Answer {
  questionId: string;
  answer: string | string[];
}

interface SaveResponseParams {
  surveyId: string;
  userId?: string;
  answers: Answer[];
}

export class SurveyService {
  
  static async getSurveys(userId: string) {
    const surveys = await Survey.find({ createdBy: userId }).select('title description _id questions createdAt');
    
    const processedSurveys = await Promise.all(surveys.map(async (survey) => {
      let answers = await Answer.find({ surveyId: survey._id }).select('_id');
      return { ...survey.toObject(), answers };
    }));
    
    return processedSurveys;
  }

  static async getSurvey(surveyId: string, userId: string) {
    const survey = await Survey.findOne({ _id: surveyId }).populate('createdBy');
    
    if (!survey) {
      throw new Error('Survey not found');
    }
    
    const alreadySubmitted = await Answer.findOne({ surveyId: survey._id, userId: userId });
    
    if (alreadySubmitted) {
      throw new Error('You already submitted this survey');
    }
    
    return survey;
  }

  static async createSurvey(surveyData: ICreateSurveyDTO, userId: string) {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      if (!SurveyService.validateSurveyStructure(surveyData)) {
        throw new Error('Invalid survey structure');
      }

      const processedQuestions = await SurveyService.processQuestions(surveyData.questions);
      
      if ('error' in processedQuestions) {
        throw new Error(processedQuestions.error);
      }

      const survey = new Survey({
        title: surveyData.title,
        description: surveyData.description,
        questions: processedQuestions,
        createdBy: userId,
      });

      await survey.save({ session });

      await session.commitTransaction();
      
      return survey;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  static validateSurveyStructure(data: ICreateSurveyDTO): boolean {
    if (!data.title || !data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
      return false;
    }

    const validQuestionTypes = ['text', 'multiple-choice', 'checkbox', 'dropdown', 'linear-scale'];
    
    return data.questions.every(question => {
      if (!question.questionText || !question.questionType || !validQuestionTypes.includes(question.questionType)) {
        return false;
      }

      const requiresOptions = ['multiple-choice', 'checkbox', 'dropdown'];
      if (requiresOptions.includes(question.questionType)) {
        return question.options && 
               Array.isArray(question.options) && 
               question.options.length >= 2 &&
               question.options.every(opt => opt.value && opt.label);
      }

      return true;
    });
  }

  static async processQuestions(questions: ICreateSurveyDTO['questions']) {
    try {
      return questions.map(question => {
        const processedQuestion = {
          questionText: question.questionText,
          questionType: question.questionType,
          required: question.required || false,
          options: question.options || []
        };

        if (question.questionType === 'linear-scale' && !question.options) {
          processedQuestion.options = [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' }
          ];
        }

        return processedQuestion;
      });
    } catch (error) {
      return { error: 'Error processing questions and options' };
    }
  }

  static async surveyStatistics(surveyId: string, userId: string) {
    const survey = await Survey.findOne({ _id: surveyId });
    
    if (!survey) {
      throw new Error('Cannot find survey with the given id');
    }
    
    if (survey.createdBy.toString() !== userId.toString()) {
      throw new Error('You do not have permission to view this survey');
    }
    
    const responses = await Answer.find({ surveyId: surveyId });
    
    return { ...survey.toObject(), responses };
  }

  static async saveAnswers(surveyId: string, userId: string, answers: any) {
    if (!surveyId || !userId || !answers) {
      throw new Error('Missing required fields');
    }

    const answerExist = !!await Answer.findOne({ surveyId: surveyId, userId: userId });

    if (answerExist) {
      throw new Error('This user already answered this survey');
    }

    const newAnswer = new Answer({
      surveyId,
      userId,
      answers,
    });

    await newAnswer.save();
    
    return newAnswer;
  }

  static async deleteSurvey(surveyId: string) {
    const survey = await Survey.findById(surveyId);
    
    if (!survey) {
      throw new Error('Survey not found');
    }
    
    await survey.deleteOne();
    
    return survey;
  }
}