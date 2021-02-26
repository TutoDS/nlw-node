import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';

class UserController {
	async create(req: Request, res: Response) {
		const { name, email } = req.body;

		const schema = yup.object().shape({
			name: yup.string().required(),
			email: yup.string().email().required(),
		});

		try {
			await schema.validate(req.body, { abortEarly: false });
		} catch (err) {
			// Capitalize error message
			const errors = err.errors.map((error) => {
				error = error.charAt(0).toUpperCase() + error.slice(1);

				return error;
			});

			console.log(errors);

			return res.status(400).json({
				code: 400,
				message: 'Validation failed! Please verify all fields',
				errors: errors,
			});
		}

		// if (!(await schema.isValid(req.body))) {
		// }

		const usersRepository = getCustomRepository(UsersRepository);

		await usersRepository.findOne({ email }).then(async (user) => {
			if (!user) {
				// Not find user (var user equals to undefined)
				const user = usersRepository.create({ name, email });

				await usersRepository.save(user);

				return res.status(201).json({
					message: 'User created with success!',
					code: 200,
					user: user,
				});
			} else {
				// Find one user in database
				return res
					.status(400)
					.json({ message: 'User already exists!', code: 400 });
			}
		});
	}
}

export { UserController };
