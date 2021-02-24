import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe('Users', () => {
	beforeAll(async () => {
		const connection = await createConnection();

		await connection.runMigrations();
	});

	it('Should be able to create a new user', async () => {
		const response = await request(app)
			.post('/api/users') // Route to test
			.send({
				// Data to send
				name: 'Joaquim Sousa',
				email: 'exemplo@email.com',
			});

		expect(response.status).toBe(201);
	});
});
