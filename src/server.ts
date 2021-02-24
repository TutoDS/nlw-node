import 'reflect-metadata';
import './database';

import { server } from './configs/environment';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
	return res.send('Hello world - NLW04');
}).listen(server.port, () => {
	console.log('[SERVER START]');
});
