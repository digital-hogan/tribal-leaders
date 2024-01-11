import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    uri: env.DATABASE_URL,
	// user: "postgres",
	//     password: env.DATABASE_PASSWORD,
	//     host: "127.0.0.1",
    // port: 5432,
    // database: "db",
  },
  tablesFilter: ["tribal_*"],
} satisfies Config;
