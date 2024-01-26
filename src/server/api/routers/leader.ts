import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const leaderRouter = createTRPCRouter({
	getTotal: publicProcedure
	.input(z.string().nullable())
	.query(({input, ctx}) => {
		return ctx.db.query.leaders.findMany({
			columns: {
				id: true,
			},
			where: (leaders, { like, or }) => {
				const searchQuery = `%${input}%`
				return or(
					like(leaders.tribe, searchQuery),
					like(leaders.mailingState, searchQuery),
					like(leaders.firstName, searchQuery),
					like(leaders.lastName, searchQuery)
				);
			},
		})
	}),
	getAll: publicProcedure
	.input(
		z.object({
			query: z.string(),
			limit: z.number(),
			offset: z.number(),
		})
	)
	.query(({ input, ctx }) => {
		if(input.query == undefined) {
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
					mailingState: true,
				},
				limit: input.limit,
				offset: input.offset,
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
				mailingState: true,
			},
			where: (leaders, { like, or }) => {
				const searchQuery = `%${input.query}%`
				return or(
					like(leaders.tribe, searchQuery),
					like(leaders.mailingState, searchQuery),
					like(leaders.firstName, searchQuery),
					like(leaders.lastName, searchQuery)
				);
			},
			limit: input.limit,
			offset: input.offset,
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
