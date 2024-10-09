import fastify from 'fastify';
import apiRoutes from './api';

export const app = fastify();

app.get('/status', async () => {
	return { message: '[UniEvents-Api] Api is up and running :)' };
});

app.register(apiRoutes);