import { app } from './app';
import { env } from './env';

app
	.listen({
		port: env.PORT,
		host: '0.0.0.0',
	})
	.then(() => {
		const message = `[UniEvents-Api] App initialized on port ${env.PORT}`;
		console.log(message);
	});
