import { FastifyRequest, FastifyReply } from 'fastify';
import { Event } from './events.types';
import { randomUUID } from 'crypto';
import { knex } from '../../database';

type PathParams = {eventID?: string | null}

async function insertEvent(request: FastifyRequest, reply: FastifyReply) {
	const event = request.body as Event;

	const id = randomUUID();
	await knex('events').insert({
		...event,
		id
	});

	return reply.status(201).send({...event, id, created_at: new Date()});
}

async function getEvents(request: FastifyRequest) {
  type QueryParams = {title?: string | null}
  const { title } = request.query as QueryParams;

  const query: QueryParams = {};

  if(title) query.title = title;

  const events = await knex('events').where(query).select();

  return events;
}

async function getEvent(request: FastifyRequest) {
	const { eventID } = request.params as PathParams;

	const event = await knex('events')
		.where({id: eventID})
		.first();

	return event;
}

async function updateEvent(request: FastifyRequest, reply: FastifyReply) {
	const { eventID } = request.params as PathParams;
	const event = request.body as Event;

	await knex('events')
		.where({id: eventID})
		.update({...event});

	return reply.status(200).send({...event, id: eventID});
}

async function deleteEvent(request: FastifyRequest, reply: FastifyReply) {
	const { eventID } = request.params as PathParams;

	await knex('events')
		.where({id: eventID})
		.delete();

	return reply.status(204).send();
}

export {insertEvent, getEvents, getEvent, updateEvent, deleteEvent};
