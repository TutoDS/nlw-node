import { server } from './../configs/environment';
import { resolve } from 'path';
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

						const emailPath = resolve(
							__dirname,
							'..',
							'views',
							'emails',
							'survey.hbs'
						);

						const variables = {
							name: user.name,
							title: survey.title,
							description: survey.description,
							route: server.emailUrl,
							user_id: user.id,
						};

						const foundedResults = await repository.findOne({
							where: [{ user_id: user.id }, { value: null }],
						});

						if (foundedResults) {
							await SendMailService.execute(
								email,
								survey.title,
								variables,
								emailPath
							);

							return res.status(200).json({
								message: 'Survey email has send with success',
								code: 200,
								info: foundedResults,
							});
						} else {
							const surveyUser = repository.create({
								user_id: user.id,
								survey_id: survey.id,
							});

							const newSurveyUser = await repository.save(
								surveyUser
							);

							await SendMailService.execute(
								email,
								survey.title,
								variables,
								emailPath
							);

							return res.status(201).json({
								message: 'Survey email has send with success!',
								code: 201,
								info: newSurveyUser,
							});
						}
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
