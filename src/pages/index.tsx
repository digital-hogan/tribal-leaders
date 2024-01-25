import Head from "next/head";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";

// need to work on a mobile ui
// cards or something

interface Leader {
	id: number;
	fullTribeName: string | null;
	tribe: string | null;
	firstName: string | null;
	lastName: string | null;
	jobTitle: string | null;
	biaAgency: string | null;
	state: string | null;
}

export default function Home() {
	const [query, setQuery] = useState<{query: string; limit: number; offset: number;}>({
		query: '',
		limit: 10,
		offset: 0,
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [leaders, setLeaders] = useState<Leader[]>([]);

	const { data: leadersData, isLoading } = api.leader.getAll.useQuery(query);

	useEffect(() => {
		setLeaders(leadersData ?? []);
	}, [leadersData]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery({
			query: event.target.value,
			limit: 10,
			offset: 0
		});
		setCurrentPage(1);
	};

	const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setQuery({
			query: query.query,
			limit: +event.target.value,
			offset: 0
		});
		setCurrentPage(1);
	};

	const leaderTotal = api.leader.getTotal.useQuery().data?.length;
	let totalPages = 0;

	if(leaderTotal) {
		totalPages = Math.ceil(leaderTotal / query.limit);
	}

	const handlePageClick = (page: number) => {
		setCurrentPage(page);
		setQuery({
		  ...query,
		  offset: (page - 1) * query.limit
		});
	};

	const goToNextPage = () => {
		if (currentPage < totalPages) {
			handlePageClick(currentPage + 1);
		}
	};

	const goToPreviousPage = () => {
		if (currentPage > 1) {
			handlePageClick(currentPage - 1);
		}
	};

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
				<div className="border container flex flex-col justify-center p-12 bg-white rounded-lg my-16">
					<div className="flex justify-between items-center mb-4">
						<div className="flex items-center space-x-6">
							<h1 className="text-3xl">Tribal Leaders</h1>
						</div>
						<div className="flex items-center space-x-6">
							<select onChange={handleLimitChange} name="limit" id="limit" className="rounded-lg border h-8 py-0 px-2">
								<option value="">Select</option>
								<option value="15">15</option>
								<option value="30">30</option>
								<option value="50">50</option>
								<option value="100">100</option>
							</select>
							<input
								type="text"
								className="flex-1 px-4 border rounded-lg h-8"
								placeholder="Search..."
								onChange={handleSearchChange}
								value={query.query}
							/>
						</div>
					</div>
					{
						isLoading ? (
						  <div>Loading...</div> // Show a loading indicator when data is being fetched
						) : (
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
									{leaders.map((leader) => (
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
						)
					}
					<div className="flex justify-between mt-6">
						<div></div>
						<div className="">
							<div className="text-center">Page {currentPage} of {totalPages}</div>
						</div>
						<div className="">
							<button type="button" onClick={goToPreviousPage} disabled={currentPage === 1} className="border px-2 rounded-l-lg">Previous</button>
							<button type="button" onClick={goToNextPage} disabled={currentPage === totalPages} className="border px-2 rounded-r-lg">Next</button>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
