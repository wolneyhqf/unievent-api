import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('events', (table) => {
		table.uuid('id').primary();
		table.text('title').notNullable();
		table.text('description');
		table.date('startDate').notNullable();
		table.date('endDate').notNullable();
		table.integer('vacancies').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
	});
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('events');
}

