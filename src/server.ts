import { server } from './configs/environment';
import { app } from './app';

app.listen(server.port, () => {
	console.log('[SERVER START]');
});
