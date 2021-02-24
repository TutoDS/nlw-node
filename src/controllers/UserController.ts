import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
	async create(req: Request, res: Response) {
		const { name, email } = req.body;

		const usersRepository = getRepository(User);

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
