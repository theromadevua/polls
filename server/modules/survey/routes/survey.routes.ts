import { Router} from 'express';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { SurveyController } from '../controllers/survey.controller';

const router = Router();

router.post('/createSurvey', authMiddleware, SurveyController.createSurvey)
router.get('/getSurveys', authMiddleware, SurveyController.getSurveys)
router.get('/getSurvey/:id', authMiddleware, SurveyController.getSurvey)
router.post('/saveAnswers/:id', authMiddleware, SurveyController.saveAnswers)
router.get('/getSurveyWithResponses/:id', authMiddleware, SurveyController.surveyStatistics)
router.delete('/deleteSurvey/:id', authMiddleware, SurveyController.deleteSurvey)

export const surveyRouter = router;
