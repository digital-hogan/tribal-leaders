// import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
// import { leaders } from '~/server/db/schema';


export const leaderRouter = createTRPCRouter({
	getList: publicProcedure.query(({ctx}) => {
		return ctx.db.query.leaders.findMany({
			limit: 10,
			// each offset needs to append 10
			// for pagination
			// add search based on tribe, first and last name, biaAgency and state
			offset: 10,
		})
	}),
});
