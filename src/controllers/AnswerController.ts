import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
class AnswerController {
	async execute(req: Request, res: Response) {
		const { value } = req.params;
		const { id } = req.query;

		const repository = getCustomRepository(SurveysUsersRepository);

		const result = await repository.findOne({ id: String(id) });

		if (result) {
			result.value = Number(value);
			await repository.save(result);

			return res.status(200).json({
				code: 200,
				message: 'Your opinion has saved with success',
				survey: result,
			});
		} else {
			return res.status(404).json({
				code: 404,
				message: 'Survey user not found!',
			});
		}
	}
}

export { AnswerController };
