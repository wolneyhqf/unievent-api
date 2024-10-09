import { FastifyInstance } from 'fastify';

import { insertEvent, getEvents, getEvent, updateEvent, deleteEvent } from './events.controller';
import { validateEventInsertionSchema, validateIfEventExists, validateIfEventExistsByTitle } from './events.middlewares';

const eventsRouter = async (app: FastifyInstance) => {
	app.post('/', { preHandler: [
		validateEventInsertionSchema,
		validateIfEventExistsByTitle] },
	insertEvent);

	app.get('/', getEvents);

	app.get('/:eventID', { preHandler: [validateIfEventExists] }, getEvent);

	app.put('/:eventID', { preHandler: [
		validateEventInsertionSchema,
		validateIfEventExists,
		validateIfEventExistsByTitle] },
	updateEvent);

	app.delete('/:eventID', { preHandler: [validateIfEventExists] }, deleteEvent);
};

export default eventsRouter;
