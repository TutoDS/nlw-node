import 'reflect-metadata';
import './database';

import express from 'express';
import routes from './routes';

const app = express();

app
	// Enable JSON
	.use(express.json())
	// API Routes
	.use('/api', routes);

export { app };
