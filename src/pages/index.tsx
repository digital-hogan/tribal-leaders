import Head from "next/head";
// import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
	// const hello = api.post.hello.useQuery({ text: "from tRPC" });
	const leaders = api.leader.getList.useQuery();

	return (
		<>
			<Head>
				<title>Search Your Tribes</title>
				<meta name="description" content="Search for your tribal leaders" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
				<div className="border container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
					<table className="border shadow divide-y divide-gray-200 text-white">
						<thead>
							<tr>
								<th className="table-th">ID</th>
								<th className="table-th">Tribe</th>
								<th className="table-th">Tribal Leader</th>
								<th className="table-th">Job Title</th>
								<th className="table-th">BIA Agency</th>
								<th className="table-th">Full Tribe Name</th>
							</tr>
						</thead>
						<tbody className="text-white">
							{leaders.data?.map((leader) => (
								<tr key={ leader.id } className="even:bg-gray-800 relative">
									<td className="table-td">{ leader.id }</td>
									<td className="table-td">{ leader.tribe }</td>
									<td className="table-td">
										{ `${leader.firstName} ${leader.lastName}` }
									</td>
									<td className="table-td">
										{ leader.jobTitle }
									</td>
									<td className="table-td">
										{ leader.biaAgency }
									</td>
									<td className="table-td">
										{ leader.fullTribeName }
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</main>
		</>
	);
}
