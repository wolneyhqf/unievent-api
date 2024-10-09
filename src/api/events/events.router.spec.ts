import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../app';
import { execSync } from 'node:child_process';


describe('[GET] /events', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	beforeEach(() => {
		execSync('yarn knex:rollback');
		execSync('yarn knex:migrate');
	});

	it('should be able to list all events', async () => {
		await request(app.server)
			.post('/events')
			.send({
				title: 'Evento Acme',
				description: 'Evento sobre novidades do momento',
				startDate: '2024-01-29',
				endDate: '2024-01-31',
				vacancies: 100
			});

		const listEventsResponse = await request(app.server)
			.get('/events')
			.expect(200);

		expect(listEventsResponse.body).toEqual([
			expect.objectContaining({
				title: 'Evento Acme',
				description: 'Evento sobre novidades do momento',
				startDate: '2024-01-29',
				endDate: '2024-01-31',
				vacancies: 100
			}),
		]);
	});

	it('should be able to list events filter by title', async () => {
		await request(app.server)
			.post('/events')
			.send({
				title: 'Evento Acme',
				description: 'Evento sobre novidades do momento',
				startDate: '2024-01-29',
				endDate: '2024-01-31',
				vacancies: 100
			});

		await request(app.server)
			.post('/events')
			.send({
				title: 'Evento TI',
				description: 'Evento sobre novidades de tecnologia',
				startDate: '2024-02-01',
				endDate: '2024-02-10',
				vacancies: 30
			});

		const listEventsResponse = await request(app.server)
			.get('/events')
			.query({title: 'Evento TI'})
			.expect(200);

		expect(listEventsResponse.body).toEqual([
			expect.objectContaining({
				title: 'Evento TI',
				description: 'Evento sobre novidades de tecnologia',
				startDate: '2024-02-01',
				endDate: '2024-02-10',
				vacancies: 30
			}),
		]);
	});
});
