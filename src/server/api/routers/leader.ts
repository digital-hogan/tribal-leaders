// import { z } from 'zod';

import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
// import { leaders } from '~/server/db/schema';


export const leaderRouter = createTRPCRouter({
	getAll: publicProcedure
	.input(z.string().nullable())
	.query(({ input, ctx }) => {
		// need to implement search
		if(input == undefined) {
			return ctx.db.query.leaders.findMany({
				columns: {
					id: true,
					tribe: true,
					firstName: true,
					lastName: true,
					jobTitle: true,
					biaAgency: true,
					state: true,
					fullTribeName: true,
				},
				// where: (leaders, { eq, or }) => (
				// 	or(eq(leaders.tribe, input)),
				// 	or(eq(leaders.mailingState, input)),
				// 	or(eq(leaders.firstName, input)),
				// 	or(eq(leaders.lastName, input))
				// ),
				limit: 10,
				// each offset needs to append 10
				// for pagination
				// add search based on tribe, first and last name, biaAgency and state
				offset: 0,
			})
		}
		return ctx.db.query.leaders.findMany({
			columns: {
				id: true,
				tribe: true,
				firstName: true,
				lastName: true,
				jobTitle: true,
				biaAgency: true,
				state: true,
				fullTribeName: true,
			},
			where: (leaders, { eq, or }) => {
				return or(
					eq(leaders.tribe, input),
					eq(leaders.mailingState, input),
					eq(leaders.firstName, input),
					eq(leaders.lastName, input)
				);
			},
			limit: 10,
			// each offset needs to append 10
			// for pagination
			// add search based on tribe, first and last name, biaAgency and state
			offset: 0,
		})
	}),
	getLeaderById: publicProcedure
		.input(z.number())
		.query(async ({ input, ctx }) => {
			const query = ctx.db.query.leaders.findFirst({
				where: (leaders, { eq }) => (eq(leaders.id, input)),
			})
			return await query;
		}),
});
