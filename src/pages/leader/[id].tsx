import { useRouter } from 'next/router';
import Head from "next/head";
import { api } from "../../utils/api";

export default function leader() {
	const router = useRouter();
	const id: number = Number(router.query.id);
	const leader = api.leader.getLeaderById.useQuery(id)
	// @BUG getting undefined on first page query
	console.log(leader.data);
	return (
		<>
			<Head>
				<title>Search Your Tribes</title>
				<meta name="description" content="Search for your tribal leaders" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex min-h-screen flex-col items-center justify-center bg-gray-200 text-black">
				<div className="">
					{`${leader.data?.firstName} ${leader.data?.lastName}`}
				</div>
				<div className="">
					{ leader.data?.tribe }
				</div>
			</main>
		</>
	);
}
