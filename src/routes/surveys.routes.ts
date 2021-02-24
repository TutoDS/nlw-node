import { Router } from 'express';
import { SurveysController } from '../controllers/SurveysController';

const routes = Router();
const surveyController = new SurveysController();

export default routes
	.post('/', surveyController.create)
	.get('/', surveyController.showAll);
