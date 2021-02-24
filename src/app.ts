import 'reflect-metadata';
import { create } from './database';

import express from 'express';
import routes from './routes';

create();

const app = express();

app
	// Enable JSON
	.use(express.json())
	// API Routes
	.use('/api', routes);

export { app };
