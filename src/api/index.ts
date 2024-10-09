import { FastifyInstance } from 'fastify';

import eventsRoutes from './events/events.router';

const apiRoutes = async (app: FastifyInstance) => {
	app.register(eventsRoutes, { prefix: 'events' });
};

export default apiRoutes;
