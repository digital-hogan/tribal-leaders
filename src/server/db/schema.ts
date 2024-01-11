// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

// import { sql } from "drizzle-orm";
import {
  bigint,
  // index,
  mysqlTableCreator,
  text,
  // timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `tribal_${name}`);

// dont need this
// export const posts = mysqlTable(
//   "post",
//   {
//     id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
//     name: varchar("name", { length: 256 }),
//     createdAt: timestamp("created_at")
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updatedAt").onUpdateNow(),
//   },
//   (example) => ({
//     nameIndex: index("name_idx").on(example.name),
//   })
// );

export const leaders = mysqlTable('leader', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	fullTribeName: varchar('fullTribeName', { length: 256 }),
	tribe: varchar('tribe', { length: 256 }),
	tribeAlternateName: varchar('tribeAlternateName', { length: 256 }),
	tribalComponent: varchar('tribalComponent', { length: 256 }),
	salutation: varchar('salutation', { length: 256 }),
	firstName: varchar('firstName', { length: 256 }),
	middleName: varchar('middleName', { length: 256 }),
	lastName: varchar('lastName', { length: 256 }),
	suffix: varchar('suffix', { length: 256 }),
	aka: varchar('aka', { length: 256 }),
	jobTitle: varchar('jobTitle', { length: 256 }),
	organization: varchar('organization', { length: 256 }),
	biaAgency: varchar('biaAgency', { length: 256 }),
	physicalAddress: varchar('physicalAddress', { length: 256 }),
	city: varchar('city', { length: 256 }),
	state: varchar('state', { length: 256 }),
	zipCode: varchar('zipCode', { length: 256 }),
	alaska: varchar('alaska', { length: 256 }),
	phone: varchar('phone', { length: 256 }),
	fax: varchar('fax', { length: 256 }),
	email: varchar('email', { length: 256 }),
	website: varchar('website', { length: 256 }),
	mailingAddress: varchar('mailingAddress', { length: 256 }),
	mailingCity: varchar('mailingCity', { length: 256 }),
	mailingState: varchar('mailingState', { length: 256 }),
	mailingZip: varchar('mailingZip', { length: 256 }),
	dateElected: varchar('dateElected', { length: 256 }),
	nextElection: varchar('nextElection', { length: 256 }),
	directory: varchar('directory', { length: 256 }),
	notes: text('notes'),
})
