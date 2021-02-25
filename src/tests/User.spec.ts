import request from 'supertest';
import { app } from '../app';

import { create } from '../database';

describe('Users', () => {
	beforeAll(async () => {
		const connection = await create();

		try {
			await connection.runMigrations();
		} catch (error) {
			console.log('Already have migrations!');
		}
	});

	it('Should be able to create a new user', async () => {
		const response = await request(app)
			.post('/api/users') // Route to test
			.send({
				// Data to send
				name: 'Daniel Sousa',
				email: 'exemplo@email.com',
			});

		expect(response.status).toBe(201);
	});

	it('Should not be able to create a new user with email already exists', async () => {
		const response = await request(app)
			.post('/api/users') // Route to test
			.send({
				// Data to send
				name: 'Daniel Sousa',
				email: 'exemplo@email.com',
			});

		expect(response.status).toBe(400);
	});
});
