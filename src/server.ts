import { env } from './configs/environment';
import express from 'express';

const app = express();

app.get('/', (req, res) => {}).listen(env.server.port, () => {
	console.log('[SERVER START]');
});
