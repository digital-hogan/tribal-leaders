import { useRouter } from 'next/router';
// import { useEffect } from 'react';
import Head from "next/head";
import { api } from "../../utils/api";

export default function Leader() {
	const router = useRouter();
	const id = Number(router.query.id);
	const { data: leaderData, isLoading } = api.leader.getLeaderById.useQuery(id);

	// useEffect(() => {
	// }, []);

	// @BUG getting undefined on first page query
	// error message -> expected number, received nan
	// console.log(leaderData);
	return (
		<>
			<Head>
				<title>Search Your Tribes</title>
				<meta name="description" content="Search for your tribal leaders" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex min-h-screen flex-col items-center justify-center bg-gray-200 text-black">
				<div className="">
					{`${leaderData?.firstName} ${leaderData?.lastName}`}
				</div>
				<div className="">
					{ leaderData?.tribe }
				</div>
			</main>
		</>
	);
}
