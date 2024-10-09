// eslint-disable-next-line
import { Knex } from "knex";

declare module 'knex/types/tables' {
  export interface Tables {
    events: {
      id: string
      title: string
      description?: string
      startDate: Date
      endDate: Date
      vacancies: number
      created_at: string
    }
  }
}
