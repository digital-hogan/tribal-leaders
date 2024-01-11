// import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import { env } from "~/env";
import * as schema from "./schema";

const connection = await mysql.createConnection(env.DATABASE_URL);

// export const db = drizzle(connection);
export const db = drizzle(connection, { schema, mode: 'default' });

// export const db = drizzle(
//   new Client({
//     url: env.DATABASE_URL,
//   }).connection(),
//   { schema }
// );
