import { Router, Response, Request } from 'express';

import userRoutes from './users.routes';

const routes = Router();

routes
	.get('/', (req: Request, res: Response) => {
		return res.json({ status: 'API is working' });
	})
	.use('/users', userRoutes);

export default routes;
