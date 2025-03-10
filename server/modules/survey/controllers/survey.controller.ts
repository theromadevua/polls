import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { SurveyService } from '../services/survey.service';

interface RequestBody extends Request {
  user?: any,
  files?: any
}

export class SurveyController {

  static async getSurveys(req: RequestBody, res: Response) {
    try {
      const surveys = await SurveyService.getSurveys(req.user._id);
      
      if (surveys.length === 0) {
        res.status(404).json({ message: 'Surveys not found' });
        return;
      }
      
      res.json(surveys);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getSurvey(req: RequestBody, res: Response) {
    try {
      const { id } = req.params;
      const survey = await SurveyService.getSurvey(id, req.user._id);
      res.json(survey);
    } catch (error) {
      if (error.message === 'Survey not found') {
        res.status(404).json({ message: error.message });
      } else if (error.message === 'You already submitted this survey') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }

  static async createSurvey(req: RequestBody, res: Response) {
    try {
      const surveyData = req.body;
      const survey = await SurveyService.createSurvey(surveyData, req.user._id);
      res.json(survey);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: Object.values(error.errors).map(err => err.message)
        });
      } else if (error.message === 'Invalid survey structure' || error.message.includes('Error processing questions')) {
        res.status(400).json({
          success: false,
          message: error.message
        });
      } else {
        console.error('Error creating survey:', error);
        res.status(500).json({
          success: false,
          message: 'Error creating survey'
        });
      }
    }
  }

  static async surveyStatistics(req: RequestBody, res: Response) {
    try {
      const { id: surveyId } = req.params;
      const surveyWithResponses = await SurveyService.surveyStatistics(surveyId, req.user._id);
      res.json(surveyWithResponses);
    } catch (error) {
      if (error.message === 'Cannot find survey with the given id') {
        res.status(400).json({ message: error.message });
      } else if (error.message === 'You do not have permission to view this survey') {
        res.status(403).json({ message: error.message });
      } else {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  static async saveAnswers(req: RequestBody, res: Response) {
    try {
      const answers = req.body;
      const { id: surveyId } = req.params;
      
      const newAnswer = await SurveyService.saveAnswers(surveyId, req.user._id, answers);
      
      res.status(201).json({ message: 'Answers saved successfully', answer: newAnswer });
    } catch (error) {
      if (error.message === 'Missing required fields' || error.message === 'This user already answered this survey') {
        res.status(400).json({ message: error.message });
      } else {
        console.error('Error saving answers:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
      }
    }
  }

  static async deleteSurvey(req: RequestBody, res: Response) {
    try {
      const { id: surveyId } = req.params;
      const survey = await SurveyService.deleteSurvey(surveyId);
      res.json(survey);
    } catch (error) {
      if (error.message === 'Survey not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message || 'Error when deleting survey' });
      }
    }
  }
}