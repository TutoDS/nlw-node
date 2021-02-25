import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { UsersRepository } from '../repositories/UsersRepository';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import SendMailService from '../services/SendMailService';
class SendMailController {
	async execute(req: Request, res: Response) {
		const { email, survey_id } = req.body;

		const usersRepository = getCustomRepository(UsersRepository);
		const surveysRepository = getCustomRepository(SurveysRepository);
		const repository = getCustomRepository(SurveysUsersRepository);

		await usersRepository
			.findOne({ email })
			.then(async (user) => {
				// User founded

				await surveysRepository
					.findOne(survey_id)
					.then(async (survey) => {
						// Survey founded
						const surveyUser = repository.create({
							user_id: user.id,
							survey_id: survey.id,
						});

						await repository.save(surveyUser);

						await SendMailService.execute(
							email,
							survey.title,
							survey.description
						);

						return res.status(201).json({
							message: 'Survey email has send with success!',
							code: 201,
							info: {
								email: user.email,
								survey: survey.title,
							},
						});
					})
					.catch((error) => {
						// Survey not found
						return res.status(400).json({
							code: 400,
							message: `Survey with id ${survey_id} not found!`,
						});
					});
			})
			.catch((error) => {
				// User not found
				return res.status(404).json({
					code: 404,
					message: 'User not found!',
				});
			});
	}
}

export { SendMailController };
