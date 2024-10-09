import { FastifyRequest } from 'fastify';
import { z } from 'zod';
import { AppError } from '../../services/errors/AppError';
import { isFirstDateGreaterThanSecond } from '../../services/utils/date-utils';
import { Event } from './events.types';
import { knex } from '../../database';

type PathParams = {eventID?: string | null}

async function validateEventInsertionSchema(request: FastifyRequest) {
	const insertEventBodySchema = z.object({
		title: z.string(),
		description: z.string().optional(),
		startDate: z.coerce.date(),
		endDate: z.coerce.date(),
		vacancies: z.number()
	});

	const eventSchemaParse = insertEventBodySchema.safeParse(
		request.body,
	);

	if (eventSchemaParse.success === false) {
		const message = `${eventSchemaParse.error.errors[0].path[0].toString()} ${eventSchemaParse.error.errors[0].message}`;
		throw new AppError(message, new Error(), 400);
	}

	if(isFirstDateGreaterThanSecond(eventSchemaParse.data.startDate, eventSchemaParse.data.endDate)){
		throw new AppError('startDate cannot greater than endDate', new Error(), 400);
	}

}

async function validateIfEventExistsByTitle(request: FastifyRequest) {
	const { eventID } = request.params as PathParams;
	const event = request.body as Event;

	let whereNot = {};
	if(eventID){
		whereNot = {id: eventID};
	}

	const eventExists = await knex('events')
		.where({ title: event.title })
		.whereNot(whereNot)
		.first();

	if(eventExists){
		throw new AppError('There is an event with the same name', new Error(), 400);
	}
}

async function validateIfEventExists(request: FastifyRequest) {
	const { eventID } = request.params as PathParams;

	const event = await knex('events').where({id: eventID}).first();

	if(!event) throw new AppError('Event not found', new Error(), 404);
}

export {validateEventInsertionSchema, validateIfEventExistsByTitle, validateIfEventExists};
