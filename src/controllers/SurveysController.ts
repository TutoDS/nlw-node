import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { SurveysRepository } from '../repositories/SurveysRepository';
class SurveysController {
	async create(req: Request, res: Response) {
		const body = req.body;

		const surveysRepository = getCustomRepository(SurveysRepository);

		const survey = surveysRepository.create(body);

		await surveysRepository.save(survey);

		return res.status(201).json({
			message: 'Survey created with success!',
			code: 200,
			survey: survey,
		});
	}

	async showAll(req: Request, res: Response) {
		const surveysRepository = getCustomRepository(SurveysRepository);

		const list = await surveysRepository.find();

		return res
			.status(200)
			.json({ code: 200, count: list.length, surveys: list });
	}
}

export { SurveysController };
