import Head from "next/head";
import { useState } from "react";
// import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	// const searchQuery = (query: string|null = null) => {
	// 	return query ?? null
	// };
	const searchQuery = () => {
		return searchTerm === '' ? null : searchTerm;
	};

	const leaders = api.leader.getAll.useQuery(searchQuery());

	console.log(leaders);

	const goToLeader = (id: number) => {
		window.location.assign(`/leader/${id}`);
	};

	return (
		<>
			<Head>
				<title>Search Your Tribes</title>
				<meta name="description" content="Search for your tribal leaders" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex min-h-screen flex-col items-center justify-center bg-gray-200">
				<div className="border container flex flex-col justify-center p-12 bg-white rounded-lg">
					<div className="flex justify-between items-center mb-4">
						<div className="flex items-center space-x-6">
							<h1 className="text-3xl">Tribal Leaders</h1>
						</div>
						<div className="flex items-center space-x-6">
							<input
								type="text"
								className="flex-1 px-4 border border-sbca rounded-lg h-8"
								placeholder="Search..."
								onChange={handleSearchChange} // Handle the search input changes
								value={searchTerm} // Controlled input
							/>
						</div>
					</div>
					<table className="border shadow divide-y divide-gray-200 text-gray-600">
						<thead>
							<tr>
								<th className="table-th">ID</th>
								<th className="table-th">Tribe</th>
								<th className="table-th">Tribal Leader</th>
								<th className="table-th">Job Title</th>
								<th className="table-th">BIA Agency</th>
								<th className="table-th">State</th>
								<th className="table-th">Full Tribe Name</th>
							</tr>
						</thead>
						<tbody className="text-gray-600">
							{leaders.data?.map((leader) => (
								<tr key={leader.id} onClick={() => { goToLeader(leader.id) }} className="even:bg-gray-50 hover:bg-gray-100 cursor-pointer relative">
									<td className="table-td">{leader.id}</td>
									<td className="table-td">{leader.tribe}</td>
									<td className="table-td">
										{`${leader.firstName} ${leader.lastName}`}
									</td>
									<td className="table-td">
										{leader.jobTitle}
									</td>
									<td className="table-td">
										{leader.biaAgency}
									</td>
									<td className="table-td">
										{leader.state}
									</td>
									<td className="table-td">
										{leader.fullTribeName}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div >
			</main >
		</>
	);
}
